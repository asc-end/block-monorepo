import * as React from 'react';

export interface GProps extends React.SVGProps<SVGGElement> {
  children?: React.ReactNode;
}

export function G(props: GProps) {
  const { children, ...rest } = props;
  return React.createElement('g', rest, children);
}