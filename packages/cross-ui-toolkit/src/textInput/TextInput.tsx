import React, { useRef } from 'react';
import { TextInputProps, textInputStyles, textInputSizeStyles } from '.';
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
    ...rest
  } = props;
  const { currentColors } = useTheme();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const sizeStyle = textInputSizeStyles[size];

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
    backgroundColor: currentColors.surface.card,
  };

  if (error) {
    inputStyle.borderColor = textInputStyles[variant]['&:error'].borderColor;
  }

  if (disabled) {
    Object.assign(inputStyle, textInputStyles[variant]['&:disabled']);
  }

  // Custom focus handler to add border color on focus (more subtle)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!disabled) {
      e.currentTarget.style.outline = 'none';
      // Subtle focus: lighter border color, no boxShadow or a very faint one
      e.currentTarget.style.boxShadow = '0 0 0 1px ' + (error
        ? textInputStyles[variant]['&:error'].borderColor
        : currentColors.primary[200]);
      e.currentTarget.style.borderColor = error
        ? textInputStyles[variant]['&:error'].borderColor
        : currentColors.primary[200];
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = error
      ? textInputStyles[variant]['&:error'].borderColor
      : currentColors.primary[200];
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
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', backgroundColor: currentColors.neutral[100] }}
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
          style={inputStyle}
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
            color: error ? textInputStyles[variant]['&:error'].borderColor : currentColors.text.soft,
          }}
        >
          {helperText}
        </Text>
      )}
    </div>
  );
}
