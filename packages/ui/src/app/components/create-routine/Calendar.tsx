import { useState } from 'react';
import { Box, Text, Button, Pressable, useTheme } from '@blockit/cross-ui-toolkit';
import { ChevronIcon } from '../../icons/ChevronIcon';
import { useRoutineStore } from '../../../stores/routineStore';

type CalendarProps = {
    onBack: () => void;
};

export function RoutineCalendar({ onBack }: CalendarProps) {
    const { currentColors } = useTheme();
    const { endDate, setEndDate } = useRoutineStore();
    
    // Initialize currentMonth to the month containing endDate, or current month if no endDate
    const [currentMonth, setCurrentMonth] = useState(() => {
        return endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), 1) : new Date();
    });
    
    // Initialize tempSelectedDate to endDate if it exists
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(endDate ?? null);
    
    const today = new Date();

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const formatMonthYear = (date: Date) =>
        date.toLocaleString('default', { month: 'long', year: 'numeric' });

    const handlePrevMonth = () =>
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    const handleNextMonth = () =>
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

    const handleDateSelect = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setTempSelectedDate(newDate);
    };

    const handleSave = () => {
        if (tempSelectedDate) {
            setEndDate(tempSelectedDate);
            onBack();
        }
    };

    // Calculate number of rows for the current month
    const getCalendarRows = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        return Math.ceil((firstDay + daysInMonth) / 7);
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const totalRows = getCalendarRows();
        const totalCells = totalRows * 7;
        const days = [];

        // Fill all cells (including empty ones at start/end)
        for (let cell = 0; cell < totalCells; cell++) {
            const day = cell - firstDay + 1;
            if (cell < firstDay || day > daysInMonth) {
                // Empty cell
                days.push(
                    <Box
                        key={`empty-${cell}`}
                        style={{
                            width: '14.28%',
                            aspectRatio: '1/1',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                        }}
                    />
                );
            } else {
                const isSelected =
                    tempSelectedDate &&
                    tempSelectedDate.getDate() === day &&
                    tempSelectedDate.getMonth() === currentMonth.getMonth() &&
                    tempSelectedDate.getFullYear() === currentMonth.getFullYear();

                const isToday =
                    today.getDate() === day &&
                    today.getMonth() === currentMonth.getMonth() &&
                    today.getFullYear() === currentMonth.getFullYear();

                const isPastDate =
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) <
                    new Date(today.getFullYear(), today.getMonth(), today.getDate());

                days.push(
                    <Box
                        key={day}
                        className="flex flex-row items-center justify-center"
                        style={{
                            width: '14.28%',
                            aspectRatio: '1/1',
                            padding: 2,
                        }}
                    >
                        <Pressable
                            hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
                            style={{
                                width: '80%',
                                height: '80%',
                                minWidth: 36,
                                minHeight: 36,
                                maxWidth: 48,
                                maxHeight: 48,
                                background:
                                    isSelected
                                        ? `linear-gradient(135deg, ${currentColors.secondary[500]}, ${currentColors.secondary[600]})`
                                        : isToday
                                            ? `linear-gradient(135deg, ${currentColors.primary[50]}, ${currentColors.primary[100]})`
                                            : 'transparent',
                                borderWidth: isSelected ? 2 : isToday ? 2 : 0,
                                borderColor: isSelected
                                    ? currentColors.secondary[700]
                                    : isToday
                                        ? currentColors.primary[500]
                                        : 'transparent',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                opacity: isPastDate ? 0.4 : 1,
                                boxShadow: isSelected
                                    ? `0 2px 6px ${currentColors.secondary[500]}40, 0 1px 2px ${currentColors.secondary[600]}20`
                                    : isToday
                                        ? `0 1px 4px ${currentColors.primary[200]}60`
                                        : 'none',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: isPastDate ? 'not-allowed' : 'pointer',
                                transform: 'scale(1)',
                            }}
                            className="hover:scale-105 active:scale-95"
                            onPress={() => !isPastDate && handleDateSelect(day)}
                            disabled={isPastDate}
                        >
                            <Text
                                style={{
                                    color: isSelected
                                        ? currentColors.primary[50]
                                        : isToday
                                            ? currentColors.primary[700]
                                            : isPastDate
                                                ? currentColors.text.soft
                                                : currentColors.text.main,
                                    fontSize: 15,
                                    fontWeight: isSelected ? '700' : isToday ? '600' : '500',
                                    textAlign: 'center',
                                    letterSpacing: 0.2,
                                }}
                            >
                                {day}
                            </Text>
                        </Pressable>
                    </Box>
                );
            }
        }

        return days;
    };

    return (
        <Box className="flex-1 flex flex-col" style={{ background: currentColors.surface.card }}>
            {/* Header */}
            <Box
                className='flex flex-col items-center px-6 pb-2 pt-1 rounded-b-3xl'
                style={{ background: currentColors.background, gap: 2 }}
            >
                <Text variant="h3" style={{ fontSize: 20 }}>
                    Select End Date
                </Text>
                <Text variant="caption" style={{ fontSize: 12 }}>
                    Choose when you'd like your routine to end
                </Text>
            </Box>

            <Box className="flex-1 px-4 py-4">
                {/* Calendar Container */}
                <Box
                    className="flex flex-col rounded-3xl overflow-hidden border border-solid"
                    style={{
                        background: `linear-gradient(135deg, ${currentColors.surface.elevated} 60%, ${currentColors.primary[50]} 100%)`,
                        boxShadow: `0 8px 32px 0 ${currentColors.secondary[400]}33, 0 1.5px 6px 0 ${currentColors.secondary[400]}22`,
                        border: `1.5px solid ${currentColors.secondary[200]}40`,
                        width: '100%',
                        flex: 1,
                        minHeight: 360,
                        maxHeight: 500,
                        justifyContent: 'flex-start',
                    }}
                >
                    {/* Month Navigation */}
                    <Box
                        className="flex flex-row justify-between items-center p-2"
                        style={{ background: currentColors.background, borderBottom: `1px solid ${currentColors.neutral[600]}` }}
                    >
                        <Pressable
                            onPress={handlePrevMonth}
                            disabled={
                                currentMonth.getFullYear() === today.getFullYear() &&
                                currentMonth.getMonth() === today.getMonth()
                            }
                            style={{
                                padding: 8,
                                borderRadius: 8,
                                background: currentColors.surface.elevated,
                                boxShadow: `0 1px 2px ${currentColors.neutral[200]}40`,
                                border: `1px solid ${currentColors.neutral[200]}`,
                            }}
                            className="hover:scale-105 active:scale-95"
                        >
                            <ChevronIcon direction="left" size={16} color={currentColors.text.soft} />
                        </Pressable>

                        <Text variant="h4" style={{ fontSize: 16 }}>
                            {formatMonthYear(currentMonth)}
                        </Text>

                        <Pressable
                            onPress={handleNextMonth}
                            style={{
                                padding: 8,
                                borderRadius: 8,
                                background: currentColors.surface.elevated,
                                boxShadow: `0 1px 2px ${currentColors.neutral[200]}40`,
                                border: `1px solid ${currentColors.neutral[200]}`,
                            }}
                            className="hover:scale-105 active:scale-95"
                        >
                            <ChevronIcon size={16} color={currentColors.text.soft} />
                        </Pressable>
                    </Box>

                    {/* Day Headers */}
                    <Box className="flex flex-row p-1" style={{ minHeight: 32 }}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <Box key={day} className="flex-1 flex items-center justify-center">
                                <Text className='uppercase' variant="caption" style={{ fontSize: 12 }}>
                                    {day}
                                </Text>
                            </Box>
                        ))}
                    </Box>

                    {/* Calendar Grid */}
                    <Box
                        className="flex flex-row flex-wrap p-1"
                        style={{
                            background: currentColors.surface.elevated,
                            flex: 1,
                            minHeight: 0,
                            alignContent: 'stretch',
                        }}
                    >
                        {renderCalendarDays()}
                    </Box>
                </Box>
            </Box>

            {/* Save Button */}
            <Box className="p-3 pt-0">
                <Button
                    title='Save'
                    variant="primary"
                    onPress={handleSave}
                />
            </Box>
        </Box>
    );
}