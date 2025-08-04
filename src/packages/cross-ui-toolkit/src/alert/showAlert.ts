import { Alert as RNAlert, Platform } from 'react-native';
import type { AlertButton } from './Alert';

/**
 * Cross-platform alert function that works like React Native's Alert.alert()
 * On mobile: Uses native Alert.alert()
 * On web: Uses browser's confirm() dialog or could be extended to use a custom modal
 */
export function showAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: { cancelable?: boolean }
) {
  // For React Native (mobile)
  if (Platform.OS !== 'web') {
    RNAlert.alert(title, message, buttons, options);
    return;
  }

  // For Web
  // Use browser's native confirm dialog as a fallback
  // You could also implement a custom modal here if needed
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