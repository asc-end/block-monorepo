import React from 'react';
import { Svg, Circle, Path } from '@blockit/cross-ui-toolkit';

interface WebIconProps {
  size?: number;
  color?: string;
}

export function WebIcon({ size = 16, color = 'currentColor' }: WebIconProps) {
  return (
    <Svg
      size={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}