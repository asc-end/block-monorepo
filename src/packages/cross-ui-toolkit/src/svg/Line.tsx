import React from 'react';

export interface LineProps {
  x1?: string | number;
  y1?: string | number;
  x2?: string | number;
  y2?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeDasharray?: string | number[];
  strokeOpacity?: string | number;
  fill?: string;
  fillOpacity?: string | number;
  opacity?: string | number;
}

export const Line: React.FC<LineProps> = (props) => {
  const { strokeDasharray, ...restProps } = props;
  
  // Convert number array to string if needed
  const dashArray = Array.isArray(strokeDasharray) 
    ? strokeDasharray.join(' ')
    : strokeDasharray;
  
  return <line {...restProps} strokeDasharray={dashArray} />;
};