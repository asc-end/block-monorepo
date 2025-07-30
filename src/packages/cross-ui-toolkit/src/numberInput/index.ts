import { BaseProps } from "../types";
import { ThemeColors } from "../theme/context";

// NumberInput variant types
export type NumberInputVariant = 'default' | 'outline' | 'filled';

// NumberInput size types
export type NumberInputSize = 'sm' | 'md' | 'lg';

// NumberInput component props
export interface NumberInputProps extends BaseProps {
  variant?: NumberInputVariant;
  size?: NumberInputSize;
  placeholder?: string;
  value?: number;
  onChangeNumber?: (value: number | undefined) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  showClearButton?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const numberInputSizeStyles: Record<NumberInputSize, any> = {
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
export const numberInputVariantConfig = {
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

// Shared function to get number input colors based on state
export const getNumberInputColors = (
  theme: ThemeColors,
  variant: NumberInputVariant,
  state: {
    error?: boolean;
    disabled?: boolean;
    focused?: boolean;
  }
) => {
  const variantConfig = numberInputVariantConfig[variant];
  
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