import React, { useMemo, useState, CSSProperties } from 'react';
import { ButtonProps, buttonStyles, buttonSizeStyles } from '.';

export function Button(props: ButtonProps): React.ReactElement {
  const {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    style,
    className,
    onPress,
    onPressIn,
    onLayout,
    title,
    leftIcon,
    rightIcon,
    loading = false,
    loadingText,
    ...rest
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const variantStyle = buttonStyles[variant];
  const sizeStyle = buttonSizeStyles[size];
  const isPrimary = variant === 'primary';

  const buttonStyle = useMemo(() => ({
    width: '100%',
    position: 'relative' as const,
    opacity: disabled ? 0.5 : 1,
    backgroundColor: style?.backgroundColor ?? variantStyle.backgroundColor,
    borderWidth: variantStyle.borderWidth,
    borderColor: style?.borderColor ?? variantStyle.borderColor,
    borderRadius: variantStyle.borderRadius ?? sizeStyle.borderRadius,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    paddingVertical: sizeStyle.paddingVertical,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    transform: isPressed && isPrimary ? 'translateY(4px)' : 'translateY(0)',
    transition: 'all 0.1s ease-in-out',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    filter: isHovered && !disabled && !loading ? 'brightness(1.1)' : 'none',
    ...style,
  }), [variantStyle, sizeStyle, disabled, isPressed, isPrimary, style, loading, isHovered]);

  const shadowStyle = useMemo(() => ({
    position: 'absolute' as const,
    top: 4,
    left: 0,
    right: 0,
    bottom: -4,
    backgroundColor: style?.shadowColor ?? variantStyle.shadowColor,
    borderRadius: variantStyle.borderRadius || sizeStyle.borderRadius,
    zIndex: 0,
    opacity: isPrimary && !disabled ? 1 : 0,
  }), [variantStyle, sizeStyle, disabled, isPrimary, style]);

  const contentStyle: CSSProperties = {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const textStyle: CSSProperties = {
    color: variantStyle.color,
    fontSize: sizeStyle.fontSize,
    fontWeight: sizeStyle.fontWeight,
    letterSpacing: sizeStyle.letterSpacing,
  };

  const displayTitle = loading ? (loadingText || title) : title;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div style={shadowStyle} />
      <button
        style={buttonStyle}
        className={className}
        onClick={() => onPress?.()}
        onMouseDown={() => { setIsPressed(true); onPressIn?.() }}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => {
          setIsPressed(false);
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        disabled={disabled || loading}
        {...rest}
      >
        <div style={contentStyle}>
          {loading ? (
            <div style={contentStyle}>
              <div className="loading-spinner" style={{ color: variantStyle.color }} />
              {displayTitle && <span style={textStyle}>{displayTitle}</span>}
            </div>
          ) : (
            <>
              {leftIcon && leftIcon}
              {displayTitle && <span style={textStyle}>{displayTitle}</span>}
              {rightIcon && rightIcon}
              {children}
            </>
          )}
        </div>
      </button>
    </div>
  );
}
