import { Rect as RNRect, RectProps as RNRectProps } from 'react-native-svg';

export interface RectProps extends RNRectProps {
  color?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Rect(props: RectProps) {
  const { color = 'currentColor', fill, x, y, width, height, ...restProps } = props;
  return <RNRect fill={fill || color} x={x} y={y} width={width} height={height} {...restProps} />;
} 