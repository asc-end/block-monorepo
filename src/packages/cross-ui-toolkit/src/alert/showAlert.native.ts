import { Alert as RNAlert } from 'react-native';
import type { AlertButton } from './Alert';

/**
 * Native implementation of showAlert for mobile platforms
 */
export function showAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: { cancelable?: boolean }
) {
  RNAlert.alert(title, message, buttons, options);
}

// Re-export for convenience with different name to avoid conflicts
export const AlertDialog = {
  alert: showAlert
};