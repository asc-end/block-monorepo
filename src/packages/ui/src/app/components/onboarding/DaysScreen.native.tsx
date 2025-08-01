import { Box, Pressable, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSpring,
  Easing,
  interpolate
} from 'react-native-reanimated';

interface Props {
  onContinue: () => void;
  isVisible?: boolean;
}

export function DaysScreen({ onContinue, isVisible = false }: Props) {
  const { currentColors } = useTheme();
  
  const firstWordOpacity = useSharedValue(0);
  const firstWordScale = useSharedValue(0.8);
  
  const numberOpacity = useSharedValue(0);
  const numberRotate = useSharedValue(-10);
  const numberScale = useSharedValue(0.5);
  
  const perYearOpacity = useSharedValue(0);
  const perYearTranslateX = useSharedValue(-30);
  

  useEffect(() => {
    if (isVisible) {
      // Reset values
      firstWordOpacity.value = 0;
      firstWordScale.value = 0.8;
      numberOpacity.value = 0;
      numberRotate.value = -10;
      numberScale.value = 0.5;
      perYearOpacity.value = 0;
      perYearTranslateX.value = -30;
      
      // Start animations
      firstWordOpacity.value = withDelay(200, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));
      firstWordScale.value = withDelay(200, withSpring(1, { damping: 15, stiffness: 300 }));
      
      numberOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
      numberRotate.value = withDelay(500, withSpring(0, { damping: 10, stiffness: 150 }));
      numberScale.value = withDelay(500, withSpring(1, { damping: 8, stiffness: 200 }));
      
      perYearOpacity.value = withDelay(900, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));
      perYearTranslateX.value = withDelay(900, withSpring(0, { damping: 15, stiffness: 250 }));
      
    }
  }, [isVisible]);

  const firstWordStyle = useAnimatedStyle(() => ({
    opacity: firstWordOpacity.value,
    transform: [{ scale: firstWordScale.value }]
  }));

  const numberStyle = useAnimatedStyle(() => ({
    opacity: numberOpacity.value,
    transform: [
      { rotate: `${numberRotate.value}deg` },
      { scale: numberScale.value }
    ]
  }));

  const perYearStyle = useAnimatedStyle(() => ({
    opacity: perYearOpacity.value,
    transform: [{ translateX: perYearTranslateX.value }]
  }));

  return (
    <Box className="flex-1 flex flex-col justify-center items-center p-6 pb-12" style={{ backgroundColor: currentColors.background }}>
      <Box className="flex flex-col justify-center items-center flex-1">
        <Animated.View style={firstWordStyle}>
          <Text className='text-center' style={{ fontSize: 32, lineHeight: 32, fontFamily: "ClashDisplay" }}>
            It's
          </Text>
        </Animated.View>
        
        <Animated.View style={numberStyle}>
          <Text className='text-center' style={{ fontSize: 64, lineHeight: 64, fontFamily: "ClashDisplay", fontWeight: "bold" }}>
            32 days
          </Text>
        </Animated.View>
        
        <Animated.View style={perYearStyle}>
          <Text className='text-center' style={{ fontSize: 32, lineHeight: 32, fontFamily: "ClashDisplay" }}>
            per year
          </Text>
        </Animated.View>
      </Box>
    </Box>
  );
}