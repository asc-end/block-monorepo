import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import type { DrawerProps, DrawerHandle } from './index';
import { useTheme } from '../theme/context';

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
    const { currentColors } = useTheme()
    const [isOpen, setIsOpen] = React.useState(!!isOpenProp);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(!!isOpenProp);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    // Sync with controlled prop
    React.useEffect(() => {
      if (typeof isOpenProp === 'boolean') {
        if (isOpenProp) {
          setIsVisible(true);
          // Trigger animation after a frame
          requestAnimationFrame(() => {
            setIsOpen(true);
            setIsAnimating(true);
          });
        } else {
          setIsOpen(false);
          setIsAnimating(true);
          // Hide after animation completes
          setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
          }, 300);
        }
      }
    }, [isOpenProp]);

    // Expose open/close methods
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setIsVisible(true);
          requestAnimationFrame(() => {
            setIsOpen(true);
            setIsAnimating(true);
          });
        },
        close: () => {
          setIsOpen(false);
          setIsAnimating(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
            if (onClose) onClose();
          }, 300);
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
          setIsAnimating(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
            if (onClose) onClose();
          }, 300);
        }
      },
      [onClose, effectiveCloseOnOverlayClick]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          setIsAnimating(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsAnimating(false);
            if (onClose) onClose();
          }, 300);
        }
      },
      [onClose]
    );

    if (!isVisible) return null;

    // Drawer slide-in styles based on placement
    const getDrawerStyle = () => {
      const base: React.CSSProperties = {
        borderRadius: placement === 'bottom' ? '12px 12px 0 0' : placement === 'top' ? '0 0 12px 12px' : '0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        outline: 'none',
        position: 'fixed',
        transition: openAnimationConfig?.timing?.duration
          ? `transform ${openAnimationConfig.timing.duration}ms cubic-bezier(.4,0,.2,1), opacity 300ms ease`
          : 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease',
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
            transform: isOpen ? 'translateY(0%)' : 'translateY(100%)',
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
            transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
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
            transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
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
            transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
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
          background: isOpen ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
          transition: 'background-color 300ms ease',
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
          style={{ ...getDrawerStyle(), backgroundColor: currentColors.background }}
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
