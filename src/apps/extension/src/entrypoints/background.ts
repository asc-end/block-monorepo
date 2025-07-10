import { browser } from "wxt/browser";
let websocket: WebSocket | undefined;


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
  }

  websocket.onmessage = async function (event: MessageEvent) {
    console.log("event, ", event, event.data)
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'FOCUS_SESSION_UPDATED') {
        // Send message to all tabs' content scripts

        const tabs = await browser.tabs.query({});
        for (const tab of tabs) {
          if (tab.id) {
            const action = data.payload.action == "created" ? 'BEGIN_FOCUS_SESSION' : 'STOP_FOCUS_SESSION';
            try {
              await browser.tabs.sendMessage(tab.id, { action });
            } catch (e) {
              // Ignore errors if content script is not injected
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to handle websocket message:', e);
    }
  }

  websocket.onclose = function () {
    console.log("Disconnected!")
  }
}

export default defineBackground(() => {
  let authWindowId: number | null = null;

  // Clear authWindowId when window is closed
  browser.windows.onRemoved.addListener(windowId => {
    if (windowId === authWindowId) authWindowId = null;
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
    }
  });

  browser.runtime.onInstalled.addListener(details => {
    if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
      browser.runtime.setUninstallURL('https://google.com');
    }
  });

  makeWebsocket()

});


