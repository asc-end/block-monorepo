import React from 'react';

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  width?: number | string;
  height?: number | string;
  rotation?: number;
  children?: React.ReactNode;
}

export function Svg({ size = 24, color = 'currentColor', width, height, rotation = 0, children, ...props }: SvgProps) {
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={props.viewBox ?? "0 0 24 24"}
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
    </svg>
  );
}