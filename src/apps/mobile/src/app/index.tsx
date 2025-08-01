import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const completed = await AsyncStorage.getItem('@hasCompletedOnboarding');
        setHasCompletedOnboarding(completed === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setHasCompletedOnboarding(false);
      }
    };
    
    checkOnboarding();
  }, []);

  if (hasCompletedOnboarding === null) {
    return null;
  }

  return <Redirect href={hasCompletedOnboarding ? "/(tabs)/home" : "/onboarding"} />;
}