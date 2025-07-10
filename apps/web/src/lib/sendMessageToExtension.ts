
/**
 * Sends a message to the browser extension.
 * The payload can have any key names.
 */
export async function sendMessageToExtension(
  { extensionId, type, ...payload }: { extensionId: string, type: string;[key: string]: any },
  window: Window
): Promise<void> {
  // @ts-ignore
  const runtime = window.chrome?.runtime || window.browser?.runtime;
  if (!runtime) throw new Error("Browser runtime not available");

  const message = { type, ...payload };

  console.log("Sending message to extension", message);
  const response = await runtime.sendMessage(extensionId, message);

  if (runtime.lastError) throw new Error(runtime.lastError.message);
  if (response?.error) throw new Error(response.error);
}