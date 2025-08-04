import React from 'react';
import { Svg, Path, Defs, LinearGradient, Stop } from '@blockit/cross-ui-toolkit';

interface CloseIconGradientProps {
  size?: number;
  strokeWidth?: number;
  colors?: string[];
}

export function CloseIconGradient({ 
  size = 24, 
  strokeWidth = 2,
  colors = ['#FF6B6B', '#C66BFF', '#6B9FFF']
}: CloseIconGradientProps) {
  const gradientId = `close-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          {colors.map((color, index) => (
            <Stop 
              key={index} 
              offset={`${(index / (colors.length - 1)) * 100}%`} 
              stopColor={color} 
            />
          ))}
        </LinearGradient>
      </Defs>
      <Path
        d="M18 6L6 18"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6L18 18"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}