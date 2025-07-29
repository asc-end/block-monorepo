import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface CloseIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function CloseIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: CloseIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6L18 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}