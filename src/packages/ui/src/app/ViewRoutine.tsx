import React, { useEffect, useState, Fragment } from 'react';
import { Box, Text, Button, useTheme, Alert, useAlert } from '@blockit/cross-ui-toolkit';
import type { Routine, Commitment } from '@blockit/shared';
import { PauseIcon } from './icons/PauseIcon';
import { PlayIcon } from './icons/PlayIcon';
import { api } from '../stores/authStore';
import { getRoutineStatusDisplay } from '../lib/routine';

function CardRow({ label, value }: { label: string; value: string }) {
    const { currentColors } = useTheme();

    return (
        <Box
            className='w-full flex h-[72px] flex-row justify-between items-center px-3 rounded-xl bg-neutral-300'
            style={{ backgroundColor: currentColors.surface.elevated }}
        >
            <Box className='flex-1 flex flex-col items-start'>
                <Text variant='body'>{label}</Text>
                <Text variant='h6'>{value}</Text>
            </Box>
        </Box>
    );
}

type ViewRoutineProps = {
    routineId: string;
    onBack: () => void;
    onToggleStatus?: (routineId: string, newStatus: 'active' | 'paused') => Promise<void>;
    onDelete?: (routineId: string) => Promise<void>;
}

export function ViewRoutine({ routineId, onBack, onToggleStatus, onDelete }: ViewRoutineProps) {
    const { currentColors } = useTheme();
    const [routine, setRoutine] = useState<Routine | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const { visible, options, show, hide } = useAlert();

    useEffect(() => {
        fetchRoutine();
    }, [routineId]);

    const fetchRoutine = async () => {
        try {
            const response = await api().get<Routine>(`/routines/${routineId}`);
            setRoutine(response.data);
        } catch (error) {
            console.error('Failed to fetch routine:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (newStatus: 'active' | 'paused') => {
        if (!onToggleStatus || updating) return;
        
        setUpdating(true);
        try {
            await onToggleStatus(routineId, newStatus);
            setRoutine(prev => prev ? { ...prev, status: newStatus } : null);
        } catch (error) {
            console.error('Failed to update routine status:', error);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!onDelete || updating) return;
        
        setUpdating(true);
        try {
            await onDelete(routineId);
            onBack();
        } catch (error) {
            console.error('Failed to delete routine:', error);
            setUpdating(false);
        }
    };

    const handleStopRoutine = async () => {
        if (updating) return;
        
        setUpdating(true);
        try {
            await api().put(`/routines/${routineId}/status`, { status: 'canceled' });
            onBack();
        } catch (error) {
            console.error('Failed to stop routine:', error);
            setUpdating(false);
        }
    };

    const confirmStopRoutine = () => show({
        title: "Stop Routine",
        message: "Are you sure? You'll lose your progress and any staked funds.",
        buttons: [
            { text: "Cancel", style: "cancel" },
            { text: "Stop", style: "destructive", onPress: handleStopRoutine }
        ]
    });

    if (loading) {
        return (
            <Box className="flex-1 flex items-center justify-center">
                <Text variant="h6">Loading...</Text>
            </Box>
        );
    }

    if (!routine) {
        return (
            <Box className="flex-1 flex items-center justify-center">
                <Text variant="h6">Routine not found</Text>
            </Box>
        );
    }

    const formatDate = (date: string | null | undefined, defaultText: string = 'Not set') => {
        if (!date) return defaultText;
        return new Date(date).toLocaleDateString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatStakeAmount = (amount: number) => {
        if (amount === 0) return 'Free';
        return `${amount} SOL`;
    };

    const formatCommitmentInfo = () => {
        if (!routine.commitments || routine.commitments.length === 0) {
            return 'No on-chain commitment';
        }
        
        const commitment = routine.commitments[0]; // Get the first commitment
        const amountInSol = parseFloat(commitment.amount) / 1e9; // Convert lamports to SOL
        
        let statusText = '';
        if (commitment.status === 'active') {
            statusText = 'Locked';
        } else if (commitment.status === 'claimed') {
            statusText = 'Claimed';
        } else if (commitment.status === 'forfeited') {
            statusText = 'Forfeited';
        }
        
        return `${amountInSol} SOL - ${statusText}`;
    };

    const formatTimeSettings = () => {
        if (routine.timeMode === 'blocking') {
            return `${routine.startTime} - ${routine.endTime}`;
        } else if (routine.timeMode === 'limit') {
            return `${routine.dailyLimit} min daily`;
        }
        return 'Not set';
    };

    const formatBlockedApps = () => {
        const count = routine.blockedApps?.length || 0;
        if (count === 0) return 'No apps blocked';
        if (count === 1) return '1 App';
        return `${count} Apps`;
    };

    const formatSelectedDays = () => {
        if (!routine.selectedDays || routine.selectedDays.length === 0) {
            return 'Every day';
        }
        if (routine.selectedDays.length === 7) {
            return 'Every day';
        }
        return routine.selectedDays.join(', ');
    };

    const isActive = routine.status === 'active';
    const statusDisplay = getRoutineStatusDisplay(routine);
    const statusColor = statusDisplay.color === 'success' ? currentColors.success.main :
                       statusDisplay.color === 'warning' ? currentColors.warning.main :
                       statusDisplay.color === 'error' ? currentColors.error.main :
                       statusDisplay.color === 'primary' ? currentColors.primary[500] :
                       currentColors.neutral[200];
    const textColor = ['success', 'warning', 'error', 'primary'].includes(statusDisplay.color) ? 'white' : currentColors.text.soft;

    return (
        <Box className="flex-1 flex flex-col px-4">
            {/* Emoji and Title */}
            <Box className="flex flex-col w-full justify-center items-center mt-4 mb-2">
                <Text className="text-[90px] mb-2">{routine.emoji}</Text>
                <Text variant='h3'>{routine.name}</Text>
                <Box 
                    className='px-3 py-1 rounded-full mt-2'
                    style={{ backgroundColor: statusColor }}
                >
                    <Text 
                        variant='caption' 
                        style={{ color: textColor }}
                    >
                        {statusDisplay.label}
                    </Text>
                </Box>
            </Box>

            {/* Card rows */}
            <Box className="mt-4 flex flex-col flex-1" style={{ gap: 6 }}>
                <CardRow
                    label="Time Settings"
                    value={formatTimeSettings()}
                />
                <CardRow
                    label="Days"
                    value={formatSelectedDays()}
                />
                <CardRow
                    label="Duration"
                    value={`${formatDate(routine.createdAt)} - ${formatDate(routine.endDate, 'No end date')}`}
                />
                <CardRow
                    label="Blocking"
                    value={formatBlockedApps()}
                />
                <CardRow
                    label="Stake"
                    value={formatStakeAmount(routine.stakeAmount)}
                />
                <CardRow
                    label="On-chain Commitment"
                    value={formatCommitmentInfo()}
                />
            </Box>

            {/* Action Buttons */}
            <Box style={{ padding: 16, gap: 8 }} className="flex flex-col">
                {onToggleStatus && (routine.status === 'active' || routine.status === 'paused') && (
                    <Button
                        title={isActive ? 'Pause' : 'Resume'}
                        variant={isActive ? "secondary" : "primary"}
                        onPress={() => handleToggleStatus(isActive ? 'paused' : 'active')}
                        leftIcon={isActive ? <PauseIcon size={18} color={currentColors.text.main} /> : <PlayIcon size={18} color="white" />}
                        disabled={updating}
                    />
                )}
                
                {(routine.status === 'active' || routine.status === 'paused') && (
                    <Button
                        title="Stop Routine"
                        variant="outline"
                        onPress={confirmStopRoutine}
                        style={{ 
                            borderColor: currentColors.error.main,
                            color: currentColors.error.main
                        }}
                        disabled={updating}
                    />
                )}
                
                {onDelete && (
                    <Button
                        title="Delete Routine"
                        variant="ghost"
                        onPress={handleDelete}
                        style={{ color: currentColors.error }}
                        disabled={updating}
                    />
                )}
            </Box>

            <Alert visible={visible} title={options.title} message={options.message} buttons={options.buttons} onDismiss={hide} />
        </Box>
    );
}