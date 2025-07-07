import { BaseProps } from "../types";
import { colors } from "@ascend/ui";
import { ReactNode } from "react";

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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

export const buttonStyles: Record<ButtonVariant, any> = {
  primary: {
    backgroundColor: colors.primary[300],
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.primary[200],
    shadowColor: colors.primary[600],
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    transform: [{ translateY: 0 }],
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      backgroundColor: colors.primary[400],
    },
    '&:active': {
      backgroundColor: colors.primary[500],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.8,
      elevation: 2,
      transform: [{ translateY: 2 }],
      transition: 'all 0.1s ease-in-out',
    },
    '&:disabled': {
      backgroundColor: colors.neutral[300],
      color: colors.neutral[600],
    },
  },
  secondary: {
    backgroundColor: colors.secondary[300],
    color: colors.white,
    borderWidth: 0,
    shadowColor: colors.secondary[600],
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 4,
    transform: [{ translateY: 0 }],
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      backgroundColor: colors.secondary[400],
    },
    '&:active': {
      backgroundColor: colors.secondary[500],
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.6,
      elevation: 2,
      transform: [{ translateY: 2 }],
      transition: 'all 0.1s ease-in-out',
    },
    '&:disabled': {
      backgroundColor: colors.neutral[300],
      color: colors.neutral[600],
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.primary[300],
    borderWidth: 1,
    borderColor: colors.primary[300],
    shadowColor: colors.primary[300],
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
    transform: [{ translateY: 0 }],
    transition: 'all 0.15s ease-in-out',
    '&:hover': {
      backgroundColor: colors.primary[50],
    },
    '&:active': {
      backgroundColor: colors.primary[100],
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      elevation: 1,
      transform: [{ translateY: 1 }],
      transition: 'all 0.1s ease-in-out',
    },
    '&:disabled': {
      borderColor: colors.neutral[300],
      color: colors.neutral[600],
    },
  },
  ghost: {
    padding: '0 !important',
    backgroundColor: 'transparent',
    color: colors.secondary[500],
    borderWidth: 0,
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
      color: colors.neutral[600],
    },
  },
};

export const buttonSizeStyles: Record<ButtonSize, any> = {
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