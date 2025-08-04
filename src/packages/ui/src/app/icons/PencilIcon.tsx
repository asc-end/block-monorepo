import React from 'react';
import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface PencilIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function PencilIcon({ size = 24, color = 'currentColor', strokeWidth = 2 }: PencilIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.5626 2.87891 19.1022 3.1024 19.5 3.50023C19.8978 3.89805 20.1213 4.43762 20.1213 5.00023C20.1213 5.56284 19.8978 6.1024 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}