import React from 'react';
import { Success } from '@blockit/ui';
import { useLocalSearchParams, router } from 'expo-router';
import { useSolana } from '@/hooks/solana/useSolana';

export default function SuccessScreen() {
  const { sessionId, claimMode } = useLocalSearchParams<{ sessionId?: string; claimMode?: 'single' | 'multiple' }>();
  const { signAndSendTransaction } = useSolana();
  
  const handleBack = () => {
    router.back();
    return {};
  };

  return (
    <Success
      onBack={handleBack}
      sessionId={sessionId}
      claimMode={claimMode}
      sendTransaction={signAndSendTransaction}
    />
  );
}