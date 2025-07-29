import React, { useState, useMemo } from 'react';
import { Box, Text, Pressable, useTheme } from '@blockit/cross-ui-toolkit';

export interface CalendarDay {
  date: string; // YYYY-MM-DD format
  day: string;
  month: number;
  isDisabled?: boolean;
  data?: any; // Custom data for the day
}

export interface CalendarProps {
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  currentMonth?: Date;
  onMonthChange?: (month: Date) => void;
  renderDay?: (day: CalendarDay, isSelected: boolean, index: number) => React.ReactNode;
  minDate?: Date;
  maxDate?: Date;
  disableFutureDates?: boolean;
  headerComponent?: React.ReactNode;
  showWeekDays?: boolean;
  weekDays?: string[];
}

export function Calendar({
  selectedDate,
  onSelectDate,
  currentMonth: controlledMonth,
  onMonthChange,
  renderDay,
  minDate,
  maxDate,
  disableFutureDates = false,
  headerComponent,
  showWeekDays = true,
  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
}: CalendarProps) {
  const { currentColors } = useTheme();
  const [internalMonth, setInternalMonth] = useState(new Date());
  
  const currentMonth = controlledMonth || internalMonth;
  const setCurrentMonth = onMonthChange || setInternalMonth;

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth();
    const todayDay = now.getDate();

    const days: CalendarDay[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: '', day: '', month: month, isDisabled: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const currentDate = new Date(year, month, day);

      // Check if this date is in the future
      const isFuture = disableFutureDates && (
        year > todayYear ||
        (year === todayYear && month > todayMonth) ||
        (year === todayYear && month === todayMonth && day > todayDay)
      );

      // Check min/max date constraints
      const isBeforeMin = minDate && currentDate < minDate;
      const isAfterMax = maxDate && currentDate > maxDate;

      days.push({
        date: dateStr,
        day: day.toString(),
        month: month,
        isDisabled: isFuture || isBeforeMin || isAfterMax
      });
    }

    return days;
  }, [currentMonth, minDate, maxDate, disableFutureDates]);

  const handleDateSelect = (date: string) => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  const defaultRenderDay = (day: CalendarDay, isSelected: boolean, index: number) => {
    const isClickable = day.date && !day.isDisabled;

    return (
      <Box
        key={`${day.month}-${day.day || index}-${day.date || index}`}
        style={{
          width: '14.285714%', // 100% / 7 days
          padding: 2
        }}
      >
        <Pressable
          onPress={() => isClickable && handleDateSelect(day.date)}
          style={{
            height: 32,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: day.isDisabled
              ? currentColors.neutral[50]
              : isSelected
                ? currentColors.primary[400]
                : currentColors.neutral[100],
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? currentColors.primary[600] : 'transparent',
            opacity: day.isDisabled ? 0.4 : (day.date ? 1 : 0)
          }}
          disabled={!isClickable}
        >
          <Text style={{
            fontSize: 12,
            color: day.isDisabled
              ? currentColors.text.soft
              : isSelected
                ? currentColors.white
                : currentColors.text.main,
            fontWeight: isSelected ? '600' : '500'
          }}>
            {day.day}
          </Text>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box className="rounded-2xl" style={{ backgroundColor: currentColors.surface.elevated }}>
      {headerComponent}

      {showWeekDays && (
        <Box style={{ paddingHorizontal: 12 }}>
          <Box className="flex flex-row mb-3">
            {weekDays.map((day, index) => (
              <Box
                key={`${day}-${index}`}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: currentColors.text.soft,
                    textAlign: 'center'
                  }}
                >
                  {day}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <Box className="flex flex-row flex-wrap">
          {calendarDays.map((day, index) => {
            const isSelected = selectedDate === day.date;
            return renderDay ? renderDay(day, isSelected, index) : defaultRenderDay(day, isSelected, index);
          })}
        </Box>
      </Box>
    </Box>
  );
}