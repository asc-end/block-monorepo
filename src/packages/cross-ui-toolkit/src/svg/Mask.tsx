import * as React from 'react';

export interface MaskProps extends React.SVGProps<SVGMaskElement> {
  id: string;
  children?: React.ReactNode;
}

export function Mask(props: MaskProps) {
  const { children, id, ...rest } = props;
  return React.createElement('mask', { id, ...rest }, children);
}