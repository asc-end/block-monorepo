import { useState, useEffect } from 'react';
import { Box, Text, Button, useTheme, Pressable } from '@blockit/cross-ui-toolkit';
import { useRoutineStore } from '../../../stores/routineStore';
import { Calendar } from '../calendar/Calendar';
import { MonthSelector } from '../calendar/MonthSelector';

type CalendarProps = {
    onBack: () => void;
};

export function RoutineCalendar({ onBack }: CalendarProps) {
    const { currentColors } = useTheme();
    const { endDate, draft, setDraftEndDate, commitDraft, initializeDraft } = useRoutineStore();
    
    // Initialize draft on mount
    useEffect(() => {
        initializeDraft();
    }, []);
    
    // Initialize currentMonth based on the initial endDate or draft
    const [currentMonth, setCurrentMonth] = useState(() => {
        const dateToUse = draft.endDate || endDate;
        return dateToUse ? new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1) : new Date();
    });
    
    // Initialize tempSelectedDate from draft or saved state
    const [tempSelectedDate, setTempSelectedDate] = useState<string | null>(() => {
        const dateToUse = draft.endDate || endDate;
        return dateToUse ? 
            `${dateToUse.getFullYear()}-${String(dateToUse.getMonth() + 1).padStart(2, '0')}-${String(dateToUse.getDate()).padStart(2, '0')}` : 
            null;
    });
    
    // Update tempSelectedDate when draft changes
    useEffect(() => {
        if (draft.endDate) {
            const dateStr = `${draft.endDate.getFullYear()}-${String(draft.endDate.getMonth() + 1).padStart(2, '0')}-${String(draft.endDate.getDate()).padStart(2, '0')}`;
            setTempSelectedDate(dateStr);
        }
    }, [draft.endDate]);
    
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const handleDateSelect = (dateStr: string) => {
        setTempSelectedDate(dateStr);
        // Update draft when date is selected
        if (dateStr) {
            const [year, month, day] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            setDraftEndDate(date);
        }
    };

    const handleMonthChange = (month: Date) => {
        setCurrentMonth(month);
    };

    const handleMonthDelta = (delta: number) => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1);
        setCurrentMonth(newMonth);
    };

    const handleSave = () => {
        // Commit draft to saved state
        commitDraft();
        onBack();
    };

    // Check if we can navigate to previous month
    const canGoPrevMonth = () => {
        return !(
            currentMonth.getFullYear() === today.getFullYear() &&
            currentMonth.getMonth() === today.getMonth()
        );
    };

    const renderDay = (day: any, isSelected: boolean, index: number) => {
        const isToday = day.date && day.date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const isClickable = day.date && !day.isDisabled;
        
        // Check if this is the initially saved date
        const savedDateStr = endDate ? 
            `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}` : 
            null;
        const isInitialDate = day.date && day.date === savedDateStr;
        const isDraftChanged = isSelected && !isInitialDate; // Selected but different from saved

        return (
            <Box
                key={`${day.month}-${day.day || index}-${day.date || index}`}
                style={{
                    width: '14.285714%',
                    padding: 2,
                    height: 40,
                }}
            >
                <Pressable
                    onPress={() => isClickable && handleDateSelect(day.date)}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: isDraftChanged
                            ? currentColors.primary[500]  // New selection - solid primary
                            : isSelected && isInitialDate
                                ? currentColors.primary[200]  // Saved date - lighter primary
                                : isToday ? currentColors.secondary[800] + "50" : 'transparent',  // No background for today
                        borderWidth: isInitialDate && !isSelected ? 2 : 0,  // Border for saved date when not selected
                        borderColor: currentColors.primary[400],
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: day.isDisabled ? 0.3 : (day.date ? 1 : 0),
                        cursor: day.isDisabled ? 'not-allowed' : 'pointer',
                    }}
                    disabled={!isClickable}
                >
                    <Text
                        style={{
                            color: isDraftChanged
                                ? currentColors.white  // White text for new selection
                                : isSelected && isInitialDate
                                    ? currentColors.primary[700]  // Darker text for saved date
                                    : isInitialDate && !isSelected
                                        ? currentColors.primary[600]  // Primary color for saved date when not selected
                                        : isToday
                                            ? currentColors.secondary[400]  // Regular text color for today
                                            : day.isDisabled
                                                ? currentColors.text.soft
                                                : currentColors.text.main,
                            fontSize: 14,
                            fontWeight: isSelected || isInitialDate ? '600' : '400',
                            textDecoration: isToday && !isSelected && !isInitialDate ? 'underline' : 'none',  // Subtle underline for today
                            textAlign: 'center',
                        }}
                    >
                        {day.day}
                    </Text>
                </Pressable>
            </Box>
        );
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

            <Box className="flex-1 px-4 pt-8 pb-2">
                {/* Calendar Container */}
                <Box
                    className="flex flex-col rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: currentColors.surface.elevated,
                        borderWidth: 1,
                        borderColor: currentColors.border,
                        width: '100%',
                        justifyContent: 'flex-start',
                    }}
                >
                    {/* Calendar Component */}
                    <Calendar
                        selectedDate={tempSelectedDate || undefined}
                        onSelectDate={handleDateSelect}
                        currentMonth={currentMonth}
                        onMonthChange={handleMonthChange}
                        minDate={minDate}
                        disableFutureDates={false}
                        renderDay={renderDay}
                        headerComponent={
                            <MonthSelector
                                currentMonth={currentMonth}
                                onMonthChange={handleMonthDelta}
                                disableNext={false}
                                disablePrevious={!canGoPrevMonth()}
                            />
                        }
                        weekDays={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                    />
                </Box>
            </Box>

            {/* Save Button */}
            <Box className="p-3">
                <Button
                    title='Save'
                    variant="primary"
                    onPress={handleSave}
                />
            </Box>
        </Box>
    );
}