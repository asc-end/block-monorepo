import { Line as RNLine } from 'react-native-svg';

export interface LineProps {
  x1?: string | number;
  y1?: string | number;
  x2?: string | number;
  y2?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeDasharray?: string | number[];
  strokeOpacity?: string | number;
  fill?: string;
  fillOpacity?: string | number;
  opacity?: string | number;
}

export function Line(props: LineProps) {
  return <RNLine {...props} />;
}