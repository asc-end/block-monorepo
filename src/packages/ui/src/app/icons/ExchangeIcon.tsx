import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface ExchangeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function ExchangeIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: ExchangeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 7L19 7M19 7L15 3M19 7L15 11"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 17L5 17M5 17L9 13M5 17L9 21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}