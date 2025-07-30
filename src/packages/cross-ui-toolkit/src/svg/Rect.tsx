import * as React from 'react';

export interface RectProps extends React.SVGProps<SVGRectElement> {
  d: string;
  color?: string;
  fill?: string;
}

export function Rect(props: RectProps) {
  const { color = 'currentColor', fill, ...rest } = props;
  return React.createElement('rect', { fill, color, ...rest });
}