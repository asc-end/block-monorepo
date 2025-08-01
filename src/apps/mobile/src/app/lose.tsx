import React from 'react';
import { Lose, Success } from '@blockit/ui';
import { useLocalSearchParams, router } from 'expo-router';
import { useSolana } from '@/hooks/solana/useSolana';

export default function LoseScreen() {
  const { sessionId } = useLocalSearchParams<{ sessionId?: string;}>();
  
  const handleBack = () => {
    router.back();
    return {};
  };
  
  return (
    <Lose sessionId={sessionId} onBack={handleBack} />
  );
}