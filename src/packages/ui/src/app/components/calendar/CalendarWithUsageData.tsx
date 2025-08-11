import React, { useState, useCallback } from 'react';
import { Box, Text, Pressable, useTheme } from '@blockit/cross-ui-toolkit';
import { Calendar, CalendarDay } from './Calendar';
import { MonthSelector } from './MonthSelector';

export interface UsageData {
  [date: string]: number; // Date in YYYY-MM-DD format -> total time in milliseconds
}

export interface CalendarWithUsageDataProps {
  usageData: UsageData;
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  onMonthChange?: (year: number, month: number) => void;
  getUsageColor?: (totalTime: number) => string;
  minIntensity?: number; // Minimum time in ms to show color (default 1000ms = 1 second)
  disableFutureDates?: boolean;
}

export function CalendarWithUsageData({
  usageData,
  selectedDate,
  onSelectDate,
  onMonthChange,
  getUsageColor,
  minIntensity = 1000,
  disableFutureDates = true
}: CalendarWithUsageDataProps) {
  const { currentColors } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const defaultGetUsageColor = (totalTime: number) => {
    // Convert to hours for easier comparison
    const hours = totalTime / (1000 * 60 * 60);

    if (hours === 0) return 'transparent';
    // Fewer, more distinct steps up to 17 hours
    if (hours < 1) return currentColors.primary[100] + '1A'; // 10% opacity
    if (hours < 3) return currentColors.primary[200] + '33'; // 20% opacity
    if (hours < 5) return currentColors.primary[300] + '4D'; // 30% opacity
    if (hours < 7) return currentColors.primary[400] + '66'; // 40% opacity
    if (hours < 9) return currentColors.primary[500] + '80'; // 50% opacity
    if (hours < 11) return currentColors.primary[500] + '99'; // 60% opacity
    if (hours < 13) return currentColors.primary[600] + 'B3'; // 70% opacity
    if (hours < 15) return currentColors.primary[700] + 'CC'; // 80% opacity
    if (hours < 17) return currentColors.primary[700] + 'E6'; // 90% opacity
    return currentColors.primary[700]; // Full opacity for 17+ hours
  };

  const colorFunction = getUsageColor || defaultGetUsageColor;

  const handleMonthChange = useCallback((delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);

    // Don't allow navigation to future months if disabled
    if (disableFutureDates && delta > 0) {
      const today = new Date();
      if (newMonth.getFullYear() >= today.getFullYear() &&
        newMonth.getMonth() > today.getMonth()) {
        return;
      }
    }

    setCurrentMonth(newMonth);
    
    // Notify parent of month change
    if (onMonthChange) {
      onMonthChange(newMonth.getFullYear(), newMonth.getMonth());
    }
  }, [currentMonth, disableFutureDates, onMonthChange]);

  const isNextMonthDisabled = () => {
    if (!disableFutureDates) return false;
    
    const today = new Date();
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.getFullYear() >= today.getFullYear() &&
      nextMonth.getMonth() > today.getMonth();
  };

  const renderUsageDay = (day: CalendarDay, isSelected: boolean, index: number) => {
    const totalTime = day.date ? (usageData[day.date] || 0) : 0;
    const hasData = totalTime >= minIntensity;
    const bgColor = day.date ? colorFunction(totalTime) : 'transparent';
    const isClickable = day.date && !day.isDisabled;

    return (
      <Box
        key={`${day.month}-${day.day || index}-${day.date || index}`}
        style={{
          width: '14.285714%', // 100% / 7 days
          padding: 1
        }}
      >
        <Pressable
          onPress={() => isClickable && onSelectDate && onSelectDate(day.date)}
          style={{
            height: 28,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: day.isDisabled
              ? currentColors.neutral[50]
              : hasData
                ? bgColor
                : currentColors.neutral[100],
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? currentColors.primary[400] : 'transparent',
            opacity: day.isDisabled ? 0.4 : (day.date ? 1 : 0)
          }}
          disabled={!isClickable}
        >
          <Text style={{
            fontSize: 12,
            color: day.isDisabled
              ? currentColors.text.soft
              : hasData
                ? '#FFFFFF' // Always white text when there's usage data
                : currentColors.text.main,
            fontWeight: isSelected ? '600' : '500'
          }}>
            {day.day}
          </Text>
        </Pressable>
      </Box>
    );
  };

  const headerComponent = (
    <MonthSelector
      currentMonth={currentMonth}
      onMonthChange={handleMonthChange}
      disableNext={isNextMonthDisabled()}
    />
  );

  return (
    <Calendar
      selectedDate={selectedDate}
      onSelectDate={onSelectDate}
      currentMonth={currentMonth}
      onMonthChange={setCurrentMonth}
      renderDay={renderUsageDay}
      disableFutureDates={disableFutureDates}
      headerComponent={headerComponent}
    />
  );
}