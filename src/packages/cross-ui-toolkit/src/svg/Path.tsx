import * as React from 'react';

export interface PathProps extends React.SVGProps<SVGPathElement> {
  d: string;
  color?: string;
  fill?: string;
}

export function Path(props: PathProps) {
  const { color = 'currentColor', fill, d, ...rest } = props;
  return React.createElement('path', { d, fill, color, ...rest });
}