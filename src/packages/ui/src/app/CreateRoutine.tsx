import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { ChevronIcon } from './icons/ChevronIcon';
import { EmojiPicker } from './components/EmojiPicker';
import { useRoutineStore } from '../stores/routineStore';
import { Box, Text, Button, Pressable, Drawer, useTheme, TextInput, NumberInput } from '@blockit/cross-ui-toolkit';
import { api } from '../stores/authStore';
import { createCommitmentWithRetry } from '@blockit/shared';
import { useUser } from '../hooks/useUser';
import { SolIcon } from './icons/SolIcon';
import { formatTimeDescription } from '../lib/timeFormatting';
import { PencilIcon } from './icons/PencilIcon';

function CardRow({ label, value, onPress, icon }: { label: string; value: string; onPress?: () => void; icon?: React.ReactNode }) {
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
            {icon || <ChevronIcon color={currentColors.text.soft} />}
        </Pressable>
    );
}

type CreateRoutineProps = {
    onBack: () => void;
    onApps: () => void;
    onRoutineTime: () => void;
    onCalendar: () => void;
    onMoney?: () => void;
    sendTransaction: (tx: any) => Promise<{signature: string}>;
}

export function CreateRoutine(props: CreateRoutineProps) {
    const modalizeRef = useRef<any>(null);
    const stakeModalRef = useRef<any>(null);
    const { onBack, onApps, onRoutineTime, onCalendar, onMoney, sendTransaction } = props;
    const [routineName, setRoutineName] = useState("New Routine");
    const [routineEmoji, setRoutineEmoji] = useState("🚀");
    const [isCreating, setIsCreating] = useState(false);
    const [localStakeAmount, setLocalStakeAmount] = useState(0);
    const {user} = useUser()
    const { currentColors } = useTheme();

    const { endDate, blockedApps, stakeAmount, setStakeAmount, timeSettings, resetRoutineState } = useRoutineStore();
    
    useEffect(() => {
        setLocalStakeAmount(stakeAmount || 0);
    }, [stakeAmount]);

    const handleCreateRoutine = async () => {
        if (!routineName.trim() || isCreating || !user) return;
        
        try {
            setIsCreating(true);
            
            // Prepare routine data first
            const routineData = {
                name: routineName,
                emoji: routineEmoji,
                timeMode: timeSettings.timeMode,
                selectedDays: timeSettings.selectedDays,
                startTime: timeSettings.timeMode === 'blocking' ? timeSettings.startTime : undefined,
                endTime: timeSettings.timeMode === 'blocking' ? timeSettings.endTime : undefined,
                dailyLimit: timeSettings.timeMode === 'limit' ? timeSettings.duration : undefined,
                endDate: endDate?.toISOString(),
                blockedApps: blockedApps.map(app => ({
                    packageName: app.packageName,
                    appName: app.appName,
                    icon: app.icon
                }))
            };
            
            console.log("routineData", routineData)
            
            // Create routine first to get the routine ID
            const routineResponse = await api().post('/routines', routineData);
            const routineId = routineResponse.data.id;
            console.log("routine created with ID:", routineId)

            // If there's a stake amount, create the on-chain commitment
            if(stakeAmount && user.walletAddress){
                try {
                    const result = await createCommitmentWithRetry(user.walletAddress, stakeAmount, endDate);
                    const signature = await sendTransaction(result.tx);
                    
                    if(!signature) throw new Error("Failed to create commitment");
                    
                    // Create commitment record in database
                    const commitmentData = {
                        routineId,
                        userId: user.id,
                        commitmentId: result.id.toString(),
                        amount: stakeAmount,
                        unlockTime: endDate?.toISOString(),
                        signature: signature.signature
                    };
                    
                    await api().post('/commitments', commitmentData);
                    console.log("commitment record created in database")
                } catch (commitmentError) {
                    // Delete the routine if any part of commitment creation fails
                    try {
                        await api().delete(`/routines/${routineId}`);
                        console.log("Deleted routine due to commitment error");
                    } catch (deleteError) {
                        console.error("Failed to delete routine after commitment error:", deleteError);
                    }
                    throw commitmentError;
                }
            }
            
            // Reset the routine store state
            resetRoutineState();
            
            // Reset local state
            setRoutineName("New Routine");
            setRoutineEmoji("🚀");
            
            // Small delay to ensure the request completes before navigation
            setTimeout(() => { onBack()}, 100);
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
                    <Text className="text-[90px] mb-2" style={{ fontSize: 90, lineHeight: 120 }}>{routineEmoji}</Text>
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
                    value={formatTimeDescription(
                        timeSettings.timeMode,
                        timeSettings.startTime,
                        timeSettings.endTime,
                        timeSettings.duration
                    ) || 'Not set'}
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
                    label="Stake"
                    value={stakeAmount ? formatStakeAmount(stakeAmount) : 'Not set'}
                    onPress={() => stakeModalRef.current?.open()}
                    icon={<PencilIcon size={20} color={currentColors.text.soft} />}
                />
            </Box>

            {/* Start Button */}
            <Box style={{ padding: 16 }}>
                <Button
                    title={isCreating ? 'Creating...' : 'Start'}
                    variant="primary"
                    onPress={handleCreateRoutine}
                    leftIcon={!isCreating ? <PlayIcon size={18} color="white" /> : undefined}
                    disabled={!!isCreating || !user || (!!stakeAmount && !user.walletAddress) || !endDate || !blockedApps.length || !timeSettings.timeMode || !timeSettings.selectedDays.length}
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
            
            <Drawer ref={stakeModalRef}>
                <Box className="p-4 rounded-t-xl">
                    <Box className="flex flex-row items-center gap-2 mb-2">
                        <SolIcon size={24} color={currentColors.primary[500]} />
                        <Text variant="h6">Set Stake Amount</Text>
                    </Box>
                    <Text variant="body" style={{ color: currentColors.text.soft }} className="mb-4">
                        Stake SOL to commit to completing your routine. If you fail, your stake will be forfeited.
                    </Text>
                    <Box className="mb-4">
                        <NumberInput
                            value={localStakeAmount}
                            onChangeNumber={(value) => setLocalStakeAmount(value || 0)}
                            min={0}
                            max={100}
                            step={0.01}
                            allowDecimals={true}
                            placeholder="0.00"
                            variant="outline"
                            size="lg"
                            showClearButton={true}
                        />
                        <Box className="flex flex-row gap-2 justify-center flex-wrap mt-3">
                            {[0.05, 0.1, 0.2, 0.5, 1].map((preset) => (
                                <Pressable
                                    key={preset}
                                    className={`flex-1 p-2 rounded-lg flex items-center justify-center`}
                                    style={{ 
                                        backgroundColor: localStakeAmount === preset 
                                            ? currentColors.primary[500] 
                                            : currentColors.neutral[200],
                                        minWidth: 60
                                    }}
                                    onPress={() => setLocalStakeAmount(preset)}
                                >
                                    <Text variant="body" style={{ 
                                        color: localStakeAmount === preset 
                                            ? currentColors.white 
                                            : currentColors.text.soft 
                                    }}>
                                        {preset} SOL
                                    </Text>
                                </Pressable>
                            ))}
                        </Box>
                    </Box>
                    <Button
                        title="Save"
                        variant="primary"
                        onPress={() => {
                            setStakeAmount(localStakeAmount > 0 ? localStakeAmount : undefined);
                            stakeModalRef.current?.close();
                        }}
                    />
                </Box>
            </Drawer>
        </Box>
    );
}
