import React, { useMemo } from 'react';
import { ToggleProps, toggleSizeStyles } from '.';
import { useTheme } from '../theme/context';

export function Toggle(props: ToggleProps): React.ReactElement {
  const {
    value,
    onValueChange,
    disabled = false,
    style,
    className,
    trackColor,
    thumbColor,
    size = 'md',
  } = props;

  const { currentColors } = useTheme();
  const sizeStyle = toggleSizeStyles[size];

  const defaultTrackColor = {
    false: '#E9E9EA',
    true: '#4CD964',
  };

  const defaultThumbColor = {
    false: '#FFFFFF',
    true: '#FFFFFF',
  };

  const actualTrackColor = trackColor || defaultTrackColor;
  const actualThumbColor = thumbColor || defaultThumbColor;

  const containerStyle = useMemo(() => ({
    width: sizeStyle.width,
    height: sizeStyle.height,
    position: 'relative' as const,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  }), [sizeStyle, disabled, style]);

  const trackStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    backgroundColor: value ? actualTrackColor.true : actualTrackColor.false,
    borderRadius: sizeStyle.height / 2,
    transition: 'background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    boxShadow: value 
      ? 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)' 
      : 'inset 0 0 0 1px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.04)',
  }), [value, actualTrackColor, sizeStyle]);

  const thumbStyle = useMemo(() => ({
    width: sizeStyle.thumbSize,
    height: sizeStyle.thumbSize,
    backgroundColor: value ? actualThumbColor.true : actualThumbColor.false,
    borderRadius: '50%',
    position: 'absolute' as const,
    top: sizeStyle.thumbMargin,
    left: value ? sizeStyle.width - sizeStyle.thumbSize - sizeStyle.thumbMargin : sizeStyle.thumbMargin,
    transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: `translateX(0)`,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.08)',
    border: '0.5px solid rgba(0, 0, 0, 0.04)',
  }), [value, actualThumbColor, sizeStyle]);

  const handleClick = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      role="switch"
      aria-checked={value}
      aria-disabled={disabled}
    >
      <div style={trackStyle}>
        <div style={thumbStyle} />
      </div>
    </div>
  );
}