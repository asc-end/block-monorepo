import React, { useEffect, useState } from 'react';
import { Box } from '../box/Box';
import { Text } from '../text/Text';
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
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentColors } = useTheme();
  
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [visible]);
  
  if (!isVisible) return null;
  
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
        backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        transition: 'background-color 0.3s ease',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onPress={onDismiss}
    >
      <Pressable
        style={{
          backgroundColor: currentColors.surface.card,
          borderRadius: 20,
          padding: 28,
          width: '90%',
          maxWidth: 420,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          border: `1px solid ${currentColors.secondary['200']}`,
          position: 'relative',
          overflow: 'hidden',
        }}
        onPress={() => {}}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${currentColors.primary['500']} 0%, ${currentColors.primary['400']} 100%)`,
          borderRadius: '20px 20px 0 0',
        }} />
        
        <Box style={{ paddingTop: 8 }}>
          <Text 
            variant="h4" 
            style={{ 
              color: currentColors.text.main, 
              marginBottom: 12,
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Text>
          
          <Text 
            variant="body" 
            style={{ 
              color: currentColors.text.soft, 
              marginBottom: 28,
              lineHeight: 1.6,
              fontSize: '15px',
            }}
          >
            {message}
          </Text>
          
          <Box style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            gap: 12,
            marginTop: 8,
          }}>
            {defaultButtons.map((button, index) => (
              <button
                key={index}
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 10,
                  backgroundColor: button.style === 'cancel' 
                    ? 'transparent' 
                    : button.style === 'destructive' 
                      ? currentColors.error.main 
                      : currentColors.primary['500'],
                  border: button.style === 'cancel' ? `1px solid ${currentColors.secondary['200']}` : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
                onClick={() => {
                  button.onPress?.();
                  onDismiss?.();
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <Text 
                  style={{ 
                    color: button.style === 'cancel' 
                      ? currentColors.text.soft 
                      : '#FFFFFF',
                    fontWeight: '500',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  {button.text}
                </Text>
              </button>
            ))}
          </Box>
        </Box>
      </Pressable>
    </Pressable>
  );
} 