export interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  overlayClassName?: string;
  modalClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

export { Modal } from './Modal';