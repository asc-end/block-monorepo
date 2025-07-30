import { Defs as RNDefs } from 'react-native-svg';
import * as React from 'react';

export interface DefsProps {
  children?: React.ReactNode;
}

export function Defs(props: DefsProps) {
  return <RNDefs {...props} />;
}