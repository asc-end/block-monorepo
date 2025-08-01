import { Box, Pressable, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSequence,
  withSpring,
  interpolate,
  Easing
} from 'react-native-reanimated';

interface AverageScreenProps {
  onContinue: () => void;
  isVisible?: boolean;
}

export function AverageScreen({ onContinue, isVisible = false }: AverageScreenProps) {
  const { currentColors } = useTheme();
  
  const line1Opacity = useSharedValue(0);
  const line1TranslateY = useSharedValue(20);
  
  const numberScale = useSharedValue(0);
  const numberOpacity = useSharedValue(0);
  
  const line3Opacity = useSharedValue(0);
  const line3TranslateY = useSharedValue(20);

  useEffect(() => {
    if (isVisible) {
      // Defer animation updates to avoid render-time modifications
      setTimeout(() => {
        // Reset values
        line1Opacity.value = 0;
        line1TranslateY.value = 20;
        numberScale.value = 0;
        numberOpacity.value = 0;
        line3Opacity.value = 0;
        line3TranslateY.value = 20;
        
        // Start animations
        line1Opacity.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));
        line1TranslateY.value = withDelay(200, withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) }));
        
        numberScale.value = withDelay(600, withSpring(1, { damping: 12, stiffness: 200 }));
        numberOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
        
        line3Opacity.value = withDelay(900, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));
        line3TranslateY.value = withDelay(900, withTiming(0, { duration: 600, easing: Easing.out(Easing.exp) }));
      }, 0);
    }
  }, [isVisible]);

  const line1Style = useAnimatedStyle(() => ({
    opacity: line1Opacity.value,
    transform: [{ translateY: line1TranslateY.value }]
  }));

  const numberStyle = useAnimatedStyle(() => ({
    opacity: numberOpacity.value,
    transform: [{ scale: numberScale.value }]
  }));

  const line3Style = useAnimatedStyle(() => ({
    opacity: line3Opacity.value,
    transform: [{ translateY: line3TranslateY.value }]
  }));

  return (
    <Box className="flex-1 flex flex-col justify-center items-center p-6 pb-12" style={{ backgroundColor: currentColors.background }}>
      <Box className="flex flex-col justify-center items-center flex-1">
        <Animated.View style={line1Style}>
          <Text className='text-center' style={{ fontSize: 32, lineHeight: 32, fontFamily: "ClashDisplay" }}>
            On average, we spend
          </Text>
        </Animated.View>
        
        <Animated.View style={numberStyle}>
          <Text className='text-center' style={{ fontSize: 64, lineHeight: 64, fontFamily: "ClashDisplay", fontWeight: "bold" }}>
            2.5 hours
          </Text>
        </Animated.View>
        
        <Animated.View style={line3Style}>
          <Text className='text-center' style={{ fontSize: 32, lineHeight: 32, fontFamily: "ClashDisplay" }}>
            per day
          </Text>
        </Animated.View>
      </Box>
    </Box>
  );
}