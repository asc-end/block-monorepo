import { RadialGradient as RNRadialGradient } from 'react-native-svg';
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

export function RadialGradient(props: RadialGradientProps) {
  return <RNRadialGradient {...props} />;
}