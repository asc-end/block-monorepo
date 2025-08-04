import React, { useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import type { AlertProps, AlertButton } from './Alert';
import { useTheme } from '../theme/context';

const { width: screenWidth } = Dimensions.get('window');

export function Alert({ title, message, buttons = [], visible, onDismiss }: AlertProps): React.ReactElement | null {
  const { currentColors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  const defaultButtons: AlertButton[] = buttons.length > 0 ? buttons : [
    { text: 'OK', style: 'default' }
  ];
  
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);
  
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                styles.alertContainer,
                {
                  backgroundColor: currentColors.surface.card,
                  borderColor: currentColors.neutral['300'],
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                }
              ]}
            > 
              <View style={styles.content}>
                <Text style={[
                  styles.title,
                  { color: currentColors.text.main }
                ]}>
                  {title}
                </Text>
                
                <Text style={[
                  styles.message,
                  { color: currentColors.text.soft }
                ]}>
                  {message}
                </Text>
                
                <View style={styles.buttonContainer}>
                  {defaultButtons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        {
                          backgroundColor: button.style === 'cancel' 
                            ? currentColors.neutral[500]
                            : button.style === 'destructive' 
                              ? currentColors.error.main 
                              : currentColors.primary['500'],
                        }
                      ]}
                      onPress={() => {
                        button.onPress?.();
                        onDismiss?.();
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.buttonText,
                        {
                          color: button.style === 'cancel' 
                            ? currentColors.text.soft 
                            : '#FFFFFF',
                        }
                      ]}>
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: Math.min(screenWidth * 0.9, 420),
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: 28,
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 