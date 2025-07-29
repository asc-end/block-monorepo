import React from 'react';
import { Box, ScrollView } from '@blockit/cross-ui-toolkit';
import { HistoricalSessions, StatsSummary } from '@blockit/ui';

export default function HistoryScreen() {
  return (
    <Box className="flex-1">
        <Box className="px-4">
          <StatsSummary />
        </Box>
        <HistoricalSessions />
    </Box>
  );
}