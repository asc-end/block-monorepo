import React, { useState } from 'react';
import { Box, Text, Button, useTheme, ScrollView, Pressable, Slider } from '@blockit/cross-ui-toolkit';
import { ClockIcon } from '../../icons/ClockIcon';
import { TimerIcon } from '../../icons/TimerIcon';
import { TimeSettings, useRoutineStore } from '../../../stores/routineStore';
import { HourSelector } from './HourSelector';
import { TimeRangePicker } from './TimeRangePicker';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

type TimeMode = 'blocking' | 'limit';

function DayPills({ selectedDays, onSelectDay }: { selectedDays: string[]; onSelectDay: (day: string) => void }) {
    return (
        <Box className="flex flex-row justify-center w-full mb-3" style={{ gap: 6 }}>
            {days.map(day => (
                <Box key={day} className='flex-1'>
                    <Button
                        title={day}
                        variant={selectedDays.includes(day) ? 'primary' : 'outline'}
                        size="xs"
                        style={{ minWidth: 32, paddingHorizontal: 0, height: 32 }}
                        onPress={() => onSelectDay(day)}
                    />
                </Box>
            ))}
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

    const TimeModePill = ({ active, icon, label, onPress }: TimeModePillProps) => (
        <Box className='flex-1'>
            <Button variant="ghost" onPress={onPress}>
                <Box className="flex items-center flex-row p-2" style={{ gap: 6 }}>
                    {icon}
                    <Text
                        variant="caption"
                        className={active ? 'text-primary-500' : ''}
                    >
                        {label}
                    </Text>
                </Box>
            </Button>
        </Box>
    );

    return (
        <Box className="rounded-xl relative" style={{ backgroundColor: currentColors.neutral[100] }}>
            <Box
                className="absolute top-1 bottom-1 rounded-lg shadow-sm transition-all duration-200 ease-in-out"
                style={{
                    backgroundColor: currentColors.surface.elevated,
                    left: mode === 'blocking' ? 0 : '50%',
                    right: mode === 'blocking' ? '50%' : 0,
                }}
            />

            <Box className="flex flex-row w-full relative z-10">
                <TimeModePill
                    active={mode === 'blocking'}
                    icon={<ClockIcon size={14} color={mode === 'blocking' ? currentColors.primary[500] : currentColors.text.soft} />}
                    label="Blocking"
                    onPress={() => onModeChange('blocking')}
                />
                <TimeModePill
                    active={mode === 'limit'}
                    icon={<TimerIcon size={14} color={mode === 'limit' ? currentColors.primary[500] : currentColors.text.soft} />}
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

const timeModes = [
    {
        id: 0,
        label: "Laser Focused",
        emoji: "💥",
        description: "Zero distractions. You're building blocks, not checking feeds.",
        range: [0, 29],
    },
    {
        id: 1,
        label: "Solana Speed",
        emoji: "⚡️",
        description: "Fast, efficient — you're sprinting through tasks like 65k TPS.",
        range: [30, 59],
    },
    {
        id: 2,
        label: "To the Moon!",
        emoji: "🚀",
        description: "Momentum is strong, but you might peek at the charts.",
        range: [60, 119],
    },
    {
        id: 3,
        label: "Bear Market Blues",
        emoji: "📉",
        description: "Distractions creeping in. Nothing's pumping anyway.",
        range: [120, 179],
    },
    {
        id: 4,
        label: "Degen Mode",
        emoji: "🦍",
        description: "All bets are on. Notifications unchained. Good luck.",
        range: [180, 1200],
    }
];

function TimeLimitSelection({ duration, onDurationChange }: TimeLimitSelectionProps) {
    const { currentColors } = useTheme();
    const d = typeof duration === 'number' ? duration : 60;
    
    // Find current mode based on duration
    const currentModeIndex = timeModes.findIndex(mode => 
        d >= mode.range[0] && d <= mode.range[1]
    );
    const currentMode = timeModes[currentModeIndex] || timeModes[2];

    const handleModeSelect = (mode: typeof timeModes[0]) => {
        // Set duration to the middle of the range for the selected mode
        const middleDuration = Math.floor((mode.range[0] + mode.range[1]) / 2);
        onDurationChange(middleDuration);
    };

    const handleSliderChange = (value: number) => {
        onDurationChange(Math.round(value));
    };

    return (
        <Box className="flex flex-col w-full mx-auto mt-4 gap-6">
            {/* Current Mode Display */}
            <Box
                className="flex flex-col items-center p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: currentColors.surface.elevated }}
            >
                <Text className="text-4xl mb-2">{currentMode.emoji}</Text>
                <Text 
                    variant="h2" 
                    className="text-center mb-2"
                    style={{ color: currentColors.text.main }}
                >
                    {currentMode.label}
                </Text>
                <Text
                    variant="caption"
                    className="text-center mb-4"
                    style={{ color: currentColors.text.soft }}
                >
                    {currentMode.description}
                </Text>
                
                {/* Duration Display */}
                <Box className="flex flex-row items-center justify-center gap-2 mb-4">
                    <Text
                        variant="h1"
                        style={{ color: currentColors.text.main }}
                    >
                        {d}
                    </Text>
                    <Text
                        variant="h4"
                        style={{ color: currentColors.text.soft }}
                    >
                        minutes/day
                    </Text>
                </Box>

                {/* Fine-tune Slider */}
                <Box className="w-full max-w-xs">
                    <Text
                        variant="caption"
                        className="text-center mb-2"
                        style={{ color: currentColors.text.soft }}
                    >
                        Fine-tune your limit
                    </Text>
                    <Box className="flex flex-row items-center gap-3">
                        <Text
                            variant="caption"
                            className="text-xs"
                            style={{ color: currentColors.text.soft }}
                        >
                            0m
                        </Text>
                        <Slider
                            value={d}
                            onValueChange={handleSliderChange}
                            min={0}
                            max={1200}
                            step={5}
                            showLabels={false}
                            className="flex-1"
                        />
                        <Text
                            variant="caption"
                            className="text-xs"
                            style={{ color: currentColors.text.soft }}
                        >
                            1200m
                        </Text>
                    </Box>
                </Box>
            </Box>

            {/* Helper Text */}
            <Text
                variant="caption"
                className="text-center px-4"
                style={{ color: currentColors.text.soft }}
            >
                Set a daily app usage limit. Once reached, selected apps will be blocked for the rest of the day.
            </Text>
        </Box>
    );
}

type TimeSettingsProps = {
    onBack: () => void;
};

export function RoutineTime({ onBack }: TimeSettingsProps) {
    const { currentColors } = useTheme();

    const [localTimeSettings, setLocalTimeSettings] = useState<TimeSettings>({
        startTime: '09:00',
        endTime: '17:00',
        timeMode: 'blocking',
        duration: 60,
        selectedDays: [],
    });
    const [localSelectedHours, setLocalSelectedHours] = useState<number[]>([]);
    const [useHourSelector, setUseHourSelector] = useState(false); // Toggle for backup hour selector
    const { setTimeSettings } = useRoutineStore();

    const handleSave = () => {
        setTimeSettings(localTimeSettings);
        onBack();
    };

    return (
        <Box className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: currentColors.surface.card }}>
            {/* Scrollable content */}
            <ScrollView
                className='flex-1'
                contentContainerClassName='px-3 pb-2'
                showsVerticalScrollIndicator={false}
                style={{ flexGrow: 1 }}
            >
                <DayPills
                    selectedDays={localTimeSettings.selectedDays}
                    onSelectDay={(day) => {
                        setLocalTimeSettings(prev => ({
                            ...prev,
                            selectedDays: prev.selectedDays.includes(day)
                                ? prev.selectedDays.filter(d => d !== day)
                                : [...prev.selectedDays, day]
                        }));
                    }}
                />

                <TimeModeSelector
                    mode={localTimeSettings.timeMode}
                    onModeChange={(mode) => {
                        setLocalTimeSettings(prev => ({
                            ...prev,
                            timeMode: mode
                        }));
                    }}
                />

                {localTimeSettings.timeMode === 'blocking' ? (
                    <>
                        {/* Time Range Picker - Primary UI */}
                        {!useHourSelector ? (
                            <TimeRangePicker
                                startTime={localTimeSettings.startTime}
                                endTime={localTimeSettings.endTime}
                                onStartTimeChange={(time) => {
                                    setLocalTimeSettings(prev => ({
                                        ...prev,
                                        startTime: time
                                    }));
                                }}
                                onEndTimeChange={(time) => {
                                    setLocalTimeSettings(prev => ({
                                        ...prev,
                                        endTime: time
                                    }));
                                }}
                            />
                        ) : (
                            /* Hour Selector - Backup UI (commented out by default) */
                            <>
                                <Box className='flex flex-row items-start mt-1' style={{ gap: 4 }}>
                                    <Text variant="caption" style={{ color: currentColors.text.soft }}>
                                        Block apps during specific hours
                                    </Text>
                                    <Box className='flex-1 flex flex-row justify-end'>
                                        <Pressable
                                            onPress={() => setLocalSelectedHours([])}
                                            className="text-xs"
                                            style={{ alignItems: 'flex-end' }}
                                        >
                                            <Text variant="caption" className='text-end' style={{ color: currentColors.secondary[500], fontSize: 11 }}>
                                                Reset Selection
                                            </Text>
                                        </Pressable>
                                    </Box>
                                </Box>
                                <HourSelector
                                    selectedHours={localSelectedHours}
                                    onHoursChange={setLocalSelectedHours}
                                    currentColors={currentColors}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <TimeLimitSelection
                        duration={localTimeSettings.duration}
                        onDurationChange={(duration) => {
                            setLocalTimeSettings(prev => ({
                                ...prev,
                                duration
                            }));
                        }}
                    />
                )}
            </ScrollView>

            {/* Fixed save button at bottom */}
            <Box className="p-3 pt-2">
                <Button
                    title='Save'
                    variant="primary"
                    onPress={handleSave}
                />
            </Box>
        </Box>
    );
}