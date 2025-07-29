import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { DrawerProps } from './index';
import { useTheme } from '../theme/context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 50;

export const DrawerCustom = forwardRef<any, DrawerProps>(({
  children,
  isOpen = false,
  onClose,
  overlayClassName,
  drawerClassName,
  placement = 'bottom',
  closeOnOverlayClick = true,
  closeOnOverlayTap = true,
  openAnimationConfig,
  ...rest
}, ref) => {
  const [visible, setVisible] = useState(isOpen);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const { currentColors } = useTheme();

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => handleClose(),
  }));

  useEffect(() => {
    if (isOpen !== undefined) {
      if (isOpen) {
        setVisible(true);
      } else {
        handleClose();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onClose?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={closeOnOverlayTap ? handleClose : undefined}>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                backgroundColor: currentColors.surface.card,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: 'hidden',
                transform: [{ translateY }],
                maxHeight: SCREEN_HEIGHT * 0.9,
              }}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setContentHeight(height);
              }}
            >
              <View {...panResponder.panHandlers} style={{
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <View style={{
                  width: 40,
                  height: 4,
                  backgroundColor: currentColors.text.soft,
                  borderRadius: 2,
                }} />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ minHeight: 200,}}
              >
                  {children}
              </KeyboardAvoidingView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

DrawerCustom.displayName = 'DrawerCustom';