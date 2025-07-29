import { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import type { DrawerProps } from './index';
import { DrawerCustom } from './DrawerCustom.native';
// import { DrawerCustom } from './DrawerCustom.native';

// Original Modalize implementation
// export const Drawer = forwardRef<Modalize, DrawerProps>(({
//   children,
//   isOpen,
//   onClose,
//   overlayClassName,
//   drawerClassName,
//   placement,
//   closeOnOverlayClick,
//   closeOnOverlayTap,
//   openAnimationConfig,
//   ...modalizeProps
// }, ref) => {
//   return (
//     <Modalize 
//       ref={ref} 
//       adjustToContentHeight 
//       avoidKeyboardLikeIOS
//       {...modalizeProps}
//     >
//       {children}
//     </Modalize>
//   );
// });

// Custom implementation without Modalize (appears above tab bar)
export const Drawer = forwardRef<any, DrawerProps>((props, ref) => {
  return <DrawerCustom ref={ref} {...props} />;
});

Drawer.displayName = 'Drawer';
