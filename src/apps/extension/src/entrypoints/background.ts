import { browser } from "wxt/browser";
import { RoutineBlockingService } from '@blockit/ui';

// Add type declaration for WXT auto-imports
declare function defineBackground(fn: () => void): any;

let websocket: WebSocket | undefined;
let websocketHeartbeatInterval: any;
let websocketReconnectTimeout: any;
let websocketReconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000; // 5 seconds

// Helper function to make authenticated API calls with automatic token refresh
const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {},
  retryCount = 0
): Promise<Response> => {
  const storage = await browser.storage.local.get(['authToken']);
  if (!storage.authToken) {
    throw new Error('No auth token available');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${storage.authToken}`
    }
  });

  // If unauthorized and haven't retried yet, try to refresh token
  if (response.status === 401 && retryCount === 0) {
    
    // Open web app to refresh token
    const refreshPromise = new Promise<string>((resolve, reject) => {
      const messageListener = (message: any, sender: any) => {
        if (message.type === 'AUTH_TOKEN' && message.token) {
          browser.runtime.onMessageExternal.removeListener(messageListener);
          resolve(message.token);
        }
      };
      
      browser.runtime.onMessageExternal.addListener(messageListener);
      
      // Open web app in background tab to trigger token refresh
      browser.tabs.create({
        url: `${import.meta.env.WXT_PUBLIC_WEB_URL}?source=extension&extensionId=${browser.runtime.id}&refresh=true`,
        active: false
      });
      
      // Timeout after 10 seconds
      setTimeout(() => {
        browser.runtime.onMessageExternal.removeListener(messageListener);
        reject(new Error('Token refresh timeout'));
      }, 10000);
    });

    try {
      const newToken = await refreshPromise;
      await browser.storage.local.set({ authToken: newToken });
      
      // Retry the original request with new token
      return makeAuthenticatedRequest(url, options, retryCount + 1);
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  return response;
};

const extractUserIdFromToken = async (token: string): Promise<string | null> => {
  try {
    console.log('Attempting to verify user token at:', `${import.meta.env.WXT_PUBLIC_API_URL}/users/verify`);
    const response = await makeAuthenticatedRequest(
      `${import.meta.env.WXT_PUBLIC_API_URL}/users/verify`
    );

    if (response.ok) {
      const data = await response.json();
      console.log('User ID successfully extracted:', data.userId);
      return data.userId;
    } else {
      console.error('Failed to verify token, response status:', response.status);
    }
  } catch (error) {
    console.error('Error extracting userId from token:', error);
  }
  return null;
};

function startHeartbeat() {
  websocketHeartbeatInterval = setInterval(function () {
    websocket?.send("heartbeat")
  }, 20000)
}

function stopHeartbeat() {
  if (websocketHeartbeatInterval) {
    clearInterval(websocketHeartbeatInterval)
  }
}

// Hourly usage accumulator
interface HourlyUsage {
  [hourKey: string]: {
    [domain: string]: number; // milliseconds
  };
}
let hourlyUsage: HourlyUsage = {};
let lastSyncTime = Date.now();

// Sync interval - every 2 minutes  
const SYNC_INTERVAL = 2 * 60 * 1000;
// Debounce sync requests to prevent duplicate syncs
let syncDebounceTimeout: any = null;

// Routine blocking service instance
let routineBlockingService: RoutineBlockingService | null = null;
// Function to get hour key in UTC
function getHourKey(timestamp: number): string {
  const date = new Date(timestamp);
  date.setMinutes(0, 0, 0);
  return date.toISOString();
}

// Debounced sync function to prevent duplicate syncs
function debouncedSyncHourlyUsage() {
  if (syncDebounceTimeout) {
    clearTimeout(syncDebounceTimeout);
  }
  
  syncDebounceTimeout = setTimeout(() => {
    syncHourlyUsage();
    syncDebounceTimeout = null;
  }, 500); // 500ms debounce
}

// Function to sync hourly usage to backend
async function syncHourlyUsage() {
  const storage = await browser.storage.local.get(['authToken']);
  if (!storage.authToken || Object.keys(hourlyUsage).length === 0) return;

  // Don't clear usage until after successful sync
  const usageToSync = { ...hourlyUsage };

  try {
    const syncPromises = [];
    
    for (const [hourStart, apps] of Object.entries(usageToSync)) {
      for (const [appName, timeSpent] of Object.entries(apps)) {
        if (timeSpent > 0) {
          
          const syncPromise = makeAuthenticatedRequest(
            `${import.meta.env.WXT_PUBLIC_API_URL}/app-usage/hourly`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                appName,
                platform: 'web',
                timeSpent,
                hourStart,
              }),
            }
          ).then(async (response) => {
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP ${response.status}: ${errorText}`);
            } else {
              return { hourStart, appName, timeSpent };
            }
          });
          
          syncPromises.push(syncPromise);
        }
      }
    }

    // Wait for all sync operations to complete
    const results = await Promise.allSettled(syncPromises);
    
    // Remove successfully synced data from local storage
    let hasSuccessfulSync = false;
    for (const result of results) {
      if (result.status === 'fulfilled') {
        const { hourStart, appName, timeSpent } = result.value;
        if (hourlyUsage[hourStart] && hourlyUsage[hourStart][appName]) {
          hourlyUsage[hourStart][appName] -= timeSpent;
          if (hourlyUsage[hourStart][appName] <= 0) {
            delete hourlyUsage[hourStart][appName];
          }
          if (Object.keys(hourlyUsage[hourStart]).length === 0) {
            delete hourlyUsage[hourStart];
          }
        }
        hasSuccessfulSync = true;
      }
    }

    if (hasSuccessfulSync) {
      // Clear pending data from storage if everything was synced
      if (Object.keys(hourlyUsage).length === 0) {
        await browser.storage.local.remove(['pendingHourlyUsage']);
      }
    } else {
    }
    
  } catch (error) {
    // Save current usage to storage for persistence in case of crashes
    await browser.storage.local.set({ pendingHourlyUsage: hourlyUsage });
  }
}

