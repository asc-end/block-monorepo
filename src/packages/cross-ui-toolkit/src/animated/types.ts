import { BaseProps } from '../types';

export interface AnimationConfig {
  from?: {
    opacity?: number;
    translateX?: number;
    translateY?: number;
    scale?: number;
    rotate?: number;
  };
  to?: {
    opacity?: number;
    translateX?: number;
    translateY?: number;
    scale?: number;
    rotate?: number;
  };
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
  loop?: boolean;
  bounce?: boolean;
}

export interface AnimatedViewProps extends BaseProps {
  animation?: AnimationConfig;
  entering?: boolean; // trigger entering animation
  exiting?: boolean; // trigger exiting animation
  gesture?: {
    onTap?: () => void;
    onDrag?: (event: any) => void;
    whileHover?: AnimationConfig['to'];
    whileTap?: AnimationConfig['to'];
  };
}