import { Filter as RNFilter } from 'react-native-svg';
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

export function Filter(props: FilterProps) {
  return <RNFilter {...props} />;
}