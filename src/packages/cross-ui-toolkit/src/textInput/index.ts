import { BaseProps } from "../types";
import { ThemeColors } from "../theme/context";
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
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

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

// Variant-specific configuration
export const textInputVariantConfig = {
  default: {
    borderWidth: 1,
  },
  outline: {
    borderWidth: 2,
  },
  filled: {
    borderWidth: 0,
    useFilledBackground: true,
  },
} as const;

// Shared function to get text input colors based on state
export const getTextInputColors = (
  theme: ThemeColors,
  variant: TextInputVariant,
  state: {
    error?: boolean;
    disabled?: boolean;
    focused?: boolean;
  }
) => {
  const variantConfig = textInputVariantConfig[variant];
  
  return {
    borderColor: state.error 
      ? theme.error.main 
      : state.focused 
        ? theme.primary[300]
        : theme.neutral[300],
    backgroundColor: state.disabled
      ? theme.neutral[100]
      : 'useFilledBackground' in variantConfig && variantConfig.useFilledBackground
        ? theme.neutral[100]
        : theme.surface.card,
    textColor: state.disabled
      ? theme.text.verySoft
      : theme.text.main,
    placeholderColor: theme.text.verySoft,
    helperTextColor: state.error
      ? theme.error.main
      : theme.text.soft,
    focusBoxShadow: state.focused && !state.disabled
      ? `0 0 0 1px ${state.error ? theme.error.main : theme.primary[300]}`
      : 'none',
  };
}; 