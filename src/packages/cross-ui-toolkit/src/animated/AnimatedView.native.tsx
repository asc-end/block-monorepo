import React, { useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  AnimatedProps,
  WithTimingConfig
} from 'react-native-reanimated';
import type { ViewProps, ViewStyle } from 'react-native';

export interface AnimatedViewProps extends Omit<AnimatedProps<ViewProps>, 'style'> {
  children?: React.ReactNode;
  style?: ViewStyle;
  animate?: {
    opacity?: number;
    scale?: number;
    translateX?: number | string;
    translateY?: number | string;
    rotate?: string;
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
    [key: string]: any;
  };
  initial?: {
    opacity?: number;
    scale?: number;
    translateX?: number | string;
    translateY?: number | string;
    rotate?: string;
    [key: string]: any;
  };
  transition?: {
    duration?: number;
    type?: 'timing' | 'spring';
  };
  className?: string;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({ 
  children, 
  style,
  animate = {},
  initial = {},
  transition = { duration: 200, type: 'timing' },
  className,
  ...props 
}) => {
  // Initialize with the animate values if no initial values provided
  const startX = initial.translateX ?? animate.translateX ?? 0;
  
  // Create shared values for animatable properties
  const opacity = useSharedValue(initial.opacity ?? style?.opacity ?? 1);
  const scale = useSharedValue(initial.scale ?? 1);
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(initial.translateY ?? 0);
  const rotate = useSharedValue(initial.rotate ?? '0deg');

  // Create shared values for layout properties
  const animatedProps = useSharedValue({
    ...style,
    ...initial,
  });

  useEffect(() => {
    const config: WithTimingConfig = { duration: transition.duration || 200 };
    
    // Animate transform properties
    if (animate.opacity !== undefined) {
      opacity.value = withTiming(animate.opacity, config);
    }
    if (animate.scale !== undefined) {
      scale.value = withTiming(animate.scale, config);
    }
    if (animate.translateX !== undefined) {
      translateX.value = withTiming(animate.translateX, config);
    }
    if (animate.translateY !== undefined) {
      translateY.value = withTiming(animate.translateY, config);
    }
    if (animate.rotate !== undefined) {
      rotate.value = withTiming(animate.rotate, config);
    }

    // Animate other style properties
    const newProps: any = { ...animatedProps.value };
    Object.keys(animate).forEach(key => {
      if (!['opacity', 'scale', 'translateX', 'translateY', 'rotate'].includes(key)) {
        newProps[key] = (animate as any)[key];
      }
    });
    animatedProps.value = withTiming(newProps, config);
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => {
    const transforms: any[] = [];
    
    if (scale.value !== 1) {
      transforms.push({ scale: scale.value });
    }
    if (translateX.value !== 0) {
      transforms.push({ translateX: translateX.value });
    }
    if (translateY.value !== 0) {
      transforms.push({ translateY: translateY.value });
    }
    if (rotate.value !== '0deg') {
      transforms.push({ rotate: rotate.value });
    }

    return {
      opacity: opacity.value,
      transform: transforms.length > 0 ? transforms : undefined,
    };
  });

  // Merge the static style with animated style
  const mergedStyle = [style, animatedStyle];

  return (
    <Animated.View style={mergedStyle} className={className} {...props}>
      {children}
    </Animated.View>
  );
};