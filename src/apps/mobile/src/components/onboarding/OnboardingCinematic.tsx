import React, { useEffect, useState, useCallback } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import { Text, useTheme, Box, SoundOn, SoundOff } from '@blockit/cross-ui-toolkit';
import Animated, { useSharedValue, withTiming, withDelay, useAnimatedStyle } from 'react-native-reanimated';
import { RiveBackground } from '@/components/onboarding/RiveBackground';
import { AudioPlayer } from '@/components/onboarding/AudioPlayer';

const STEP_DURATION = 5500;
const FADE_DURATION = 1000; // Match the fade duration from AudioPlayer
const INITIAL_DELAY = 3000; // Let the music build for 3 seconds before starting narration

interface OnboardingCinematicProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface NarrationStep {
  mainText: string;
  emphasizedText: string;
  subText?: string;
  isWelcome?: boolean;
}

const NARRATION_STEPS: NarrationStep[] = [
  {
    mainText: "The online world",
    emphasizedText: "is full of wonderful things"
  },
  {
    mainText: "But time is relative",
    emphasizedText: "It can slip away fast"
  },
  {
    mainText: "On average, we spend",
    emphasizedText: "2.5 hours",
    subText: "on social media"
  },
  {
    mainText: "That's",
    emphasizedText: "38 days",
    subText: "per year, gone"
  },
  {
    mainText: "Imagine what a year of ",
    emphasizedText: "undistracted focus",
    subText: "could build"
  },
  {
    mainText: "Take control",
    emphasizedText: "Reclaim your focus",
    subText: "Make every moment count"
  },
  {
    mainText: "",
    emphasizedText: "Welcome to Blockit",
    subText: "",
    isWelcome: true // Flag for special styling
  }
];

export function OnboardingCinematic({ onComplete, onSkip }: OnboardingCinematicProps) {
  const { currentColors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [isCinematicEnding, setIsCinematicEnding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const skipOpacity = useSharedValue(1);
  
  const mainTextOpacity = useSharedValue(0);
  const emphasizedTextOpacity = useSharedValue(0);
  const subTextOpacity = useSharedValue(0);

  const handleComplete = useCallback(() => {
    setIsCinematicEnding(true);
    // Wait for fade out before completing
    setTimeout(() => {
      onComplete();
    }, FADE_DURATION);
  }, [onComplete]);

  useEffect(() => {
    if (!isReady) return;

    async function startSequence() {
      // Start with first step immediately
      setCurrentStep(0);
      mainTextOpacity.value = withTiming(1, { duration: FADE_DURATION });
      emphasizedTextOpacity.value = withDelay(200, withTiming(1, { duration: FADE_DURATION }));
      if (NARRATION_STEPS[0].subText) {
        subTextOpacity.value = withDelay(400, withTiming(1, { duration: FADE_DURATION }));
      }
      
      // Wait for first step duration
      await new Promise(resolve => setTimeout(resolve, STEP_DURATION));

      // Continue with remaining steps
      for (let i = 1; i < NARRATION_STEPS.length; i++) {
        // Fade out previous step
        mainTextOpacity.value = withTiming(0, { duration: FADE_DURATION });
        emphasizedTextOpacity.value = withTiming(0, { duration: FADE_DURATION });
        subTextOpacity.value = withTiming(0, { duration: FADE_DURATION });

        // Wait for fade out
        await new Promise(resolve => setTimeout(resolve, FADE_DURATION));

        // Move to next step
        setCurrentStep(i);

        // Fade in new step
        mainTextOpacity.value = withTiming(1, { duration: FADE_DURATION });
        emphasizedTextOpacity.value = withDelay(200, withTiming(1, { duration: FADE_DURATION }));
        if (NARRATION_STEPS[i].subText) {
          subTextOpacity.value = withDelay(400, withTiming(1, { duration: FADE_DURATION }));
        }

        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, STEP_DURATION));
      }
    }

    startSequence();
  }, [isReady]); // Only start when audio is ready

  useEffect(() => {
    if (currentStep === NARRATION_STEPS.length - 1) {
      // Start fade out when reaching the last step
      setTimeout(() => {
        handleComplete();
      }, 2000); // Wait for the last narration to finish
    }
  }, [currentStep, handleComplete]);

  if (isSkipped) return null;

  const mainTextStyle = useAnimatedStyle(() => ({
    opacity: mainTextOpacity.value
  }));

  const emphasizedTextStyle = useAnimatedStyle(() => ({
    opacity: emphasizedTextOpacity.value
  }));

  const subTextStyle = useAnimatedStyle(() => ({
    opacity: subTextOpacity.value
  }));

  return (
    <Box style={{ flex: 1, backgroundColor: currentColors.background }}>
      <RiveBackground currentStep={currentStep} />
      <AudioPlayer
        onReady={() => setIsReady(true)}
        currentStep={currentStep}
        isCinematicEnding={isCinematicEnding}
        isMuted={isMuted}
      />

      {isReady && (
        <>
          {/* Control buttons */}
          <Box className="absolute top-[60] w-full px-5 flex-row justify-between items-center">
            {/* Mute button */}
            <Pressable
              onPress={() => setIsMuted(!isMuted)}
              style={{
                padding: 8,
                backgroundColor: currentColors.neutral[800] + '40',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isMuted ? (
                <SoundOff color={currentColors.text.soft} />
              ) : (
                <SoundOn color={currentColors.text.soft} />
              )}
            </Pressable>

            {/* Skip button */}
            <Pressable
              onPress={() => {
                setIsCinematicEnding(true);
                setTimeout(() => {
                  setIsSkipped(true);
                  onComplete();
                }, FADE_DURATION);
              }}
              style={{
                padding: 12,
              }}>
              <Text style={{
                fontSize: 16,
                color: currentColors.text.soft,
                fontFamily: "ClashDisplay",
              }}>
                Skip
              </Text>
            </Pressable>
          </Box>

          {/* Narration text container */}
          <Box className='flex-1 justify-end items-center pb-14' style={{ 
            justifyContent: 'flex-end',
            paddingBottom: NARRATION_STEPS[currentStep]?.isWelcome ? 80 : 140,
          }}>
            <Animated.View style={mainTextStyle}>
              <Text style={{ 
                fontSize: 24,
                lineHeight: 32,
                fontFamily: "ClashDisplay",
                color: currentColors.text.soft,
                textAlign: 'center',
              }}>
                {NARRATION_STEPS[currentStep].mainText}
              </Text>
            </Animated.View>

            <Animated.View style={emphasizedTextStyle}>
              <Text style={{ 
                fontSize: NARRATION_STEPS[currentStep]?.isWelcome ? 48 : 42,
                lineHeight: NARRATION_STEPS[currentStep]?.isWelcome ? 52 : 48,
                fontFamily: "ClashDisplay",
                color: currentColors.text.main,
                fontWeight: "600",
                textAlign: 'center',
              }}>
                {NARRATION_STEPS[currentStep].emphasizedText}
              </Text>
            </Animated.View>

            {NARRATION_STEPS[currentStep].subText && (
              <Animated.View style={subTextStyle}>
                <Text style={{ 
                  fontSize: 20,
                  lineHeight: 28,
                  fontFamily: "ClashDisplay",
                  color: currentColors.text.soft,
                  textAlign: 'center',
                  maxWidth: 280
                }}>
                  {NARRATION_STEPS[currentStep].subText}
                </Text>
              </Animated.View>
            )}
          </Box>
        </>
      )}
    </Box>
  );
} 