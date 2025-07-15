import { browser } from "wxt/browser";

// Add type declaration for WXT auto-imports
declare function defineBackground(fn: () => void): any;

let websocket: WebSocket | undefined;
let websocketHeartbeatInterval: any;

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
    console.log('Token expired, requesting refresh from web app...');
    
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
      console.error('Failed to refresh token:', error);
      throw new Error('Authentication failed');
    }
  }

  return response;
};

const extractUserIdFromToken = async (token: string): Promise<string | null> => {
  try {
    const response = await makeAuthenticatedRequest(
      `${import.meta.env.WXT_PUBLIC_API_URL}/users/verify`
    );

    if (response.ok) {
      const data = await response.json();
      return data.userId;
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
              console.error(`Failed to sync ${appName}: ${response.status} - ${errorText}`);
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
    console.error('❌ Failed to sync hourly usage:', error);
    // Save current usage to storage for persistence in case of crashes
    await browser.storage.local.set({ pendingHourlyUsage: hourlyUsage });
  }
}


async function makeWebsocket() {
  const storage = await browser.storage.local.get(['authToken']);
  const token = storage.authToken;


  if (!token) {
    return;
  }

  const id = await extractUserIdFromToken(token)
  websocket = new WebSocket(`${import.meta.env.WXT_PUBLIC_WS_URL}/api/ws?userId=${id}`)
  makeListeners()
}

function closeWebsocket() {
  websocket?.close()
}

function makeListeners() {
  if (!websocket) return;

  websocket.onopen = function () {
    startHeartbeat()
  }

  websocket.onmessage = async function (event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'FOCUS_SESSION_UPDATED') {
        // Store focus session state
        if (data.payload.action === "created") {
          await browser.storage.local.set({ currentFocusSession: true });
        } else {
          await browser.storage.local.remove('currentFocusSession');
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
              // First try to send the message
              await browser.tabs.sendMessage(tab.id, { action });
            } catch (error) {
              try {
                // Inject the content script if it's not already loaded
                await browser.scripting.executeScript({
                  target: { tabId: tab.id },
                  files: ['content-scripts/content.js']
                });
                // Try sending the message again
                await browser.tabs.sendMessage(tab.id, { action });
              } catch (injectError) {
                console.error(`❌ Failed to inject script or send ${action} to tab ${tab.id} (${tab.url}):`, injectError);
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to handle websocket message:', e);
    }
  }

  websocket.onclose = function () {
    stopHeartbeat()
  }
}

export default defineBackground(() => {
  let authWindowId: number | null = null;
  setInterval(syncHourlyUsage, SYNC_INTERVAL);

  // Check initial auth status on startup
  browser.storage.local.get(['authToken']).then((result) => {
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
        const backendUrl = `${import.meta.env.WXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/api/focus-session/status`;
        const response = await makeAuthenticatedRequest(backendUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error('Failed to fetch focus session status from backend:', response.statusText);
          sendResponse({ inFocusSession: false, error: response.statusText });
          return true;
        }

        const data = await response.json();
        sendResponse({ inFocusSession: !!data.inFocusSession });
      } catch (error) {
        console.error('Error checking focus session status from backend:', error);
        sendResponse({ inFocusSession: false, error: (error as Error).message });
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


