import { BaseProps } from '../types';
import { View as RNView } from 'react-native';

export function Box(props: BaseProps) {
  const { children, style, className } = props;
  return (
    <RNView style={[style]} className={className} {...props}>
      {children}
    </RNView>
  );
}

export default Box; 