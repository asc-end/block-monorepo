import React from 'react';

// Base props that are common across all components
export interface BaseProps {
  children?: React.ReactNode;
  style?: React.CSSProperties | any;
  className?: string;
}