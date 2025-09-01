import React from 'react';

export interface FilterProps {
  id?: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  filterUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  primitiveUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
  children?: React.ReactNode;
}

export const Filter: React.FC<FilterProps> = (props) => {
  return <filter {...props} />;
};