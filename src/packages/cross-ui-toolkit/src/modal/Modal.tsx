import React, { forwardRef, useImperativeHandle, useCallback, useEffect, useRef } from 'react';
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
    const [isVisible, setIsVisible] = React.useState(!!isOpenProp);
    const lastActiveElement = useRef<HTMLElement | null>(null);

    // Sync with controlled prop
    React.useEffect(() => {
      if (typeof isOpenProp === 'boolean') {
        if (isOpenProp) {
          setIsVisible(true);
          requestAnimationFrame(() => {
            setIsOpen(true);
          });
        } else {
          setIsOpen(false);
          setTimeout(() => {
            setIsVisible(false);
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
          });
        },
        close: () => {
          setIsOpen(false);
          setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
          }, 300);
        },
      }),
      [onClose]
    );

    const modalContentRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 300);
    }, [onClose]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if the click target is the overlay itself (not its children)
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          handleClose();
        }
      },
      [closeOnOverlayClick, handleClose]
    );

    // Trap focus and restore on close
    useEffect(() => {
      if (isOpen) {
        lastActiveElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        // Focus the modal container to enable keyboard events
        const modalElement = document.querySelector('[role="dialog"]') as HTMLElement;
        if (modalElement) {
          modalElement.focus();
        }
      } else {
        document.body.style.overflow = '';
        if (lastActiveElement.current) lastActiveElement.current.focus();
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Global ESC key handler
    useEffect(() => {
      if (!isOpen) return;
      
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      
      document.addEventListener('keydown', handleGlobalKeyDown);
      return () => {
        document.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }, [isOpen, handleClose]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      },
      [handleClose]
    );

    if (!isVisible) return null;

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    };

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg ${overlayClassName}`}
        style={{
          backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
          transition: 'background-color 300ms ease',
        }}
        onClick={handleOverlayClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
      >
        <div
          ref={modalContentRef}
          className={`relative w-full ${sizeClasses[size]} ${modalClassName}`}
          style={{
            backgroundColor: currentColors.background,
            borderRadius: '16px',
            border: `1px solid ${currentColors.border}`,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transform: isOpen ? 'scale(1)' : 'scale(0.95)',
            opacity: isOpen ? 1 : 0,
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          {...props}
        >
          {title && (
            <div className="px-6 py-4 border-b" style={{ borderColor: currentColors.border }}>
              <h2 className="text-xl font-semibold" style={{ color: currentColors.text.main }}>
                {title}
              </h2>
            </div>
          )}
          
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke={currentColors.text.main}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';