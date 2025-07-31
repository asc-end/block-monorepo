import { useNativeAppBlocking } from '@/hooks/useNativeAppBlocking';
import { Home } from '@blockit/ui';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useSolana } from '@/hooks/solana/useSolana';

export default function Page() {
  const nativeAppBlocking = useNativeAppBlocking();
  const { signAndSendTransaction } = useSolana();

  return (
      <Home 
        onViewRoutine={(routineId) => router.push(`/(tabs)/home/routine?routineId=${routineId}`)}
        onCreateRoutine={() => router.push("/(tabs)/home/create-routine")} 
        nativeAppBlocking={nativeAppBlocking}
        sendTransaction={signAndSendTransaction}
        onNavigateToSuccess={(sessionId) => router.push(`/success?sessionId=${sessionId}`)}
      />
  );
}