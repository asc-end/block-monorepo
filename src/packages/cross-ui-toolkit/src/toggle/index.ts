export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: any;
  className?: string;
  trackColor?: {
    false?: string;
    true?: string;
  };
  thumbColor?: {
    false?: string;
    true?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

export const toggleSizeStyles = {
  sm: {
    width: 51,
    height: 31,
    thumbSize: 27,
    thumbMargin: 2,
  },
  md: {
    width: 64,
    height: 36,
    thumbSize: 32,
    thumbMargin: 2,
  },
  lg: {
    width: 76,
    height: 42,
    thumbSize: 38,
    thumbMargin: 2,
  },
};

export * from './Toggle';