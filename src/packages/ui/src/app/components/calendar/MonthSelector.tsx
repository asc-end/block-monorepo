import React, { useState } from 'react';
import { Box, Text, Pressable, useTheme } from '@blockit/cross-ui-toolkit';
import { ChevronIcon } from '../../icons/ChevronIcon';

export interface MonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (delta: number) => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
  formatMonth?: (date: Date) => string;
}

export function MonthSelector({
  currentMonth,
  onMonthChange,
  disableNext = false,
  disablePrevious = false,
  formatMonth
}: MonthSelectorProps) {
  const { currentColors } = useTheme();
  const [prevPressed, setPrevPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);

  const defaultFormatMonth = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };

  const format = formatMonth || defaultFormatMonth;

  return (
    <Box className="flex flex-row justify-between items-center mb-4 px-5 py-3 rounded-lg bg-surface-card">
      <Pressable
        onPress={() => !disablePrevious && onMonthChange(-1)}
        onPressIn={() => setPrevPressed(true)}
        onPressOut={() => setPrevPressed(false)}
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: disablePrevious
            ? currentColors.neutral[200] + '30'
            : prevPressed
              ? currentColors.neutral[300] + '50'
              : currentColors.neutral[200] + '60',
          opacity: disablePrevious ? 0.5 : 1,
          transform: [{ scale: prevPressed && !disablePrevious ? 0.95 : 1 }],
          transition: 'all 0.2s ease'
        }}
        disabled={disablePrevious}
      >
        <ChevronIcon 
          direction="left" 
          size={16} 
          color={disablePrevious ? currentColors.neutral[400] : currentColors.text.soft} 
        />
      </Pressable>
      
      <Box className="items-center flex-1 mx-4">
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: currentColors.text.main
        }}>
          {format(currentMonth)}
        </Text>
      </Box>
      
      <Pressable
        onPress={() => !disableNext && onMonthChange(1)}
        onPressIn={() => setNextPressed(true)}
        onPressOut={() => setNextPressed(false)}
        style={{
          padding: 10,
          borderRadius: 8,
          backgroundColor: disableNext
            ? currentColors.neutral[200] + '30'
            : nextPressed
              ? currentColors.neutral[300] + '50'
              : currentColors.neutral[200] + '60',
          opacity: disableNext ? 0.5 : 1,
          transform: [{ scale: nextPressed && !disableNext ? 0.95 : 1 }],
          transition: 'all 0.2s ease'
        }}
        disabled={disableNext}
      >
        <ChevronIcon
          direction="right"
          size={16}
          color={disableNext ? currentColors.neutral[400] : currentColors.text.soft}
        />
      </Pressable>
    </Box>
  );
}