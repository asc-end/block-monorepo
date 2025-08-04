import type { AlertButton } from './Alert';

/**
 * Web implementation of showAlert using browser's native dialogs
 */
export function showAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: { cancelable?: boolean }
) {
  // For Web - use browser's native dialogs
  const fullMessage = message ? `${title}\n\n${message}` : title;
  
  if (!buttons || buttons.length === 0) {
    // Simple alert with OK button
    alert(fullMessage);
    return;
  }

  if (buttons.length === 1) {
    // Single button alert
    alert(fullMessage);
    buttons[0].onPress?.();
    return;
  }

  // For multiple buttons, use confirm dialog
  // This is limited to OK/Cancel on web, but provides basic functionality
  const confirmButton = buttons.find(b => b.style !== 'cancel');
  const cancelButton = buttons.find(b => b.style === 'cancel');
  
  const confirmed = confirm(fullMessage);
  
  if (confirmed && confirmButton) {
    confirmButton.onPress?.();
  } else if (!confirmed && cancelButton) {
    cancelButton.onPress?.();
  }
}

// Re-export for convenience with different name to avoid conflicts
export const AlertDialog = {
  alert: showAlert
};