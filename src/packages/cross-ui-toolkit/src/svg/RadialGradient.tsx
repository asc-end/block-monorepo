import React from 'react';

export interface RadialGradientProps {
  id?: string;
  cx?: string | number;
  cy?: string | number;
  r?: string | number;
  fx?: string | number;
  fy?: string | number;
  gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  gradientTransform?: string;
  children?: React.ReactNode;
}

export const RadialGradient: React.FC<RadialGradientProps> = (props) => {
  return <radialGradient {...props} />;
};