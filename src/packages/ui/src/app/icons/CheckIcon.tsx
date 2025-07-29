import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface CheckIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function CheckIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: CheckIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}