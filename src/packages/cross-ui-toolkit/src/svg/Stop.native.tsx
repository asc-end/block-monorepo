import { Stop as RNStop } from 'react-native-svg';

export interface StopProps {
  offset: string | number;
  stopColor?: string;
  stopOpacity?: string | number;
}

export function Stop(props: StopProps) {
  return <RNStop {...props} />;
}