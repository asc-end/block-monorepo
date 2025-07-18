import React, { useEffect, useState } from 'react';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { api } from '../../../stores/authStore';

interface StatsData {
  routinesCompleted: number;
  routinesCanceled: number;
  focusSessionsCompleted: number;
  focusSessionsCanceled: number;
  totalStaked: number;
  totalLost: number;
}

export function StatsSummary() {
  const { currentColors } = useTheme();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api().get<StatsData>('/users/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

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
      className="flex-1 p-1 rounded-xl"
      style={{ 
        backgroundColor: currentColors.surface.card,
        borderWidth: 1,
        borderColor: currentColors.neutral[200] + '20',
        minWidth: 0
      }}
    >
      <Text 
        variant="h6" 
        className="mb-2"
        style={{ 
          color: currentColors.text.main,
          fontWeight: '600'
        }}
      >
        {title}
      </Text>
      <Box className="flex flex-col gap-1">
        <Box className="flex flex-row items-center gap-1">
          <Text 
            variant="h5" 
            style={{ 
              color: currentColors.success.main,
              fontWeight: '700'
            }}
          >
            {completedValue}
          </Text>
          <Text 
            variant="caption" 
            style={{ 
              color: currentColors.text.soft,
              fontSize: 11
            }}
          >
            {isMoney ? "staked" : "completed"}
          </Text>
        </Box>
        <Box className="flex flex-row items-center gap-1">
          <Text 
            variant="h5" 
            style={{ 
              color: currentColors.error.main,
              fontWeight: '700'
            }}
          >
            {canceledValue}
          </Text>
          <Text 
            variant="caption" 
            style={{ 
              color: currentColors.text.soft,
              fontSize: 11
            }}
          >
            {canceledLabel}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  if (loading) {
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

  if (!stats) return null;

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