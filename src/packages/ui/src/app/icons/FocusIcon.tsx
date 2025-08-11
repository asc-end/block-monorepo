import { Circle, Svg } from '@blockit/cross-ui-toolkit';
import React from 'react';

interface FocusIconProps {
  size?: number;
  color?: string;
}

export function FocusIcon({ size = 24, color = 'currentColor' }: FocusIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Outer circle - representing calm focus */}
      <Circle
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="1.5" 
        opacity="0.3"
      />
      {/* Middle circle - representing deeper focus */}
      <Circle 
        cx="12" 
        cy="12" 
        r="6" 
        stroke={color} 
        strokeWidth="1.5" 
        opacity="0.6"
      />
      {/* Inner circle - representing centered state */}
      <Circle 
        cx="12" 
        cy="12" 
        r="2" 
        fill={color} 
        opacity="0.9"
      />
    </Svg>
  );
}