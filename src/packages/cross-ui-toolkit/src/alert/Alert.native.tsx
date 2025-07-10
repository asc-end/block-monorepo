import React from 'react';
import { Platform } from 'react-native';
import type { AlertProps, AlertButton } from './Alert';

// Use the native Alert API
const RNAlert = Platform.select({
  native: require('react-native').Alert,
  default: null
});

export function Alert({ title, message, buttons = [], visible, onDismiss }: AlertProps): React.ReactElement | null {
  React.useEffect(() => {
    if (visible && RNAlert) {
      const defaultButtons: AlertButton[] = buttons.length > 0 ? buttons : [
        { text: 'OK', style: 'default' }
      ];

      RNAlert.alert(
        title,
        message,
        defaultButtons.map(button => ({
          text: button.text,
          onPress: () => {
            button.onPress?.();
            onDismiss?.();
          },
          style: button.style
        }))
      );
    }
  }, [visible, title, message, buttons, onDismiss]);

  return null;
} 