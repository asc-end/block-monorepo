import { Mask as RNMask, MaskProps as RNMaskProps } from 'react-native-svg';
import * as React from 'react';

export interface MaskProps extends RNMaskProps {
  id: string;
  children?: React.ReactNode;
}

export function Mask(props: MaskProps) {
  return <RNMask {...props} />;
}