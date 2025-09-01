import React from 'react';

export interface FEGaussianBlurProps {
  in?: string;
  in2?: string;
  stdDeviation?: string | number;
  edgeMode?: 'duplicate' | 'wrap' | 'none';
  result?: string;
}

export const FEGaussianBlur: React.FC<FEGaussianBlurProps> = (props) => {
  return <feGaussianBlur {...props} />;
};