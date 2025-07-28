import React, { useRef, useState, useEffect } from 'react';
import { NumberInputProps, numberInputVariantConfig, numberInputSizeStyles, getNumberInputColors } from '.';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';

export function NumberInput(props: NumberInputProps): React.ReactElement {
  const {
    variant = 'default',
    size = 'md',
    placeholder,
    value,
    onChangeNumber,
    disabled = false,
    error = false,
    label,
    helperText,
    style,
    className = '',
    min,
    max,
    step = 1,
    allowDecimals = true,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const { currentColors } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState(value !== undefined ? value.toString() : '');
  
  // Update text value when prop value changes
  useEffect(() => {
    setTextValue(value !== undefined ? value.toString() : '');
  }, [value]);

  const sizeStyle = numberInputSizeStyles[size];
  const variantConfig = numberInputVariantConfig[variant];
  const colors = getNumberInputColors(currentColors, variant, { error, disabled, focused: isFocused });

  const baseFocusStyle = {
    outline: 'none',
    boxShadow: 'none',
  };

  const inputStyle = {
    ...sizeStyle,
    ...style,
    boxSizing: 'border-box' as const,
    transition: 'all 0.2s ease-in-out',
    ...baseFocusStyle,
    borderWidth: variantConfig.borderWidth,
    borderStyle: 'solid',
    borderColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
    color: colors.textColor,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Update local text state
    setTextValue(inputValue);
    
    // Allow empty string for clearing
    if (inputValue === '') {
      onChangeNumber?.(undefined);
      return;
    }

    // Check if text is a valid number pattern (including incomplete decimals)
    const isValidPattern = allowDecimals 
      ? /^-?\d*\.?\d*$/.test(inputValue)
      : /^-?\d*$/.test(inputValue);
    
    if (!isValidPattern) {
      // Revert to previous value if invalid
      setTextValue(value !== undefined ? value.toString() : '');
      return;
    }

    // Don't parse if it ends with decimal or is just a minus sign
    if ((allowDecimals && inputValue.endsWith('.')) || inputValue === '-') {
      // Keep the text as is, but don't update the number value yet
      return;
    }

    // Parse the value as a number
    const numValue = allowDecimals ? parseFloat(inputValue) : parseInt(inputValue, 10);
    
    // Check if it's a valid number
    if (!isNaN(numValue)) {
      // Apply min/max constraints
      let constrainedValue = numValue;
      if (min !== undefined && numValue < min) {
        constrainedValue = min;
      }
      if (max !== undefined && numValue > max) {
        constrainedValue = max;
      }
      
      onChangeNumber?.(constrainedValue);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`} style={{ width: '100%' }}>
      {label && (
        <Text variant="label" style={{ marginBottom: 4, width: "100%" }}>
          {label}
        </Text>
      )}
      <input
        ref={inputRef}
        type="number"
        style={{ ...inputStyle, boxShadow: colors.focusBoxShadow, width: '100%' }}
        className="p-2 focus:outline-none w-full"
        placeholder={placeholder}
        value={value ?? ''}
        onChange={handleChange}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        {...rest}
      />
      {helperText && (
        <Text
          variant="caption"
          style={{
            marginTop: 4,
            color: colors.helperTextColor,
          }}
        >
          {helperText}
        </Text>
      )}
    </div>
  );
}