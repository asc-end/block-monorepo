import { LinearGradient as RNLinearGradient } from 'react-native-svg';
import React from 'react';

export interface LinearGradientProps {
  id: string;
  x1?: string | number;
  y1?: string | number;
  x2?: string | number;
  y2?: string | number;
  children?: React.ReactElement | React.ReactElement[];
}

export function LinearGradient({ children, ...props }: LinearGradientProps) {
  return <RNLinearGradient {...props}>{children}</RNLinearGradient>;
}