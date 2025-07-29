import React from 'react';
import { GradientProps, directionToAngle, normalizeColors } from '.';

export function Gradient(props: GradientProps): React.ReactElement {
  const {
    type = 'linear',
    direction = 'to-bottom',
    colors = ['#000000', '#FFFFFF'],
    angle,
    borderRadius = 0,
    style,
    className = '',
    children,
    ...rest
  } = props;

  const { colors: normalizedColors, offsets } = normalizeColors(colors);

  // Build gradient string
  const buildGradient = () => {
    const gradientAngle = angle !== undefined ? angle : directionToAngle[direction];
    
    if (type === 'linear') {
      const colorStops = normalizedColors.map((color, index) => {
        const offset = offsets?.[index];
        return offset !== undefined ? `${color} ${offset * 100}%` : color;
      }).join(', ');
      
      return `linear-gradient(${gradientAngle}deg, ${colorStops})`;
    } else {
      // Radial gradient
      const colorStops = normalizedColors.map((color, index) => {
        const offset = offsets?.[index];
        return offset !== undefined ? `${color} ${offset * 100}%` : color;
      }).join(', ');
      
      return `radial-gradient(circle, ${colorStops})`;
    }
  };

  const gradientStyle = {
    background: buildGradient(),
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...style,
  };

  return (
    <div
      className={`flex ${className}`}
      style={gradientStyle}
      {...rest}
    >
      {children}
    </div>
  );
}