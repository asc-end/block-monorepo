import { ClipPath as RNClipPath, ClipPathProps as RNClipPathProps } from 'react-native-svg';

export interface ClipPathProps extends RNClipPathProps {
  color?: string;
}

export function ClipPath(props: ClipPathProps) {
  const { ...restProps } = props;
  return <RNClipPath {...restProps} />;
} 