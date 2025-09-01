import { useRouter } from 'expo-router';
import { StatusBar, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@blockit/cross-ui-toolkit';
import { PermissionsWrapper } from '../../components/onboarding/PermissionsWrapper';
import { OnboardingCinematic } from '../../components/onboarding/OnboardingCinematic';
import * as NavigationBar from 'expo-navigation-bar';

export default function OnboardingFlow() {
  const router = useRouter();
  const { currentColors } = useTheme();
  const [showCinematic, setShowCinematic] = useState(true);

  // Set navigation bar button style on Android (edge-to-edge mode)
  useEffect(() => {
    const setupNavigationBar = async () => {
      if (Platform.OS === 'android') {
        try {
          const isDarkBackground = currentColors.black === "#000000";
          await NavigationBar.setButtonStyleAsync(isDarkBackground ? 'light' : 'dark');
        } catch (error) {
          console.error('Error setting navigation bar button style:', error);
        }
      }
    };

    setupNavigationBar();
  }, [currentColors.black]);

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('@hasCompletedOnboarding', 'true');
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      router.replace('/(tabs)/home');
    }
  };

  const handleSkipCinematic = () => {
    setShowCinematic(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: currentColors.background }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'transparent' }}
        edges={['left', 'right']}
      >
        {showCinematic ? (
          <OnboardingCinematic
            onComplete={handleSkipCinematic}
            onSkip={handleSkipCinematic}
          />
        ) : (
            <PermissionsWrapper onComplete={handleComplete} />
        )}
      </SafeAreaView>
    </View>
  );
}