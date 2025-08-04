import React, { useMemo, useState, useEffect } from 'react';
import { Box, Text, Button, useTheme, ScrollView, Pressable, Slider, AnimatedView } from '@blockit/cross-ui-toolkit';
import { ClockIcon, TimerIcon, CalendarIcon } from '../../icons';
import { useRoutineStore } from '../../../stores/routineStore';
import { TimeRangePicker } from './TimeRangePicker';
import { formatDuration } from '../../../lib/timeFormatting';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

type TimeMode = 'blocking' | 'limit';

function DayPills({ selectedDays, onSelectDay, onBulkSelect }: {
    selectedDays: string[];
    onSelectDay: (day: string) => void;
    onBulkSelect?: (days: string[]) => void;
}) {
    const { currentColors } = useTheme();

    const weekdaysSelected = ['Mo', 'Tu', 'We', 'Th', 'Fr'].every(day => selectedDays.includes(day));
    const weekendSelected = ['Sa', 'Su'].every(day => selectedDays.includes(day));

    // Quick selection helpers
    const toggleWeekdays = () => {
        const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr'];
        if (onBulkSelect) {
            if (weekdaysSelected) {
                // Remove weekdays
                const newDays = selectedDays.filter(day => !weekdays.includes(day));
                onBulkSelect(newDays);
            } else {
                // Add weekdays
                const newDays = [...new Set([...selectedDays, ...weekdays])];
                onBulkSelect(newDays);
            }
        }
    };

    const toggleWeekend = () => {
        const weekend = ['Sa', 'Su'];
        if (onBulkSelect) {
            if (weekendSelected) {
                // Remove weekend days
                const newDays = selectedDays.filter(day => !weekend.includes(day));
                onBulkSelect(newDays);
            } else {
                // Add weekend days
                const newDays = [...new Set([...selectedDays, ...weekend])];
                onBulkSelect(newDays);
            }
        }
    };


    return (
        <Box className="w-full  p-3 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
            {/* Section Header */}
            <Box className="flex flex-row items-center justify-between mb-3">
                <Box className="flex flex-row items-center gap-4">

                    <Box
                        className="rounded-2xl flex items-center justify-center h-12 w-12"
                        style={{ backgroundColor: currentColors.neutral[300] }}
                    >
                        <CalendarIcon size={16} color={currentColors.text.soft} />
                    </Box>
                    <Box>
                        <Text
                            variant="body"
                            style={{
                                color: currentColors.text.main,
                                fontWeight: '700',
                                fontSize: 16
                            }}
                        >
                            Days
                        </Text>
                        <Text variant="caption" >
                            {selectedDays.length === 0 ? 'No days selected' :
                                selectedDays.length === 7 ? 'Every day' :
                                    `${selectedDays.length} days selected`}
                        </Text>
                    </Box>
                </Box>

                {/* Quick actions */}
                <Box className="flex flex-row" style={{ gap: 6 }}>
                    <Pressable onPress={toggleWeekdays}>
                        <Text
                            className=" text-sm px-3 py-1.5 rounded-full"
                            style={{
                                color: weekdaysSelected ? currentColors.primary[400] : currentColors.text.soft,
                                backgroundColor: weekdaysSelected ? currentColors.primary[500] + '20' : currentColors.surface.elevated,
                            }}
                        >
                            Weekdays
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={toggleWeekend}
                    >

                        <Text
                            className=" text-sm px-3 py-1.5 rounded-full"
                            style={{
                                color: weekendSelected ? currentColors.primary[400] : currentColors.text.soft,
                                backgroundColor: weekendSelected ? currentColors.primary[500] + '20' : currentColors.surface.elevated,
                            }}
                        >
                            Weekend
                        </Text>
                    </Pressable>
                </Box>
            </Box>

            {/* Individual day selection */}

            <Box className="flex flex-row justify-between w-full" style={{ gap: 3 }}>
                {days.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                        <Pressable
                            key={day}
                            onPress={() => onSelectDay(day)}
                            className="flex-1"
                        >
                            <Box
                                className="rounded-xl"
                                style={{
                                    backgroundColor: isSelected ? currentColors.neutral[900] + '99' : currentColors.background,
                                    paddingVertical: 8,
                                    paddingHorizontal: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: isSelected ? "white" : currentColors.text.verySoft,
                                        fontSize: 13,
                                    }}
                                >
                                    {day}
                                </Text>
                            </Box>
                        </Pressable>
                    );
                })}
            </Box>
        </Box>
    );
}