// Get auth token for routine service
async function getAuthToken(): Promise<string | null> {
  const storage = await browser.storage.local.get(['authToken']);
  return storage.authToken || null;
}

// Notify all tabs about updated blocked domains
async function notifyTabsAboutBlockedDomains(blockedDomains: string[]) {
  const tabs = await browser.tabs.query({});
  for (const tab of tabs) {
    if (tab.id && tab.url) {
      // Skip protected pages
      if (tab.url.startsWith('chrome://') || 
          tab.url.startsWith('chrome-extension://') ||
          tab.url.startsWith('edge://') ||
          tab.url.startsWith('about:')) {
        continue;
      }
      
      try {
        await browser.tabs.sendMessage(tab.id, { 
          action: 'UPDATE_BLOCKED_DOMAINS',
          blockedDomains: blockedDomains
        });
      } catch (error) {
        // Content script might not be loaded
      }
    }
  }
}

// Initialize routine blocking service
function initializeRoutineBlocking() {
  if (routineBlockingService) {
    routineBlockingService.stop();
  }
  
  const apiUrl = import.meta.env.WXT_PUBLIC_API_URL || 'http://localhost:3001';
  console.log("API URL", apiUrl)
  routineBlockingService = new RoutineBlockingService({
    apiUrl,
    getAuthToken,
    onRoutinesUpdate: (routines) => {
      // Store active routines for content script
      const activeRoutines = routineBlockingService?.getActiveRoutines() || [];
      browser.storage.local.set({ activeRoutines });
    },
    onBlockedItemsUpdate: (items) => {
      // Store blocked domains and notify tabs
      browser.storage.local.set({ 
        blockedDomains: items.domains || []
      });
      notifyTabsAboutBlockedDomains(items.domains || []);
    }
  });
  
  routineBlockingService.start();
}


async function makeWebsocket() {
  // Close existing connection if any
  if (websocket && (websocket.readyState === WebSocket.CONNECTING || websocket.readyState === WebSocket.OPEN)) {
    console.log('WebSocket already connected or connecting, skipping...');
    return;
  }
  
  const storage = await browser.storage.local.get(['authToken']);
  const token = storage.authToken;

  if (!token) {
    console.log('No auth token available for WebSocket connection');
    return;
  }

  const id = await extractUserIdFromToken(token);
  
  if (!id) {
    console.error('Failed to extract user ID from token');
    return;
  }
  
  const wsUrl = `${import.meta.env.WXT_PUBLIC_WS_URL}/api/ws?userId=${id}`;
  
  console.log('Creating WebSocket connection...');
  websocket = new WebSocket(wsUrl);
  makeListeners();
}

function closeWebsocket() {
  if (websocketReconnectTimeout) {
    clearTimeout(websocketReconnectTimeout);
    websocketReconnectTimeout = null;
  }
  websocketReconnectAttempts = 0;
  websocket?.close();
}

