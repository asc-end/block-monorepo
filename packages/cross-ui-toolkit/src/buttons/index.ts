import { BaseProps } from "../types";
import { ReactNode } from "react";
import { ThemeColors } from "../theme/context";

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

// Button component props
export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onLayout?: (event: any) => void;
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

// Get button styles based on theme and variant
export const getButtonStyles = (theme: ThemeColors, variant: ButtonVariant) => {
  const styles = {
    primary: {
      backgroundColor: theme.primary[300],
      color: '#FFFFFF',
      borderWidth: 1,
      borderColor: theme.primary[200],
      shadowColor: theme.primary[600],
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
      transform: [{ translateY: 0 }],
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        backgroundColor: theme.primary[400],
      },
      '&:active': {
        backgroundColor: theme.primary[500],
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        elevation: 2,
        transform: [{ translateY: 2 }],
        transition: 'all 0.1s ease-in-out',
      },
      '&:disabled': {
        backgroundColor: theme.neutral[300],
        color: theme.neutral[600],
      },
    },
    secondary: {
      backgroundColor: theme.secondary[300],
      color: '#FFFFFF',
      borderWidth: 0,
      borderColor: theme.secondary[400],
      shadowColor: theme.secondary[600],
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 0,
      elevation: 4,
      transform: [{ translateY: 0 }],
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        backgroundColor: theme.secondary[400],
      },
      '&:active': {
        backgroundColor: theme.secondary[500],
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        elevation: 2,
        transform: [{ translateY: 2 }],
        transition: 'all 0.1s ease-in-out',
      },
      '&:disabled': {
        backgroundColor: theme.neutral[300],
        color: theme.neutral[600],
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.primary[300],
      borderWidth: 1,
      borderColor: theme.primary[300],
      shadowColor: theme.primary[300],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 0,
      elevation: 2,
      transform: [{ translateY: 0 }],
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        backgroundColor: theme.primary[50],
      },
      '&:active': {
        backgroundColor: theme.primary[100],
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 1,
        transform: [{ translateY: 1 }],
        transition: 'all 0.1s ease-in-out',
      },
      '&:disabled': {
        borderColor: theme.neutral[300],
        color: theme.neutral[600],
      },
    },
    ghost: {
      padding: '0 !important',
      backgroundColor: 'transparent',
      color: theme.secondary[500],
      borderWidth: 0,
      borderColor: 'transparent',
      shadowColor: 'transparent',
      transform: [{ translateY: 0 }],
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        filter: 'hue-rotate(15deg)',
      },
      '&:active': {
        filter: 'hue-rotate(15deg)',
        transform: [{ translateY: 1 }],
        transition: 'all 0.1s ease-in-out',
      },
      '&:disabled': {
        color: theme.neutral[600],
      },
    },
  };
  
  return styles[variant];
};

export const buttonSizeStyles: Record<ButtonSize, any> = {
  xs: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 4,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 6,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    borderRadius: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 24,
    borderRadius: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}; 