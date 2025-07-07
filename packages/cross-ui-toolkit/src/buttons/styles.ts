import { ButtonVariant, ButtonSize } from '.';

export const buttonStyles: Record<ButtonVariant, any> = {
  primary: {
    backgroundColor: (props: any) => props?.backgroundColor || '#C29CFF',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: (props: any) => props?.borderColor || '#DCC2FF',
    shadowColor: (props: any) => props?.shadowColor || '#8E57FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    '&:hover': {
      backgroundColor: (props: any) => props?.hoverColor || '#B38CFF',
    },
    '&:active': {
      backgroundColor: (props: any) => props?.activeColor || '#A47CFF',
    },
    '&:disabled': {
      backgroundColor: '#E5D7FF',
      borderColor: '#E5D7FF',
    },
  },
  secondary: {
    backgroundColor: '#F6F7FB',
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    '&:hover': {
      backgroundColor: '#E5E7EB',
    },
    '&:active': {
      backgroundColor: '#D1D5DB',
    },
    '&:disabled': {
      backgroundColor: '#F9FAFB',
      borderColor: '#F3F4F6',
      color: '#9CA3AF',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    '&:hover': {
      backgroundColor: '#F9FAFB',
    },
    '&:active': {
      backgroundColor: '#F3F4F6',
    },
    '&:disabled': {
      borderColor: '#E5E7EB',
      color: '#9CA3AF',
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#1A1A1A',
    borderWidth: 0,
    '&:hover': {
      backgroundColor: '#F9FAFB',
    },
    '&:active': {
      backgroundColor: '#F3F4F6',
    },
    '&:disabled': {
      color: '#9CA3AF',
    },
  }
}; 