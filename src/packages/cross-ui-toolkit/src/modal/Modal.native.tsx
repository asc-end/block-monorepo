import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../theme/context';
import type { ModalProps, ModalHandle } from './index';

export const Modal = forwardRef<ModalHandle, ModalProps>(
  (
    {
      isOpen: isOpenProp,
      onClose,
      children,
      overlayClassName = '',
      modalClassName = '',
      closeOnOverlayClick = true,
      showCloseButton = true,
      title,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const { currentColors } = useTheme();
    const [isOpen, setIsOpen] = React.useState(!!isOpenProp);

    // Sync with controlled prop
    React.useEffect(() => {
      if (typeof isOpenProp === 'boolean') {
        setIsOpen(isOpenProp);
      }
    }, [isOpenProp]);

    // Expose open/close methods
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setIsOpen(true);
        },
        close: () => {
          setIsOpen(false);
          if (onClose) onClose();
        },
      }),
      [onClose]
    );

    const handleClose = useCallback(() => {
      setIsOpen(false);
      if (onClose) onClose();
    }, [onClose]);

    return (
      <RNModal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={handleClose}
        {...props}
      >
        <Pressable 
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={closeOnOverlayClick ? handleClose : undefined}
        >
          <Pressable
            style={{
              backgroundColor: currentColors.background,
              borderRadius: 16,
              padding: 20,
              width: '90%',
              maxWidth: size === 'sm' ? 300 : size === 'md' ? 400 : size === 'lg' ? 500 : 600,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {title && (
              <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: currentColors.border }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: currentColors.text }}>
                  {title}
                </Text>
              </View>
            )}
            
            {showCloseButton && (
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  padding: 8,
                }}
              >
                <Text style={{ fontSize: 24, color: currentColors.text }}>×</Text>
              </TouchableOpacity>
            )}
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </Pressable>
        </Pressable>
      </RNModal>
    );
  }
);

Modal.displayName = 'Modal';