type TimeModeSelectorProps = {
    mode: TimeMode;
    onModeChange: (mode: TimeMode) => void;
};

type TimeModePillProps = {
    active: boolean;
    icon: React.JSX.Element;
    label: string;
    onPress: () => void;
};

const TimeModeSelector = ({ mode, onModeChange }: TimeModeSelectorProps) => {
    const { currentColors } = useTheme();
    const [containerWidth, setContainerWidth] = useState(0);

    const TimeModePill = ({ active, icon, label, onPress }: TimeModePillProps) => (
        <Box className='flex-1'>
            <Button variant="ghost" onPress={onPress}>
                <Box className="flex items-center flex-row p-2" style={{ gap: 6 }}>
                    {/* {icon} */}
                    <Text
                        variant="caption"
                        className={active ? 'text-secondary-500' : ''}
                    >
                        {label}
                    </Text>
                </Box>
            </Button>
        </Box>
    );

    // Calculate the translateX value based on container width
    // We want to move it by 50% of the container width (minus some padding)
    const translateXValue = containerWidth > 0 ? (containerWidth * 0.5) - 4 : 0;

    return (
        <Box
            className="rounded-xl relative"
            style={{ backgroundColor: currentColors.background }}
            onLayout={(event: any) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            <AnimatedView
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 4,
                    width: '48%',
                    backgroundColor: currentColors.surface.elevated,
                    borderRadius: 8,
                }}
                animate={{
                    translateX: mode === 'blocking' ? 0 : translateXValue,
                }}
                transition={{ duration: 200 }}
            />

            <Box className="flex flex-row w-full relative z-10">
                <TimeModePill
                    active={mode === 'blocking'}
                    icon={<ClockIcon size={14} color={mode === 'blocking' ? currentColors.text.main : currentColors.text.soft} />}
                    label="Blocking"
                    onPress={() => onModeChange('blocking')}
                />
                <TimeModePill
                    active={mode === 'limit'}
                    icon={<TimerIcon size={14} color={mode === 'limit' ? currentColors.text.main : currentColors.text.soft} />}
                    label="Limit"
                    onPress={() => onModeChange('limit')}
                />
            </Box>
        </Box>
    );
};

type TimeLimitSelectionProps = {
    duration: number;
    onDurationChange: (duration: number) => void;
};

