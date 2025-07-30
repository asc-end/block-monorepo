import React, { useEffect, useState, Fragment } from 'react';
import { Box, Text, Button, useTheme, Alert, useAlert } from '@blockit/cross-ui-toolkit';
import type { FocusSession } from '@blockit/shared';
import { api } from '../stores/authStore';
import { SolIcon } from './icons/SolIcon';

function CardRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
    const { currentColors } = useTheme();

    return (
        <Box
            className='w-full flex h-[72px] flex-row justify-between items-center px-3 rounded-xl bg-neutral-300'
            style={{ backgroundColor: currentColors.surface.elevated }}
        >
            <Box className='flex-1 flex flex-col items-start'>
                <Text variant='body'>{label}</Text>
                <Box className='flex flex-row items-center gap-2'>
                    {icon}
                    <Text variant='h6'>{value}</Text>
                </Box>
            </Box>
        </Box>
    );
}

type ViewFocusSessionProps = {
    sessionId: string;
    onBack: () => void;
}

export function ViewFocusSession({ sessionId, onBack }: ViewFocusSessionProps) {
    const { currentColors } = useTheme();
    const [session, setSession] = useState<FocusSession | null>(null);
    const [loading, setLoading] = useState(true);
    const { visible, options, show, hide } = useAlert();

    useEffect(() => {
        fetchSession();
    }, [sessionId]);

    const fetchSession = async () => {
        try {
            const response = await api().get<FocusSession[]>('/focus-session');
            const foundSession = response.data.find(s => s.id === sessionId);
            setSession(foundSession || null);
        } catch (error) {
            console.error('Failed to fetch focus session:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box className="flex-1 flex items-center justify-center">
                <Text variant="h6">Loading...</Text>
            </Box>
        );
    }

    if (!session) {
        return (
            <Box className="flex-1 flex items-center justify-center">
                <Text variant="h6">Focus Session not found</Text>
            </Box>
        );
    }

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('default', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
    };

    const formatStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatCommitmentInfo = () => {
        if (!session.commitment) {
            return { value: 'No stake', icon: null };
        }
        
        const commitment = session.commitment;
        const amountInSol = Number(commitment.amount) / 1e9;
        
        let statusText = '';
        if (commitment.status === 'active') {
            statusText = 'Locked';
        } else if (commitment.status === 'claimed') {
            statusText = 'Claimed';
        } else if (commitment.status === 'forfeited') {
            statusText = 'Forfeited';
        }
        
        return {
            value: `${amountInSol.toFixed(2)} SOL - ${statusText}`,
            icon: <SolIcon size={18} color={currentColors.primary[500]} />
        };
    };

    const getStatusColor = () => {
        switch (session.status) {
            case 'finished':
                return currentColors.success?.main || currentColors.success?.[500] || '#10b981';
            case 'canceled':
                return currentColors.error?.main || currentColors.error?.[500] || '#ef4444';
            case 'in_progress':
                return currentColors.primary?.[500] || '#3b82f6';
            default:
                return currentColors.neutral?.[500] || '#6b7280';
        }
    };

    const statusColor = getStatusColor();
    const commitmentInfo = formatCommitmentInfo();

    return (
        <Box className="flex-1 flex flex-col px-4">
            {/* Icon and Title */}
            <Box className="flex flex-col w-full justify-center items-center mt-4 mb-2">
                <Text className="text-[90px] mb-2" style={{ fontSize: 90, lineHeight: 120 }}>🧘</Text>
                <Text variant='h3'>Focus Session</Text>
                <Box 
                    className='px-3 py-1 rounded-full mt-2'
                    style={{ backgroundColor: `${statusColor}20` }}
                >
                    <Text 
                        variant='caption' 
                        style={{ color: statusColor }}
                    >
                        {formatStatus(session.status)}
                    </Text>
                </Box>
            </Box>

            {/* Card rows */}
            <Box className="mt-4 flex flex-col flex-1" style={{ gap: 6 }}>
                <CardRow
                    label="Started"
                    value={formatDate(session.startTime)}
                />
                <CardRow
                    label="Duration"
                    value={formatDuration(session.duration)}
                />
                <CardRow
                    label="Stake"
                    value={commitmentInfo.value}
                    icon={commitmentInfo.icon}
                />
                {session.status === 'finished' && (
                    <CardRow
                        label="Completed"
                        value={formatDate(new Date(new Date(session.startTime).getTime() + session.duration * 60 * 1000))}
                    />
                )}
            </Box>

            {/* Back Button */}
            <Box style={{ padding: 16 }}>
                <Button
                    title="Back"
                    variant="primary"
                    onPress={onBack}
                />
            </Box>

            <Alert visible={visible} title={options.title} message={options.message} buttons={options.buttons} onDismiss={hide} />
        </Box>
    );
}