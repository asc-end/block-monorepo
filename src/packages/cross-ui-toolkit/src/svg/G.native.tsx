import { G as RNG } from 'react-native-svg';
import * as React from 'react';

export interface GProps {
  children?: React.ReactNode;
}

export function G(props: GProps) {
  return <RNG {...props} />;
}