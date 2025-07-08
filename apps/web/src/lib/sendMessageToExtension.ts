const CHROME_EXTENSION_ID = "ekakamaigbogpbnomncmniejedopjjnn";
// TODO set up firefox addon id
const FIREFOX_EXTENSION_ID = "ekakamaigbogpbnomncmniejedopjjnn";

/**
 * Sends a message to the browser extension.
 * The payload can have any key names.
 */
export async function sendMessageToExtension(
  { type, ...payload }: { type: string; [key: string]: any },
  window: Window
): Promise<void> {
  // @ts-ignore
  const runtime = window.chrome?.runtime || window.browser?.runtime;
  if (!runtime) throw new Error("Browser runtime not available");

  const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  const extensionId = isSafari ? FIREFOX_EXTENSION_ID : CHROME_EXTENSION_ID;

  const message = { type, ...payload };

  console.log("Sending message to extension", message);
  const response = await runtime.sendMessage(extensionId, message);

  if (runtime.lastError) throw new Error(runtime.lastError.message);
  if (response?.error) throw new Error(response.error);
}