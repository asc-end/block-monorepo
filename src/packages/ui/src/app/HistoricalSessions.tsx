import React, { useMemo } from 'react';
import { Box, Text, ScrollView, useTheme, Pressable, Gradient } from "@blockit/cross-ui-toolkit";
import { useHistoricalSessions } from "../hooks/useHistoricalSessions";
import { formatTime } from "../lib/time";
import { ChevronIcon } from "./icons/ChevronIcon";
import { SolIcon } from "./icons/SolIcon";
import { ClockIcon, CloseIcon, CloseIconGradient, FocusIcon } from './icons';

interface HistoricalSessionsProps {
    onBack?: () => void;
    onViewSession?: (sessionId: string, type: 'focus' | 'routine') => void;
    onNavigateToSuccess?: (sessionId: string | undefined, claimMode: 'single' | 'multiple') => void;
}

export function HistoricalSessions({ onBack, onViewSession, onNavigateToSuccess }: HistoricalSessionsProps) {
    const { currentColors } = useTheme();
    const { sessions, isLoading, error, refetch } = useHistoricalSessions();

    // Filter sessions with claimable commitments
    const claimableCount = useMemo(() => {
        if (!sessions) return 0;

        return sessions.filter((session) => {
            // Canceled sessions can never be claimed
            if (session.status === 'canceled') return false;
            if (!session.commitment) return false;
            
            // Check if commitment is completed and not yet claimed
            const isActive = session.commitment.status === 'active';
            const isNotClaimed = !session.commitment.claimedAt;
            const unlockTime = session.commitment.unlockTime ? new Date(session.commitment.unlockTime) : null;
            const isUnlocked = unlockTime ? new Date() > unlockTime : false;

            return isActive && isNotClaimed && isUnlocked;
        }).length;
    }, [sessions]);

    const SessionCard: React.FC<{ session: any }> = ({ session }) => {
        const isRoutine = session.type === 'routine';
        const statusColor = session.status === 'completed'
            ? currentColors.success.main
            : currentColors.error.main;

        // Check if this session has a claimable commitment
        const isClaimable = useMemo(() => {
            // Canceled sessions can never be claimed
            if (session.status === 'canceled') return false;
            if (!session.commitment) return false;

            const isActive = session.commitment.status === 'active';
            const isNotClaimed = !session.commitment.claimedAt;
            const unlockTime = session.commitment.unlockTime ? new Date(session.commitment.unlockTime) : null;
            const isUnlocked = unlockTime ? new Date() > unlockTime : false;

            return isActive && isNotClaimed && isUnlocked;
        }, [session.commitment, session.status]);

        const handlePress = () => {
            if (isClaimable) return; // Don't navigate if there's a claim button

            // Navigate to success screen for completed focus sessions
            if (session.type === 'focus' && session.status === 'completed' && onNavigateToSuccess) {
                onNavigateToSuccess(session.id, 'single');
            } else if (onViewSession) {
                onViewSession(session.id, session.type);
            }
        };

        return (
            <Pressable
                onPress={handlePress}
                className="rounded-xl mb-3 mx-4 overflow-hidden flex flex-row justify-between items-center"
                style={{
                    backgroundColor: currentColors.surface.elevated + (session.status == "canceled" ? "B2" : ""),
                    borderWidth: 1,
                    borderColor: currentColors.neutral?.[200] ? currentColors.neutral[200] + "30" : currentColors.border,
                    paddingVertical: 12,
                    paddingRight: 16,
                    paddingLeft: 12
                }}
            >
                <Box className="flex-1 flex flex-row items-center gap-3" style={{ minWidth: 0 }}>
                    <Box className="w-11 h-11 rounded-lg items-center justify-center flex-shrink-0" style={{ backgroundColor: currentColors.surface.card }}>
                        {isRoutine ? (
                            <Text className="text-lg">
                                {session.emoji || '🎯'}
                            </Text>
                        ) : (
                            <FocusIcon size={22} color={currentColors.secondary[500]} />
                        )}
                    </Box>
                    <Box className="flex-1" style={{ opacity: session.status == "canceled" ? 0.5 : 1, minWidth: 0 }}
                    >
                        <Text 
                            className="font-semibold text-base text-left" 
                            numberOfLines={1}
                            style={{ color: currentColors.text.main }}
                        >
                            {session.name || 'Unnamed Session'}
                        </Text>
                        <Box className="flex flex-row items-center gap-1 flex-wrap">
                            {session.duration && (
                                <Box className="flex flex-row items-center gap-1">
                                    <ClockIcon size={12} color={currentColors.text.soft} />
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                        {session.duration || 0}m
                                    </Text>
                                </Box>
                            )}
                            {isRoutine && (
                                <>
                                    {session.duration && (
                                        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                            •
                                        </Text>
                                    )}
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                        Routine
                                    </Text>
                                </>
                            )}
                            {session.stakeAmount && session.stakeAmount > 0 && (
                                <>
                                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                        •
                                    </Text>
                                    <Box className="flex flex-row items-center gap-1">
                                        <SolIcon size={12} color={currentColors.text.soft} />
                                        <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                            {(session.stakeAmount || 0).toFixed(1)}
                                        </Text>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>

                </Box>
                <Box className="flex flex-row items-center gap-2 flex-shrink-0 ml-2">
                    {session.status == "canceled" &&
                        <Box style={{ backgroundColor: currentColors.surface.elevated }} className="p-2 rounded-full">
                            <CloseIconGradient 
                                size={16} 
                                colors={[
                                    currentColors.pop.magenta,
                                    currentColors.pop.red,
                                ]}
                            />
                        </Box>
                    }
                    {isClaimable && onNavigateToSuccess ? (
                        <Pressable
                            onPress={() => {
                                onNavigateToSuccess(session.id, 'single');
                            }}
                            className="px-2 py-1.5 rounded-lg flex flex-row items-center gap-1"
                            style={{ backgroundColor: currentColors.secondary[900] }}
                        >
                            <SolIcon size={12} color={"white"} />
                            <Text className="text-xs font-medium" style={{ color: "white" }}>
                                Claim
                            </Text>
                        </Pressable>
                    ) : (
                        session.status !== "canceled" && <ChevronIcon color={currentColors.text.soft} direction="right" size={16} />
                    )}
                </Box>
                {session.status == "completed" && <Box className="absolute top-0 right-0 left-0 bottom-0">
                    <Gradient className="h-0.5 w-full absolute bottom-0 right-0 left-0" colors={[currentColors.pop.indigo, currentColors.pop.violet, currentColors.pop.purple, currentColors.pop.magenta, currentColors.pop.red, currentColors.pop.yellow]} />
                </Box>
                }
            </Pressable >
        );
    };

    if (isLoading) {
        return (
            <Box className="flex-1 p-4" style={{ backgroundColor: currentColors.background }}>
                <Box className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((index) => (
                        <Box
                            key={index}
                            className="p-4 rounded-xl"
                            style={{
                                backgroundColor: currentColors.surface.elevated,
                                borderWidth: 1,
                                borderColor: currentColors.neutral?.[200] ? `${currentColors.neutral[200]}20` : currentColors.border
                            }}
                        >
                            <Box className="flex flex-row justify-between items-start mb-3">
                                <Box className="flex-1 flex flex-row items-center gap-3">
                                    <Box
                                        className="w-10 h-10 rounded-lg"
                                        style={{
                                            backgroundColor: currentColors.neutral?.[200] ? currentColors.neutral[200] + '40' : currentColors.surface.card,
                                            opacity: 0.6
                                        }}
                                    />
                                    <Box className="flex-1">
                                        <Box
                                            className="h-5 rounded mb-2"
                                            style={{
                                                backgroundColor: currentColors.neutral?.[200] ? currentColors.neutral[200] + '40' : currentColors.surface.card,
                                                width: '70%',
                                                opacity: 0.6
                                            }}
                                        />
                                        <Box
                                            className="h-4 rounded"
                                            style={{
                                                backgroundColor: currentColors.neutral?.[200] ? currentColors.neutral[200] + '40' : currentColors.surface.card,
                                                width: '40%',
                                                opacity: 0.6
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    className="h-6 rounded-md"
                                    style={{
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 80,
                                        opacity: 0.6
                                    }}
                                />
                            </Box>
                            <Box className="flex flex-row items-center gap-4">
                                <Box
                                    className="h-4 rounded"
                                    style={{
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 120,
                                        opacity: 0.6
                                    }}
                                />
                                <Box
                                    className="h-4 rounded"
                                    style={{
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 80,
                                        opacity: 0.6
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex-1 p-4" style={{ backgroundColor: currentColors.background }}>
                <Box className="items-center justify-center py-16">
                    <Text className="text-lg mb-4" style={{ color: currentColors.error.main }}>Failed to load sessions</Text>
                    <Pressable
                        onPress={() => refetch()}
                        className="px-6 py-3 rounded-lg"
                        style={{ backgroundColor: currentColors.primary[500] }}
                    >
                        <Text style={{ color: currentColors.white }}>Retry</Text>
                    </Pressable>
                </Box>
            </Box>
        );
    }

    // Group sessions by date
    const groupedSessions = sessions.reduce((groups: any, session: any) => {
        const date = new Date(session.startTime).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(session);
        return groups;
    }, {});


    return (
        <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
            {/* Claim All Button */}
            {claimableCount > 0 && onNavigateToSuccess && (
                <Box className="mb-4 mx-4 rounded-xl overflow-hidden" style={{ position: 'relative' }}>
                    <Gradient 
                        className='p-[1px]'
                        colors={[currentColors.pop.indigo, currentColors.pop.violet, currentColors.pop.purple, currentColors.pop.magenta, currentColors.pop.red]}
                    >
                        <Box className='absolute inset-[1px] rounded-xl overflow-hidden' style={{ backgroundColor: currentColors.background }}>
                            <Gradient 
                                className="absolute inset-0 opacity-30" 
                                colors={[currentColors.secondary[900], currentColors.secondary[800], currentColors.secondary[500]]}
                            />
                        </Box>
                        <Pressable
                            onPress={() => onNavigateToSuccess(undefined, 'multiple')}
                            className="px-5 py-3 flex flex-row items-center justify-between"
                        >
                            <Box className="flex-1">
                                <Text className="text-lg font-bold" style={{ color: currentColors.text.main }}>
                                    Claim All Rewards
                                </Text>
                                <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                    {claimableCount} reward{claimableCount > 1 ? 's' : ''} ready • Tap to claim
                                </Text>
                            </Box>
                            <Box
                                className="px-3 py-1.5 rounded-full flex flex-row items-center gap-1.5"
                                style={{ 
                                    backgroundColor: currentColors.secondary[900],
                                }}
                            >
                                <SolIcon size={16} color="white" />
                                <Text className="text-sm font-semibold" style={{ color: "white" }}>
                                    Claim
                                </Text>
                                <ChevronIcon direction="right" size={20} color="white" />
                            </Box>
                        </Pressable>
                    </Gradient>
                </Box>
            )}
            <ScrollView
                className="flex-1"
                contentContainerClassName="flex flex-col justify-start"
                showsVerticalScrollIndicator={false}
            >


                {sessions.length === 0 ? (
                    <Box className="items-center justify-center py-16 px-4">
                        <Text className="text-4xl mb-4">📚</Text>
                        <Text className="text-lg font-medium mb-2" style={{ color: currentColors.text.main }}>
                            No sessions yet
                        </Text>
                        <Text className="text-sm text-center" style={{ color: currentColors.text.soft }}>
                            Complete a focus session or routine to see it here
                        </Text>
                    </Box>
                ) : (
                    Object.entries(groupedSessions).map(([date, dateSessions]: any) => (
                        <Box key={date} className="mb-6">
                            <Text className="text-sm font-medium mb-3 px-4 text-left" style={{ color: currentColors.text.soft }}>
                                {date}
                            </Text>
                            {dateSessions.map((session: any) => (
                                <SessionCard key={session.id} session={session} />
                            ))}
                        </Box>
                    ))
                )}
            </ScrollView>
        </Box>
    );
}