import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { TextInputProps, textInputVariantConfig, textInputSizeStyles, getTextInputColors } from '.';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';

export function TextInput(props: TextInputProps & RNTextInputProps): React.ReactElement {
  const {
    variant = 'default',
    size = 'md',
    placeholder,
    value,
    onChangeText,
    disabled = false,
    error = false,
    label,
    helperText,
    style,
    className,
    keyboardType = 'default',
    ...rest
  } = props;
  const { currentColors } = useTheme();

  const sizeStyle = textInputSizeStyles[size];
  const variantConfig = textInputVariantConfig[variant];
  const colors = getTextInputColors(currentColors, variant, { error, disabled });

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

  return (
    <View className={className + " flex flex-col items-start w-fit"}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        placeholderTextColor={colors.placeholderColor}
        keyboardType={keyboardType}
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
