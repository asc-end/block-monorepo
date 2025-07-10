import React from 'react';
import { Box } from '../box/Box';
import { Text } from '../text/Text';
import { Button } from '../buttons/Button';
import { Pressable } from '../buttons/Pressable';
import { useTheme } from '../theme/context';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface AlertProps {
  title: string;
  message: string;
  buttons?: AlertButton[];
  visible: boolean;
  onDismiss?: () => void;
}

export function Alert({ title, message, buttons = [], visible, onDismiss }: AlertProps): React.ReactElement | null {
  if (!visible) return null;
  const { currentColors } = useTheme();
  const defaultButtons: AlertButton[] = buttons.length > 0 ? buttons : [
    { text: 'OK', style: 'default' }
  ];

  return (
    <Pressable
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onPress={onDismiss}
    >
      <Pressable
        style={{
          backgroundColor: currentColors.surface.card,
          borderRadius: 12,
          padding: 24,
          width: '90%',
          maxWidth: 400,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onPress={() => {}}
      >
        <Text variant="h5" style={{ color: currentColors.text.main, marginBottom: 8 }}>
          {title}
        </Text>
        <Text variant="body" style={{ color: currentColors.text.soft, marginBottom: 24 }}>
          {message}
        </Text>
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
          {defaultButtons.map((button, index) => (
            <Button
              key={index}
              title={button.text}
              variant={button.style === 'destructive' ? 'primary' : 'secondary'}
              onPress={() => {
                button.onPress?.();
                onDismiss?.();
              }}
            />
          ))}
        </Box>
      </Pressable>
    </Pressable>
  );
} 