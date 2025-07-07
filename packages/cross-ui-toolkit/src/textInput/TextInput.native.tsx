import React from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet, View } from 'react-native';
import { TextInputProps, textInputStyles, textInputSizeStyles } from '.';
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

  const styles = StyleSheet.create({
    input: {
      ...sizeStyle,
      borderWidth: 1,
      borderColor: error 
        ? currentColors.error.main 
        : currentColors.neutral[300],
      backgroundColor: disabled 
        ? currentColors.neutral[100]
        : currentColors.surface.card,
      color: disabled 
        ? currentColors.text.verySoft 
        : currentColors.text.main,
    },
    label: {
      marginBottom: 4,
    },
    helperText: {
      marginTop: 4,
      color: error 
        ? textInputStyles[variant]['&:error'].borderColor 
        : currentColors.text.soft,
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
        placeholderTextColor={currentColors.text.verySoft}
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