function TimeLimitSelection({ duration, onDurationChange }: TimeLimitSelectionProps) {
    const { currentColors } = useTheme();
    
    // Local state for the slider to make it responsive
    const [localDuration, setLocalDuration] = useState(duration || 60);
    
    // Sync with prop changes (only when coming from outside this component)
    useEffect(() => {
        setLocalDuration(duration || 60);
    }, [duration]);

    const formattedValue = useMemo(() => {
        return formatDuration(localDuration);
    }, [localDuration])

    const quickOptions = [
        { label: '30m', value: 30 },
        { label: '1h', value: 60 },
        { label: '2h', value: 120 },
        { label: '3h', value: 180 },
    ];
    
    // Only update local state while sliding
    const handleSliderChange = (value: number) => {
        setLocalDuration(value);
    };
    
    // Update store only when sliding is complete
    const handleSlidingComplete = (value: number) => {
        onDurationChange(value);
    };
    
    const handleQuickSelect = (value: number) => {
        setLocalDuration(value);
        onDurationChange(value);
    };

    return (
        <Box className="flex flex-col w-full mx-auto mt-4 gap-4 p-4">
            {/* Duration Display */}
            <Box className="flex flex-col items-center">
                <Box className="flex items-center justify-center rounded-2xl px-6 py-3 mb-3">
                    <Text variant="h1">
                        {formattedValue}
                    </Text>
                </Box>
            </Box>

            {/* Quick Selection Pills */}
            <Box className='flex flex-col gap-2'>
                <Text variant="caption" className="mb-1 text-xs opacity-60">QUICK SELECT</Text>
                <Box className="flex flex-row flex-wrap gap-2">
                    {quickOptions.map((option) => {
                        const isSelected = localDuration === option.value;
                        return (
                            <Pressable
                                key={option.value}
                                onPress={() => handleQuickSelect(option.value)}
                                className="flex-1"
                                style={{ minWidth: 65 }}
                            >
                                <Box
                                    className="py-2 px-3 rounded-xl items-center"
                                    style={{ backgroundColor: isSelected ? currentColors.neutral[900] + 'DD' : currentColors.background }}
                                >
                                    <Text
                                        variant="caption"
                                        style={{
                                            color: isSelected ? 'white' : currentColors.text.soft,
                                            fontWeight: isSelected ? '600' : '500',
                                        }}
                                    >
                                        {option.label}
                                    </Text>
                                </Box>
                            </Pressable>
                        );
                    })}
                </Box>
            </Box>

            {/* Custom Slider */}
            <Box className='flex flex-col gap-2'>
                <Text variant="caption" className="text-xs opacity-60">
                    CUSTOM LIMIT
                </Text>
                <Box className="p-2 rounded-xl flex flex-col" style={{ backgroundColor: currentColors.surface.elevated }}>
                    <Box className="h-10">
                        <Slider
                            maxTrackTintColor={currentColors.background}
                            value={localDuration}
                            onValueChange={handleSliderChange}
                            onSlidingComplete={handleSlidingComplete}
                            min={10}
                            max={480}
                            step={5}
                            showLabels={false}
                        />
                    </Box>
                    <Box className="flex flex-row justify-between mt-1 px-4">
                        <Text variant="caption">10m</Text>
                        <Text variant="caption">8h</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

type TimeSettingsProps = {
    onBack: () => void;
};

export function RoutineTime({ onBack }: TimeSettingsProps) {
    const { currentColors } = useTheme();
    const { 
        draft, 
        commitDraft, 
        initializeDraft,
        updateDraftDuration,
        updateDraftTimeMode,
        updateDraftSelectedDays,
        updateDraftTimeRange
    } = useRoutineStore();

    // Initialize draft on mount
    useEffect(() => {
        initializeDraft();
    }, [initializeDraft]);

    const handleSave = () => {
        // Commit draft to saved state
        commitDraft();
        onBack();
    };

    return (
        <Box className="flex-1 overflow-hidden p-4" style={{ backgroundColor: currentColors.background }}>
            {/* Scrollable content */}
            <ScrollView
                className='flex-1 '
                contentContainerStyle={{ gap: 12, display: "flex", padding: 4 }}
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
                <DayPills
                    selectedDays={draft.timeSettings.selectedDays}
                    onSelectDay={(day) => {
                        const currentDays = draft.timeSettings.selectedDays;
                        const newDays = currentDays.includes(day)
                            ? currentDays.filter(d => d !== day)
                            : [...currentDays, day];
                        updateDraftSelectedDays(newDays);
                    }}
                    onBulkSelect={updateDraftSelectedDays}
                />
                {/* Time Restrictions Section */}
                <Box className='flex flex-col p-3 rounded-lg gap-3' style={{ backgroundColor: currentColors.surface.card }}>
                    {/* Time Restrictions Header */}
                    <Box className="flex flex-row items-center rounded-2xl gap-4" style={{ backgroundColor: currentColors.surface.card }}>
                        <Box
                            className="rounded-2xl flex items-center justify-center h-12 w-12"
                            style={{ backgroundColor: currentColors.neutral[300] }}
                        >
                            <ClockIcon size={16} color={currentColors.text.soft} />
                        </Box>
                        <Box>
                            <Text
                                variant="body"
                                style={{
                                    color: currentColors.text.main,
                                    fontWeight: '700',
                                    fontSize: 16
                                }}
                            >
                                Hours
                            </Text>
                            <Text
                                variant="caption"
                                style={{
                                    color: currentColors.text.soft,
                                    fontSize: 12
                                }}
                            >
                                Choose how to restrict app usage
                            </Text>
                        </Box>
                    </Box>
                    <Box>
                        <TimeModeSelector
                            mode={draft.timeSettings.timeMode}
                            onModeChange={updateDraftTimeMode}
                        />

                        {draft.timeSettings.timeMode === 'blocking' ? (
                            <TimeRangePicker
                                startTime={draft.timeSettings.startTime}
                                endTime={draft.timeSettings.endTime}
                                onStartTimeChange={(time) => updateDraftTimeRange(time, draft.timeSettings.endTime)}
                                onEndTimeChange={(time) => updateDraftTimeRange(draft.timeSettings.startTime, time)}
                                onBothTimesChange={updateDraftTimeRange}
                            />

                        ) : (
                            <TimeLimitSelection
                                duration={draft.timeSettings.duration}
                                onDurationChange={updateDraftDuration}
                            />
                        )}
                    </Box>
                </Box>

            </ScrollView>

            {/* Fixed save button at bottom */}
            <Box className="p-3 pt-2">
                <Button
                    title='Save'
                    variant="primary"
                    onPress={handleSave}
                    disabled={draft.timeSettings.selectedDays.length === 0}
                />
            </Box>
        </Box>
    );
}