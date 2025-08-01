import { Box, Pressable, Text, useTheme, ScrollView } from '@blockit/cross-ui-toolkit';
import { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSpring,
  Easing,
  withSequence,
  withRepeat
} from 'react-native-reanimated';

interface YearScreenProps {
  onContinue: () => void;
  isVisible?: boolean;
}

export function YearScreen({ onContinue, isVisible = false }: YearScreenProps) {
  const { currentColors } = useTheme();
  
  const questionOpacity = useSharedValue(0);
  const questionTranslateY = useSharedValue(30);
  
  const yearOpacity = useSharedValue(0);
  const yearScale = useSharedValue(0.3);
  const yearRotate = useSharedValue(0);
  
  const subTextOpacity = useSharedValue(0);
  const subTextTranslateY = useSharedValue(20);

  useEffect(() => {
    if (isVisible) {
      // Reset values
      questionOpacity.value = 0;
      questionTranslateY.value = 30;
      yearOpacity.value = 0;
      yearScale.value = 0.3;
      yearRotate.value = 0;
      subTextOpacity.value = 0;
      subTextTranslateY.value = 20;
      
      // Start animations
      questionOpacity.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }));
      questionTranslateY.value = withDelay(200, withSpring(0, { damping: 20, stiffness: 300 }));
      
      yearOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
      yearScale.value = withDelay(800, withSequence(
        withSpring(1.1, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 300 })
      ));
      yearRotate.value = withDelay(800, withSequence(
        withTiming(5, { duration: 150 }),
        withTiming(-5, { duration: 150 }),
        withSpring(0, { damping: 10, stiffness: 300 })
      ));
      
      subTextOpacity.value = withDelay(1600, withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) }));
      subTextTranslateY.value = withDelay(1600, withSpring(0, { damping: 15, stiffness: 250 }));
    }
  }, [isVisible]);

  const questionStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity.value,
    transform: [{ translateY: questionTranslateY.value }]
  }));

  const yearStyle = useAnimatedStyle(() => ({
    opacity: yearOpacity.value,
    transform: [
      { scale: yearScale.value },
      { rotate: `${yearRotate.value}deg` }
    ]
  }));

  const subTextStyle = useAnimatedStyle(() => ({
    opacity: subTextOpacity.value,
    transform: [{ translateY: subTextTranslateY.value }]
  }));

  return (
    <Box className="flex-1 flex flex-col justify-center items-center p-6" style={{ backgroundColor: currentColors.background }}>
      <Box className="flex flex-col justify-center items-center flex-1">
        <Animated.View style={questionStyle}>
          <Text className='text-center' style={{ fontSize: 32, lineHeight: 32, fontFamily: "ClashDisplay" }}>
            Are you sure you don't have better things to do 
          </Text>
        </Animated.View>
        
        <Animated.View style={yearStyle}>
          <Text className='text-center' style={{ fontSize: 64, lineHeight: 64, fontFamily: "ClashDisplay", fontWeight: "bold" }}>
            the next year ?
          </Text>
        </Animated.View>
        
        <Animated.View style={[subTextStyle, { marginTop: 20 }]}>
          <Text className='text-center' style={{ fontSize: 16, lineHeight: 16, fontFamily: "ClashDisplay" }}>
            Even going on vacation for a month would be better
          </Text>
        </Animated.View>
      </Box>
    </Box>
  );
}