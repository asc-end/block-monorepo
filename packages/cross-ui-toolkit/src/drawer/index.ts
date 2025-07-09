import { BaseProps } from "../types";

// Drawer component props for cross-platform compatibility
export interface DrawerProps extends BaseProps {
  isOpen?: boolean;
  onClose?: () => void;
  overlayClassName?: string;
  drawerClassName?: string;
  placement?: 'bottom' | 'right' | 'left' | 'top';
  closeOnOverlayClick?: boolean;
  adjustToContentHeight?: boolean;
  closeOnOverlayTap?: boolean;
  openAnimationConfig?: {
    spring?: { speed?: number; bounciness?: number };
    timing?: { duration?: number };
  };
}

// Export types
export type DrawerHandle = {
  open: () => void;
  close: () => void;
};

// Export the component
export { Drawer } from './Drawer';