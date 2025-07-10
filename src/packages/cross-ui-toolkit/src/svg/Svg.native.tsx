import { Svg as RNSvg, SvgProps as RNSvgProps } from 'react-native-svg';

export interface SvgProps extends RNSvgProps {
  size?: number;
  color?: string;
}

export function Svg({ size = 24, color = 'currentColor', width, height, children, ...props }: SvgProps) {
  return (
    <RNSvg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      {children}
    </RNSvg>
  );
} 