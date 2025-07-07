import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';

type DrawerProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
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
};

export type DrawerHandle = {
  open: () => void;
  close: () => void;
};

export const Drawer = forwardRef<DrawerHandle, DrawerProps>(
  (
    {
      isOpen: isOpenProp,
      onClose,
      children,
      overlayClassName = '',
      drawerClassName = '',
      placement = 'bottom',
      closeOnOverlayClick = true,
      adjustToContentHeight = false,
      closeOnOverlayTap,
      openAnimationConfig,
      ...props
    },
    ref
  ) => {

            drawerClassName = drawerClassName + " bg-theme-bg";
    const [isOpen, setIsOpen] = React.useState(!!isOpenProp);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    // Sync with controlled prop
    React.useEffect(() => {
      if (typeof isOpenProp === 'boolean') setIsOpen(isOpenProp);
    }, [isOpenProp]);

    // Expose open/close methods
    useImperativeHandle(
      ref,
      () => ({
        open: () => setIsOpen(true),
        close: () => {
          setIsOpen(false);
          if (onClose) onClose();
        },
      }),
      [onClose]
    );

    // Trap focus and restore on close
    React.useEffect(() => {
      if (isOpen) {
        lastActiveElement.current = document.activeElement as HTMLElement;
        // Focus drawer for accessibility
        setTimeout(() => {
          const drawer = document.getElementById('drawer-root');
          if (drawer) drawer.focus();
        }, 0);
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        if (lastActiveElement.current) lastActiveElement.current.focus();
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Determine which prop to use for overlay click
    const effectiveCloseOnOverlayClick =
      typeof closeOnOverlayTap === 'boolean' ? closeOnOverlayTap : closeOnOverlayClick;

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (effectiveCloseOnOverlayClick && e.target === e.currentTarget) {
          setIsOpen(false);
          if (onClose) onClose();
        }
      },
      [onClose, effectiveCloseOnOverlayClick]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          if (onClose) onClose();
        }
      },
      [onClose]
    );

    if (!isOpen) return null;

    // Drawer slide-in styles based on placement
    const getDrawerStyle = () => {
      const base: React.CSSProperties = {
        borderRadius: placement === 'bottom' ? '12px 12px 0 0' : placement === 'top' ? '0 0 12px 12px' : '0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        outline: 'none',
        position: 'fixed',
        transition: openAnimationConfig?.timing?.duration
          ? `transform ${openAnimationConfig.timing.duration}ms cubic-bezier(.4,0,.2,1)`
          : 'transform 0.25s cubic-bezier(.4,0,.2,1)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      };

      // If adjustToContentHeight is true, don't set maxHeight/minHeight for bottom/top
      const contentHeightStyles =
        adjustToContentHeight && (placement === 'bottom' || placement === 'top')
          ? {}
          : {
              minHeight: 120,
              maxHeight: '90vh',
            };

      switch (placement) {
        case 'bottom':
          return {
            ...base,
            left: 0,
            right: 0,
            bottom: 0,
            ...contentHeightStyles,
            minWidth: 320,
            maxWidth: '100vw',
            transform: 'translateY(0%)',
          };
        case 'top':
          return {
            ...base,
            left: 0,
            right: 0,
            top: 0,
            ...contentHeightStyles,
            minWidth: 320,
            maxWidth: '100vw',
            borderRadius: '0 0 12px 12px',
            transform: 'translateY(0%)',
          };
        case 'right':
          return {
            ...base,
            top: 0,
            right: 0,
            height: '100vh',
            minWidth: 320,
            maxWidth: '90vw',
            borderRadius: '12px 0 0 12px',
            transform: 'translateX(0%)',
          };
        case 'left':
          return {
            ...base,
            top: 0,
            left: 0,
            height: '100vh',
            minWidth: 320,
            maxWidth: '90vw',
            borderRadius: '0 12px 12px 0',
            transform: 'translateX(0%)',
          };
        default:
          return base;
      }
    };

    return (
      <div
        className={`drawer-overlay ${overlayClassName}`}
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: placement === 'bottom' ? 'flex-end' : placement === 'top' ? 'flex-start' : 'stretch',
          justifyContent: placement === 'right' ? 'flex-end' : placement === 'left' ? 'flex-start' : 'center',
        }}
        onClick={handleOverlayClick}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div
          id="drawer-root"
          className={`drawer-content ${drawerClassName}`}
          style={getDrawerStyle()}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';
