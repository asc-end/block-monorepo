import { browser } from "wxt/browser";

// Add type declaration for WXT auto-imports
declare function defineBackground(fn: () => void): any;

let websocket: WebSocket | undefined;
let websocketHeartbeatInterval: any;

const extractUserIdFromToken = async (token: string): Promise<string | null> => {
  try {
    const response = await fetch(`${import.meta.env.WXT_PUBLIC_API_URL}/users/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data)
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
    console.log("heartbeat")
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
          console.log(`Syncing ${timeSpent}ms for ${appName} at ${hourStart}`);
          
          const syncPromise = fetch(`${import.meta.env.WXT_PUBLIC_API_URL}/app-usage/hourly`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storage.authToken}`,
            },
            body: JSON.stringify({
              appName,
              platform: 'web',
              timeSpent,
              hourStart,
            }),
          }).then(async (response) => {
            if (!response.ok) {
              const errorText = await response.text();
              console.error(`Failed to sync ${appName}: ${response.status} - ${errorText}`);

              // If unauthorized, token might be expired
              if (response.status === 401) {
                console.error('Token expired - clearing auth');
                await browser.storage.local.remove(['authToken']);
                throw new Error('Authentication expired');
              }
              throw new Error(`HTTP ${response.status}: ${errorText}`);
            } else {
              console.log(`Successfully synced ${appName} (${timeSpent}ms)`);
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
      console.log('✅ Synced hourly usage data');
      // Clear pending data from storage if everything was synced
      if (Object.keys(hourlyUsage).length === 0) {
        await browser.storage.local.remove(['pendingHourlyUsage']);
      }
    } else {
      console.warn('⚠️ No successful syncs, keeping data for retry');
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
    console.log('No auth token found, skipping WebSocket connection');
    return;
  }

  console.log("token", token)
  const id = await extractUserIdFromToken(token)
  console.log(id)
  websocket = new WebSocket(`${import.meta.env.WXT_PUBLIC_WS_URL}/api/ws?userId=${id}`)
  makeListeners()
}

function closeWebsocket() {
  websocket?.close()
}

function makeListeners() {
  if (!websocket) return;

  websocket.onopen = function () {
    console.log("Connected!")
    startHeartbeat()
  }

  websocket.onmessage = async function (event: MessageEvent) {
    console.log("event, ", event, event.data)
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'FOCUS_SESSION_UPDATED') {
        const tabs = await browser.tabs.query({});
        for (const tab of tabs) {
          if (tab.id) {
            const action = data.payload.action == "created" ? 'BEGIN_FOCUS_SESSION' : 'STOP_FOCUS_SESSION';
            await browser.tabs.sendMessage(tab.id, { action });
          }
        }
      }
    } catch (e) {
      console.error('Failed to handle websocket message:', e);
    }
  }

  websocket.onclose = function () {
    stopHeartbeat()
    console.log("Disconnected!")
  }
}

export default defineBackground(() => {
  let authWindowId: number | null = null;
  setInterval(syncHourlyUsage, SYNC_INTERVAL);


  // Clear authWindowId when window is closed and sync data
  browser.windows.onRemoved.addListener(windowId => {
    if (windowId === authWindowId) authWindowId = null;
    console.log('🔄 Window closed, syncing usage data...');
    debouncedSyncHourlyUsage(); // Debounced sync for window close
  });

  // Sync data when tabs are closed
  browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log('🔄 Tab closed, syncing usage data...');
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
  browser.runtime.onMessage.addListener(async (message: any) => {
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

      console.log(`Accumulated ${message.timeSpent}ms for ${message.domain} (total: ${hourlyUsage[hourKey][message.domain]}ms)`);

      // Check if we should sync (every 2 minutes)
      if (now - lastSyncTime >= SYNC_INTERVAL) {
        lastSyncTime = now;
        console.log('🔄 Triggering sync due to interval');
        syncHourlyUsage(); // Direct sync for periodic interval
      }
    } else if (message.type == "FORCE_SYNC") {
      console.log('🔄 Force sync requested');
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
    console.log('🔄 Extension suspending, syncing usage data...');
    debouncedSyncHourlyUsage(); // Debounced sync for suspension
  });

  // Also sync when the extension starts up (in case there's pending data)
  browser.storage.local.get(['pendingHourlyUsage']).then((data) => {
    if (data.pendingHourlyUsage) {
      hourlyUsage = data.pendingHourlyUsage;
      syncHourlyUsage();
    }
  });

  makeWebsocket()

});


