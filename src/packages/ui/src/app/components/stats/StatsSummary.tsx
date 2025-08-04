import React from 'react';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { useUserStats } from '../../../hooks/useUserStats';

export function StatsSummary() {
  const { currentColors } = useTheme();
  const { data: stats, isLoading, error } = useUserStats();

  const StatColumn = ({ 
    title, 
    completedValue, 
    canceledValue, 
    canceledLabel = "canceled",
    isMoney = false 
  }: { 
    title: string; 
    completedValue: number; 
    canceledValue: number; 
    canceledLabel?: string;
    isMoney?: boolean;
  }) => (
    <Box 
      className="flex-1 p-1 rounded-xl flex flex-col items-center"
      style={{ 
        backgroundColor: currentColors.surface.elevated,
        borderWidth: 1,
        borderColor: currentColors.neutral[200] + '20',
        minWidth: 0
      }}
    >
      <Text variant="h6" className="mb-2"style={{ color: currentColors.text.main,fontWeight: '600'}}>
        {title}
      </Text>
      <Box className="flex flex-row gap-1 items-center">
        <Box className="flex flex-col items-center gap-1 w-12">
          <Text variant="caption" style={{  color: currentColors.text.soft, fontSize: 11}}>
            total
          </Text>
          <Text variant="h5" style={{ fontSize: 20, lineHeight: 24, fontFamily: 'ClashDisplay', fontWeight: "600" }}>
            {completedValue}
          </Text>
        </Box>
        <Box className="flex flex-col items-center gap-1 w-12">
          <Text variant="caption" className='opacity-60' style={{  color: currentColors.text.soft, fontSize: 11}}>
            lost
          </Text>
          <Text className='opacity-60' variant="h5" style={{ fontSize: 20, lineHeight: 24, fontFamily: 'ClashDisplay', fontWeight: "600" }}>
            {canceledValue}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  if (isLoading) {
    return (
        <Box className="flex flex-row gap-2 mb-5">
          {[1, 2, 3].map(i => (
            <Box 
              key={i}
              className="flex-1 h-24 rounded-xl animate-pulse"
              style={{ backgroundColor: currentColors.neutral[200] }}
            />
          ))}
        </Box>
    );
  }

  if (error || !stats) return null;

  return (
    <Box className="flex flex-row gap-2 mb-5">
        <StatColumn
          title="Routines"
          completedValue={stats.routinesCompleted}
          canceledValue={stats.routinesCanceled}
        />
        <StatColumn
          title="Focus"
          completedValue={stats.focusSessionsCompleted}
          canceledValue={stats.focusSessionsCanceled}
        />
        <StatColumn
          title="Stakes"
          completedValue={stats.totalStaked}
          canceledValue={stats.totalLost}
          canceledLabel="lost"
          isMoney={true}
        />
      </Box>
  );
}