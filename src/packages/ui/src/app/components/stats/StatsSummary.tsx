import React from 'react';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { useUserStats } from '../../../hooks/useUserStats';
import { SolIcon } from '../../icons/SolIcon';

export function StatsSummary() {
  const { currentColors } = useTheme();
  const { data: stats, isLoading, error } = useUserStats();

  const formatValue = (value: number, isMoney: boolean) => {
    if (!isMoney) return value.toLocaleString();

    // For SOL values - always show ~3 significant digits
    if (value === 0) return '0';
    if (value < 0.001) return value.toFixed(4);
    if (value < 0.01) return value.toFixed(3);
    if (value < 0.1) return value.toFixed(3);
    if (value < 1) return value.toFixed(2);
    if (value < 10) return value.toFixed(2);
    if (value < 100) return value.toFixed(1);
    if (value < 1000) return Math.round(value).toString();
    return `${(value / 1000).toFixed(1)}k`;
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
  }) => {
    const formattedCompleted = formatValue(completedValue, isMoney);
    const formattedCanceled = formatValue(canceledValue, isMoney);

    // Determine font size based on value length and if it's money
    const getFontSize = (value: string, isMoneyValue: boolean = false) => {
      // For money values, allow more space for decimals
      if (isMoneyValue) {
        if (value.length > 7) return 14;
        if (value.length > 5) return 16;
        if (value.length > 3) return 18;
        return 20;
      }
      // For count values
      if (value.length > 6) return 16;
      if (value.length > 4) return 18;
      return 20;
    };

    return (
      <Box
        className="flex-1 px-2 pt-2 pb-1 rounded-xl flex flex-col"
        style={{
          backgroundColor: currentColors.surface.elevated,
          borderWidth: 1,
          borderColor: currentColors.neutral[200] + '10',
          minWidth: 0
        }}
      >
        <Box className="flex flex-row items-center justify-center mb-1">
          {isMoney && (
            <Box style={{ marginRight: 4 }}>
              <SolIcon size={12} color={currentColors.primary[500]} />
            </Box>
          )}
          <Text
            variant="caption"
            style={{
              color: currentColors.text.soft,
              fontWeight: '500',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.3
            }}
          >
            {title}
          </Text>
        </Box>
        <Box className="flex flex-row justify-between px-2">
          <Box className="flex flex-col items-center flex-1">
            <Text
              variant="caption"
              style={{
                color: currentColors.text.soft,
                fontSize: 9,
                opacity: 0.5,
                marginBottom: 2
              }}
            >
              total
            </Text>
            <Box className='flex items-center justify-center h-8'>
              <Text
                variant="h5"
                style={{
                  fontSize: getFontSize(formattedCompleted, isMoney),
                  fontFamily: 'ClashDisplay',
                  fontWeight: "600",
                  color: currentColors.text.main
                }}
              >
                {formattedCompleted}
              </Text>
            </Box>
          </Box>

          <Box
            style={{
              width: 1,
              height: 30,
              backgroundColor: currentColors.neutral[200] + '30'
            }}
          />

          <Box className="flex flex-col items-center flex-1">
            <Text
              variant="caption"
              style={{
                color: currentColors.text.soft,
                fontSize: 9,
                opacity: 0.5,
                marginBottom: 2
              }}
            >
              {canceledLabel}
            </Text>
            <Box className='flex items-center justify-center h-8'>

              <Text
                variant="h5"
                style={{
                  fontSize: getFontSize(formattedCompleted, isMoney) * 0.85,
                  fontFamily: 'ClashDisplay',
                  fontWeight: "600",
                  color: currentColors.text.soft,
                  opacity: 0.6
                }}
              >
                {formattedCanceled}
              </Text>
            </Box>

          </Box>
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box className="flex flex-row gap-1 mb-6">
        {[1, 2, 3].map(i => (
          <Box
            key={i}
            className="flex-1 rounded-xl"
            style={{
              height: 80,
              backgroundColor: currentColors.surface.elevated,
              borderWidth: 1,
              borderColor: currentColors.neutral[200] + '10',
              opacity: 0.6
            }}
          />
        ))}
      </Box>
    );
  }

  if (error || !stats) return null;

  return (
    <Box className="flex flex-row gap-1 mb-6">
      <StatColumn
        title="Routines"
        completedValue={stats.routinesCompleted + stats.routinesCanceled}
        canceledValue={stats.routinesCanceled}
      />
      <StatColumn
        title="Focus"
        completedValue={stats.focusSessionsCompleted + stats.focusSessionsCanceled}
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