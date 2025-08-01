import { useEffect, useRef } from 'react';
import { Box, Text, useTheme, Button } from '@blockit/cross-ui-toolkit';
import { Eye } from '../svgs/Eye';
import { Animated, Easing } from 'react-native';

interface IntroScreenProps {
  onGetStarted: () => void;
}

export function IntroScreen({ onGetStarted }: IntroScreenProps) {
  const { currentColors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
        easing: Easing.elastic(1.2),
      }),
    ]).start();

    // Pulse animation for the eye
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Box className="flex-1 justify-between items-center relative" style={{ backgroundColor: currentColors.background }}>
      {/* Eye SVG with animations */}
      <Animated.View 
        style={{ 
          position: 'absolute',
          top: 100,
          left: 0, 
          right: 0,
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: pulseAnim }
          ]
        }}
      >
        <Eye />
      </Animated.View>
      
      {/* Content */}
      <Box className="flex-1 justify-center items-center px-6">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <Text 
            className='text-center mb-2' 
            style={{ 
              fontSize: 42, 
              lineHeight: 48, 
              fontFamily: "ClashDisplay",
              color: currentColors.text.main,
              fontWeight: '700'
            }}
          >
            The online world
          </Text>
          <Text 
            className='text-center mb-4' 
            style={{ 
              fontSize: 36, 
              lineHeight: 42, 
              fontFamily: "ClashDisplay",
              color: currentColors.primary[500],
              fontWeight: '600'
            }}
          >
            is full of wonderful things
          </Text>
          <Text 
            className='text-center' 
            style={{ 
              fontSize: 18, 
              lineHeight: 26, 
              color: currentColors.text.soft,
              marginTop: 20
            }}
          >
            Take control of your digital life and reclaim your focus
          </Text>
        </Animated.View>
      </Box>

      {/* Get Started Button */}
      <Box className="px-6 pb-12" style={{ width: '100%' }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          <Button
            title="Get Started"
            variant="primary"
            size="lg"
            onPress={onGetStarted}
            style={{ 
              backgroundColor: currentColors.primary[500],
              shadowColor: currentColors.primary[500],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          />
        </Animated.View>
      </Box>
    </Box>
  );
}