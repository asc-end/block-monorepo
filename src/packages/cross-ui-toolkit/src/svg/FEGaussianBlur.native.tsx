import { FeGaussianBlur as RNFEGaussianBlur } from 'react-native-svg';
import React from 'react';

export interface FEGaussianBlurProps {
  in?: string;
  in2?: string;
  stdDeviation?: string | number;
  edgeMode?: 'duplicate' | 'wrap' | 'none';
  result?: string;
}

export function FEGaussianBlur(props: FEGaussianBlurProps) {
  return <RNFEGaussianBlur {...props} />;
}