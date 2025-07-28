import React, { useState, useEffect } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { NumberInputProps, numberInputVariantConfig, numberInputSizeStyles, getNumberInputColors } from '.';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';

export function NumberInput(props: NumberInputProps & RNTextInputProps): React.ReactElement {
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
    className,
    min,
    max,
    step = 1,
    allowDecimals = true,
    ...rest
  } = props;
  const { currentColors } = useTheme();
  
  // Store the text value separately to handle intermediate states (like "1.")
  const [textValue, setTextValue] = useState(value !== undefined ? value.toString() : '');
  
  // Update text value when prop value changes
  useEffect(() => {
    setTextValue(value !== undefined ? value.toString() : '');
  }, [value]);

  const sizeStyle = numberInputSizeStyles[size];
  const variantConfig = numberInputVariantConfig[variant];
  const colors = getNumberInputColors(currentColors, variant, { error, disabled });

  const styles = StyleSheet.create({
    input: {
      ...sizeStyle,
      borderWidth: variantConfig.borderWidth,
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundColor,
      color: colors.textColor,
      opacity: disabled ? 0.6 : 1,
    },
    label: {
      marginBottom: 4,
    },
    helperText: {
      marginTop: 4,
      color: colors.helperTextColor,
    },
  });

  const handleChangeText = (text: string) => {
    // Update local text state
    setTextValue(text);
    
    // Allow empty string for clearing
    if (text === '') {
      onChangeNumber?.(undefined);
      return;
    }

    // Check if text is a valid number pattern (including incomplete decimals)
    const isValidPattern = allowDecimals 
      ? /^-?\d*\.?\d*$/.test(text)
      : /^-?\d*$/.test(text);
    
    if (!isValidPattern) {
      // Revert to previous value if invalid
      setTextValue(value !== undefined ? value.toString() : '');
      return;
    }

    // Don't parse if it ends with decimal or is just a minus sign
    if ((allowDecimals && text.endsWith('.')) || text === '-') {
      // Keep the text as is, but don't update the number value yet
      return;
    }

    // Parse the value as a number
    const numValue = allowDecimals ? parseFloat(text) : parseInt(text, 10);
    
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
    <View className={`flex flex-col items-start w-full ${className || ''}`}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, { width: '100%' }, style]}
        placeholder={placeholder}
        value={textValue}
        onChangeText={handleChangeText}
        editable={!disabled}
        placeholderTextColor={colors.placeholderColor}
        keyboardType={allowDecimals ? 'decimal-pad' : 'number-pad'}
        {...rest}
      />
      {helperText && (
        <Text variant="caption" style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
}