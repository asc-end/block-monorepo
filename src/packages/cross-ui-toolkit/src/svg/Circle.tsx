import * as React from 'react';

export interface CircleProps extends React.SVGProps<SVGCircleElement> {
  cx: string | number;
  cy: string | number;
  r: string | number;
  color?: string;
  fill?: string;
}

export function Circle(props: CircleProps) {
  const { color = 'currentColor', fill, cx, cy, r, ...rest } = props;
  return React.createElement('circle', { cx, cy, r, fill, color, ...rest });
}