import React from 'react';

export interface StopProps {
  offset: string | number;
  stopColor?: string;
  stopOpacity?: string | number;
}

export const Stop: React.FC<StopProps> = (props) => {
  return <stop {...props} />;
};