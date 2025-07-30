import { Circle as RNCircle, CircleProps as RNCircleProps } from 'react-native-svg';

export interface CircleProps extends RNCircleProps {
  color?: string;
  cx: number;
  cy: number;
  r: number;
}

export function Circle(props: CircleProps) {
  const { color = 'currentColor', fill, cx, cy, r, ...restProps } = props;
  return <RNCircle fill={fill || color} cx={cx} cy={cy} r={r} {...restProps} />;
}