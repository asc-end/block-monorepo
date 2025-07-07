import { browser } from "wxt/browser";

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
        url: `${import.meta.env.WXT_PUBLIC_WEB_URL}?source=extension`,
        type: "normal",
        width: 800,
        height: 600,
      });
      
      if (window.id) authWindowId = window.id;
    }
  });
});
