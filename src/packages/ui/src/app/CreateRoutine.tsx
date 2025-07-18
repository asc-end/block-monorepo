import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { ChevronIcon } from './icons/ChevronIcon';
import { EmojiPicker } from './components/EmojiPicker';
import { useRoutineStore } from '../stores/routineStore';
import { Box, Text, Button, Pressable, Drawer, useTheme, TextInput } from '@blockit/cross-ui-toolkit';
import { api } from '../stores/authStore';

function CardRow({ label, value, onPress }: { label: string; value: string; onPress?: () => void }) {
    const isNotSet = value === 'Not set';
    const { currentColors } = useTheme();

    return (
        <Pressable
            className={`w-full flex h-[72px] flex-row justify-between items-center px-3 rounded-xl hover:opacity-70 ${isNotSet ? 'bg-neutral-200 border border-neutral-300' : 'bg-neutral-300'
                }`}
            style={{ backgroundColor: isNotSet ? currentColors.surface.card : currentColors.surface.elevated, borderColor: isNotSet ? currentColors.neutral[200] : "" }}
            onPress={onPress}
        >
            <Box className='flex-1 flex flex-col items-start'>
                <Text variant='body'>{label}</Text>
                {!isNotSet && <Text variant='h6'>{value}</Text>}
            </Box>
            <ChevronIcon color={currentColors.text.soft} />
        </Pressable>
    );
}

type CreateRoutineProps = {
    onBack: () => void;
    onApps: () => void;
    onRoutineTime: () => void;
    onCalendar: () => void;
    onMoney: () => void;
}

export function CreateRoutine(props: CreateRoutineProps) {
    const modalizeRef = useRef<any>(null);
    const { onBack, onApps, onRoutineTime, onCalendar, onMoney } = props;
    const [routineName, setRoutineName] = useState("New Routine");
    const [routineEmoji, setRoutineEmoji] = useState("🚀");
    const [isCreating, setIsCreating] = useState(false);


    const { endDate, blockedApps, stakeAmount, timeSettings, resetRoutineState } = useRoutineStore();

    const handleCreateRoutine = async () => {
        if (!routineName.trim() || isCreating) return;
        
        try {
            setIsCreating(true);
            
            const routineData = {
                name: routineName,
                emoji: routineEmoji,
                timeMode: timeSettings.timeMode,
                selectedDays: timeSettings.selectedDays,
                startTime: timeSettings.timeMode === 'blocking' ? timeSettings.startTime : undefined,
                endTime: timeSettings.timeMode === 'blocking' ? timeSettings.endTime : undefined,
                dailyLimit: timeSettings.timeMode === 'limit' ? timeSettings.duration : undefined,
                endDate: endDate?.toISOString(),
                stakeAmount,
                blockedApps: blockedApps.map(app => ({
                    packageName: app.packageName,
                    appName: app.appName,
                    icon: app.icon
                }))
            };
            console.log("routineData", routineData)
            await api().post('/routines', routineData);
            console.log("routine created")
            
            // Reset the routine store state
            resetRoutineState();
            
            // Reset local state
            setRoutineName("New Routine");
            setRoutineEmoji("🚀");
            
            // Small delay to ensure the request completes before navigation
            setTimeout(() => {
                onBack();
            }, 100);
        } catch (error: any) {
            console.error('Failed to create routine:', error);
            if (error.response?.data?.error) {
                console.error('Server error:', error.response.data.error);
            }
            // TODO: Show error message to user
        } finally {
            setIsCreating(false);
        }
    };

    const formatEndDate = (date: Date | null) => {
        if (!date) return 'Not set';
        return date.toLocaleDateString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatStakeAmount = (amount: number) => {
        if (amount === 0) return 'Free';
        return `${amount} SOL`;
    };

    return (
        <Box className="flex-1 flex flex-col px-4">
            {/* Emoji and Title */}
            <Box className="flex flex-col w-full justify-center items-center mt-4 mb-2">
                <Pressable onPress={() => modalizeRef.current?.open()}>
                    <Text className="text-[90px] mb-2">{routineEmoji}</Text>
                </Pressable>
                <TextInput
                    value={routineName}
                    onChangeText={setRoutineName}
                    placeholder="New Routine"
                    style={{ width: 300 }}
                />
            </Box>

            {/* Card rows */}
            <Box className="mt-4 flex flex-col flex-1" style={{ gap: 6 }}>
                <CardRow
                    label="Time Settings"
                    value={timeSettings.timeMode === 'blocking'
                        ? `${timeSettings.startTime} - ${timeSettings.endTime}`
                        : timeSettings.timeMode === 'limit'
                            ? `${timeSettings.duration} min daily`
                            : 'Not set'}
                    onPress={() => onRoutineTime()}
                />
                <CardRow
                    label="End date"
                    value={formatEndDate(endDate)}
                    onPress={() => onCalendar()}
                />
                <CardRow
                    label="Blocking"
                    value={blockedApps.length > 0 ? `${blockedApps.length} Apps` : 'Not set'}
                    onPress={onApps}
                />
                <CardRow
                    label="Money"
                    value={formatStakeAmount(stakeAmount)}
                    onPress={onMoney}
                />
            </Box>

            {/* Start Button */}
            <Box style={{ padding: 16 }}>
                <Button
                    title={isCreating ? 'Creating...' : 'Start'}
                    variant="primary"
                    onPress={handleCreateRoutine}
                    leftIcon={!isCreating ? <PlayIcon size={18} color="white" /> : undefined}
                    disabled={isCreating}
                />
            </Box>

            <Drawer
                ref={modalizeRef}
                adjustToContentHeight
                closeOnOverlayTap
                openAnimationConfig={{
                    spring: { speed: 10, bounciness: 0 },
                    timing: { duration: 32 }
                }}
            >
                <EmojiPicker
                    onSelect={(emoji) => {
                        setRoutineEmoji(emoji);
                        modalizeRef.current?.close()
                    }}
                />
            </Drawer>
        </Box>
    );
}
