import React from 'react';
import { Box, ScrollView, useTheme } from '@blockit/cross-ui-toolkit';
import { HistoricalSessions, StatsSummary } from '@blockit/ui';
import { router } from 'expo-router';

export default function HistoryScreen() {
  const { currentColors } = useTheme();
  const handleViewSession = (sessionId: string, type: 'focus' | 'routine') => {
    if (type === 'routine') {
      router.push(`/(tabs)/history/routine?routineId=${sessionId}`);
    } else {
      router.push(`/(tabs)/history/focus-session?sessionId=${sessionId}`);
    }
  };



  const handleNavigateToSuccess = (sessionId: string | undefined, claimMode: 'single' | 'multiple') => {
    router.push(`/success?sessionId=${sessionId}&claimMode=${claimMode}`);
  };

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
        <Box className="px-4">
          <StatsSummary />
        </Box>
        <HistoricalSessions 
          onViewSession={handleViewSession} 
          onNavigateToSuccess={handleNavigateToSuccess}
        />
    </Box>
  );
}