import { BaseProps } from "../types";
import { colors } from "@ascend/ui";

// TextInput variant types
export type TextInputVariant = 'default' | 'outline' | 'filled';

// TextInput size types
export type TextInputSize = 'sm' | 'md' | 'lg';

// TextInput component props
export interface TextInputProps extends BaseProps {
  variant?: TextInputVariant;
  size?: TextInputSize;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

export const textInputStyles: Record<TextInputVariant, any> = {
  default: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    color: colors.text.main,
    '&:focus': {
      borderColor: colors.primary[300],
      outline: 'none',
    },
    '&:disabled': {
      backgroundColor: colors.neutral[100],
      borderColor: colors.neutral[200],
      color: colors.text.verySoft,
    },
    '&:error': {
      borderColor: colors.error.main,
    },
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    color: colors.text.main,
    '&:focus': {
      borderColor: colors.primary[300],
      outline: 'none',
    },
    '&:disabled': {
      borderColor: colors.neutral[200],
      color: colors.text.verySoft,
    },
    '&:error': {
      borderColor: colors.error.main,
    },
  },
  filled: {
    borderWidth: 0,
    color: colors.text.main,
    '&:focus': {
      backgroundColor: colors.neutral[200],
      outline: 'none',
    },
    '&:disabled': {
      backgroundColor: colors.neutral[50],
      color: colors.text.verySoft,
    },
    '&:error': {
      backgroundColor: colors.error.light,
    },
  },
};

export const textInputSizeStyles: Record<TextInputSize, any> = {
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 6,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 8,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 10,
  },
}; 