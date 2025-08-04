import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface MobileIconProps {
  size?: number;
  color?: string;
}

export function MobileIcon({ size = 16, color = 'currentColor' }: MobileIconProps) {
  return (
    <Svg
      size={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M9 18h6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}