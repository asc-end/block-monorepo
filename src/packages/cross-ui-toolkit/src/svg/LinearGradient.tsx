import React from 'react';

export interface LinearGradientProps {
  id: string;
  x1?: string | number;
  y1?: string | number;
  x2?: string | number;
  y2?: string | number;
  children?: React.ReactNode;
}

export const LinearGradient: React.FC<LinearGradientProps> = ({ children, ...props }) => {
  return <linearGradient {...props}>{children}</linearGradient>;
};