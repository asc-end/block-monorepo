import { BaseProps } from '../types';
import { View as RNView, ViewProps } from 'react-native';

export interface BoxProps extends BaseProps, Omit<ViewProps, 'style' | 'children'> {}

export function Box(props: BoxProps) {
  const { children, style, className, ...restProps } = props;
  return (
    <RNView style={[style]} className={className} {...restProps}>
      {children}
    </RNView>
  );
}

export default Box; 