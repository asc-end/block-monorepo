import { useNativeAppBlocking } from '@/hooks/useNativeAppBlocking';
import { Home } from '@blockit/ui';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function Page() {
  const nativeAppBlocking = useNativeAppBlocking();

  return (
      <Home 
        onViewRoutine={(routineId) => router.push(`/(tabs)/home/routine?routineId=${routineId}`)}
        onCreateRoutine={() => router.push("/(tabs)/home/create-routine")} 
        nativeAppBlocking={nativeAppBlocking} 
      />
  );
}