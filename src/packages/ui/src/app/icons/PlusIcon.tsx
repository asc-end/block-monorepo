import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface PlusIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function PlusIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: PlusIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5V19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}