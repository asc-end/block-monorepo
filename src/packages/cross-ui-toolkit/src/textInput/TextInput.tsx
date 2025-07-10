import React, { useRef } from 'react';
import { TextInputProps, textInputVariantConfig, textInputSizeStyles, getTextInputColors } from '.';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';

export function TextInput(props: TextInputProps): React.ReactElement {
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
    className = '',
    multiline = false,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const { currentColors } = useTheme();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const sizeStyle = textInputSizeStyles[size];
  const variantConfig = textInputVariantConfig[variant];
  const colors = getTextInputColors(currentColors, variant, { error, disabled, focused: isFocused });

  // Remove outline and boxShadow by default, add custom focus style
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

  // Custom focus handler to add border color on focus (more subtle)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div style={{ width: '100%' }} className="flex flex-col items-center">
      {label && (
        <Text variant="label" style={{ marginBottom: 4, width: "100%" }}>
          {label}
        </Text>
      )}
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', boxShadow: colors.focusBoxShadow }}
          className={className + " p-2 focus:outline-none"}
          placeholder={placeholder}
          value={value}
          onChange={e => onChangeText?.(e.target.value)}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          style={{ ...inputStyle, boxShadow: colors.focusBoxShadow }}
          className={className + " p-2 focus:outline-none"}
          placeholder={placeholder}
          value={value}
          onChange={e => onChangeText?.(e.target.value)}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      )}
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