function makeListeners() {
  if (!websocket) return;

  websocket.onopen = function () {
    console.log('WebSocket connected successfully');
    websocketReconnectAttempts = 0; // Reset reconnection attempts on successful connection
    startHeartbeat();
  }

  websocket.onmessage = async function (event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'FOCUS_SESSION_UPDATED') {
        // Store focus session state
        if (data.payload.action === "created") {
          await browser.storage.local.set({ 
            currentFocusSession: true,
            focusSessionDetails: data.payload.session 
          });
        } else {
          await browser.storage.local.remove('currentFocusSession');
          await browser.storage.local.remove('focusSessionDetails');
        }
        
        const tabs = await browser.tabs.query({});
        for (const tab of tabs) {
          if (tab.id && tab.url) {
            // Skip chrome:// URLs and other protected pages
            if (tab.url.startsWith('chrome://') || 
                tab.url.startsWith('chrome-extension://') ||
                tab.url.startsWith('edge://') ||
                tab.url.startsWith('about:')) {
              continue;
            }
            
            const action = data.payload.action == "created" ? 'BEGIN_FOCUS_SESSION' : 'STOP_FOCUS_SESSION';
            try {
              // Send the message with session details
              await browser.tabs.sendMessage(tab.id, { 
                action,
                session: data.payload.action === "created" ? data.payload.session : null
              });
            } catch (error) {
              // Content script might not be loaded
            }
          }
        }
      }
    } catch (e) {
    }
  }

  websocket.onclose = function (event) {
    stopHeartbeat();
    
    // Don't reconnect if it was a normal closure
    if (event.code === 1000) {
      return;
    }
    
    // Attempt to reconnect with exponential backoff
    if (websocketReconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      const delay = RECONNECT_DELAY * Math.pow(2, websocketReconnectAttempts);
      console.log(`WebSocket closed unexpectedly. Reconnecting in ${delay}ms... (attempt ${websocketReconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);
      
      websocketReconnectTimeout = setTimeout(() => {
        websocketReconnectAttempts++;
        makeWebsocket();
      }, delay);
    } else {
      console.error('Max WebSocket reconnection attempts reached. Giving up.');
    }
  }
  
  websocket.onerror = function (error) {
    console.error('WebSocket error:', error);
  }
}

// Check focus session status periodically
async function checkFocusSessionStatus() {
  try {
    const storage = await browser.storage.local.get(['authToken']);
    if (!storage.authToken) return;
    
    const response = await makeAuthenticatedRequest(
      `${import.meta.env.WXT_PUBLIC_API_URL}/focus-sessions/active`
    );
    
    if (response.ok) {
      const session = await response.json();
      const wasInSession = await browser.storage.local.get('currentFocusSession');
      const isInSession = session !== null;
      
      // Update storage
      if (isInSession) {
        await browser.storage.local.set({ 
          currentFocusSession: true,
          focusSessionDetails: session 
        });
      } else {
        await browser.storage.local.remove('currentFocusSession');
        await browser.storage.local.remove('focusSessionDetails');
      }
      
      // Notify tabs if status changed
      if (wasInSession.currentFocusSession !== isInSession) {
        const action = isInSession ? 'BEGIN_FOCUS_SESSION' : 'STOP_FOCUS_SESSION';
        const tabs = await browser.tabs.query({});
        for (const tab of tabs) {
          if (tab.id && tab.url && 
              !tab.url.startsWith('chrome://') && 
              !tab.url.startsWith('chrome-extension://') &&
              !tab.url.startsWith('edge://') &&
              !tab.url.startsWith('about:')) {
            try {
              await browser.tabs.sendMessage(tab.id, { 
                action,
                session: isInSession ? session : null
              });
            } catch (error) {
              // Content script might not be loaded
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking focus session status:', error);
  }
}

export default defineBackground(() => {
  // Log environment variables for debugging
  console.log('Extension Environment Variables:', {
    API_URL: import.meta.env.WXT_PUBLIC_API_URL,
    WS_URL: import.meta.env.WXT_PUBLIC_WS_URL,
    WEB_URL: import.meta.env.WXT_PUBLIC_WEB_URL
  });
  
  let authWindowId: number | null = null;
  setInterval(syncHourlyUsage, SYNC_INTERVAL);
  
  // Check focus session status every 30 seconds as fallback
  setInterval(checkFocusSessionStatus, 30 * 1000);

  // Check initial auth status on startup
  browser.storage.local.get(['authToken']).then((result) => {
    if (result.authToken) {
      // Start routine checking if authenticated
      initializeRoutineBlocking();
      // Check focus session status immediately
      checkFocusSessionStatus();
    }
  });

  // Content scripts are handled by manifest.json registration
  // No need to manually inject on startup since they load automatically

  // Clear authWindowId when window is closed and sync data
  browser.windows.onRemoved.addListener(windowId => {
    if (windowId === authWindowId) authWindowId = null;
    debouncedSyncHourlyUsage(); // Debounced sync for window close
  });

  // Sync data when tabs are closed
  browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    debouncedSyncHourlyUsage(); // Debounced sync for tab close
  });

  // Handle auth token from web app
  browser.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    (async () => {
      try {
        if (!message.token) return sendResponse({ success: false, error: "No token provided" });

        await browser.storage.local.set({ authToken: message.token });
        sendResponse({ success: true });

        await browser.runtime.sendMessage({ type: "AUTH_TOKEN_RECEIVED", token: message.token });
        
        // Start routine checking when authenticated
        initializeRoutineBlocking();
        
        // Establish WebSocket connection when authenticated
        makeWebsocket();

      } catch (error) {
        sendResponse({ success: false, error: (error as Error).message });
      }
    })();

    return true;
  });

  // Handle opening auth window
  browser.runtime.onMessage.addListener(async (message: any, sender: any, sendResponse: any) => {
    if (message.type === 'CHECK_FOCUS_SESSION') {
      // Retrieve authToken and check focus session status from backend
      const { authToken } = await browser.storage.local.get('authToken');
      if (!authToken) {
        sendResponse({ inFocusSession: false, error: 'No authToken' });
        return true;
      }

      try {
        const backendUrl = `${import.meta.env.WXT_PUBLIC_API_URL || 'http://localhost:3001'}/focus-sessions/active`;
        const response = await makeAuthenticatedRequest(backendUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          sendResponse({ inFocusSession: false, error: response.statusText });
          return true;
        }

        const data = await response.json();
        sendResponse({ inFocusSession: data !== null });
      } catch (error) {
        sendResponse({ inFocusSession: false, error: (error as Error).message });
      }
      return true; // Keep the message channel open
    }
    
    if (message.type === 'GET_FOCUS_SESSION_DETAILS') {
      // First check if we have session details in storage
      const storage = await browser.storage.local.get(['focusSessionDetails', 'authToken']);
      
      if (storage.focusSessionDetails) {
        sendResponse({ session: storage.focusSessionDetails });
        return true;
      }
      
      // Otherwise fetch from backend
      if (!storage.authToken) {
        sendResponse({ session: null, error: 'No authToken' });
        return true;
      }

      try {
        const backendUrl = `${import.meta.env.WXT_PUBLIC_API_URL || 'http://localhost:3001'}/focus-sessions/active`;
        const response = await makeAuthenticatedRequest(backendUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          sendResponse({ session: null, error: response.statusText });
          return true;
        }

        const data = await response.json();
        // Store it for future use
        if (data) {
          await browser.storage.local.set({ focusSessionDetails: data });
        }
        sendResponse({ session: data });
      } catch (error) {
        sendResponse({ session: null, error: (error as Error).message });
      }
      return true; // Keep the message channel open
    }
    
    if (message.type === "OPEN_AUTH_WINDOW") {
      // Try to focus existing window
      if (authWindowId !== null) {
        try {
          await browser.windows.update(authWindowId, { focused: true });
          return;
        } catch {
          authWindowId = null;
        }
      }

      // Create new window
      const window = await browser.windows.create({
        url: `${import.meta.env.WXT_PUBLIC_WEB_URL}?source=extension&extensionId=${browser.runtime.id}`,
        type: "normal",
        width: 800,
        height: 600,
      });

      if (window.id) authWindowId = window.id;
    } else if (message.type == "TRACK_TIME") {
      const now = Date.now();
      const hourKey = getHourKey(now);

      if (!hourlyUsage[hourKey]) hourlyUsage[hourKey] = {};

      hourlyUsage[hourKey][message.domain] = (hourlyUsage[hourKey][message.domain] || 0) + message.timeSpent;


      // Check if we should sync (every 2 minutes)
      if (now - lastSyncTime >= SYNC_INTERVAL) {
        lastSyncTime = now;
        syncHourlyUsage(); // Direct sync for periodic interval
      }
    } else if (message.type == "FORCE_SYNC") {
      debouncedSyncHourlyUsage(); // Debounced sync for force requests
    }
  });

  browser.runtime.onInstalled.addListener(details => {
    if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
      browser.runtime.setUninstallURL('https://google.com');
    }
  });

  // Sync data when browser is closing or extension is suspended
  browser.runtime.onSuspend.addListener(() => {
    debouncedSyncHourlyUsage(); // Debounced sync for suspension
  });

  // Also sync when the extension starts up (in case there's pending data)
  browser.storage.local.get(['pendingHourlyUsage']).then((data) => {
    if (data.pendingHourlyUsage) {
      hourlyUsage = data.pendingHourlyUsage;
      syncHourlyUsage();
    }
  });

  // Try to establish WebSocket connection on startup
  makeWebsocket()

});


