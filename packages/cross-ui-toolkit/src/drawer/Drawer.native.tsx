import React, { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';

type ModalProps = React.ComponentProps<typeof Modalize> & {
  children: React.ReactNode;
};

export const Drawer = forwardRef<Modalize, ModalProps>(({ children, ...props }, ref) => {
  return (
    <Modalize ref={ref} {...props} adjustToContentHeight>
      {children}
    </Modalize>
  );
});

Drawer.displayName = 'Modal';
