import { Path as RNPath, PathProps as RNPathProps } from 'react-native-svg';

export interface PathProps extends RNPathProps {
  color?: string;
}

export function Path(props : PathProps) {
  const { color = 'currentColor', fill, d } = props
  return <RNPath fill={fill} color={color} d={d} {...props} />;
} 