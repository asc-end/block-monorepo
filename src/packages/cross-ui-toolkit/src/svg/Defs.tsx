import * as React from 'react';

export interface DefsProps extends React.SVGProps<SVGDefsElement> {
  children?: React.ReactNode;
}

export function Defs(props: DefsProps) {
  const { children, ...rest } = props;
  return React.createElement('defs', rest, children);
}