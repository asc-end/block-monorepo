import { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import type { DrawerProps } from './index';


export const Drawer = forwardRef<Modalize, DrawerProps>(({
  children,
  isOpen,
  onClose,
  overlayClassName,
  drawerClassName,
  placement,
  closeOnOverlayClick,
  closeOnOverlayTap,
  openAnimationConfig,
  ...modalizeProps
}, ref) => {
  return (
    <Modalize ref={ref} adjustToContentHeight {...modalizeProps}>
      {children}
    </Modalize>
  );
});

Drawer.displayName = 'Drawer';
