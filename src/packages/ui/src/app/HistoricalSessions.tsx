import React from 'react';
import { Box, Text, ScrollView, useTheme, Pressable } from "@blockit/cross-ui-toolkit";
import { useHistoricalSessions } from "../hooks/useHistoricalSessions";
import { formatTime } from "../lib/time";
import { ChevronIcon } from "./icons/ChevronIcon";

interface HistoricalSessionsProps {
    onBack?: () => void;
}

export function HistoricalSessions({ onBack }: HistoricalSessionsProps) {
    const { currentColors } = useTheme();
    const { sessions, isLoading, error, refetch } = useHistoricalSessions();

    const SessionCard = ({ session }: { session: any }) => {
        const isRoutine = session.type === 'routine';
        const statusColor = session.status === 'completed' 
            ? currentColors.success.main 
            : currentColors.error.main;
        
        return (
            <Box 
                className="p-4 rounded-xl mb-3"
                style={{
                    backgroundColor: currentColors.surface.elevated,
                    borderWidth: 1,
                    borderColor: currentColors.neutral[200] + '20'
                }}
            >
                <Box className="flex flex-row justify-between items-start mb-3">
                    <Box className="flex-1 flex flex-row items-center gap-3">
                        <Box 
                            className="w-10 h-10 rounded-lg items-center justify-center"
                            style={{ 
                                backgroundColor: isRoutine 
                                    ? currentColors.primary[100] + '60'
                                    : currentColors.secondary[100] + '60'
                            }}
                        >
                            <Text className="text-lg">
                                {isRoutine ? (session.emoji || '🎯') : '🧘'}
                            </Text>
                        </Box>
                        <Box className="flex-1">
                            <Text className="font-semibold text-base" style={{ color: currentColors.text.main }}>
                                {session.name}
                            </Text>
                            <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                {isRoutine ? 'Routine' : 'Focus Session'}
                            </Text>
                        </Box>
                    </Box>
                    <Box 
                        className="px-3 py-1 rounded-md"
                        style={{ 
                            backgroundColor: statusColor + '20'
                        }}
                    >
                        <Text 
                            className="text-sm font-medium capitalize"
                            style={{ color: statusColor }}
                        >
                            {session.status}
                        </Text>
                    </Box>
                </Box>
                
                <Box className="flex flex-row items-center gap-4 flex-wrap">
                    <Box className="flex flex-row items-center gap-2">
                        <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                            📅
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                            {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </Box>
                    
                    {session.duration && (
                        <Box className="flex flex-row items-center gap-2">
                            <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                ⏱️
                            </Text>
                            <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                {session.duration} minutes
                            </Text>
                        </Box>
                    )}
                    
                    {session.stakeAmount && session.stakeAmount > 0 && (
                        <Box className="flex flex-row items-center gap-2">
                            <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                💰
                            </Text>
                            <Text className="text-sm" style={{ color: currentColors.text.soft }}>
                                ${session.stakeAmount} staked
                            </Text>
                        </Box>
                    )}
                </Box>
            </Box>
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
                                borderColor: currentColors.neutral[200] + '20'
                            }}
                        >
                            <Box className="flex flex-row justify-between items-start mb-3">
                                <Box className="flex-1 flex flex-row items-center gap-3">
                                    <Box 
                                        className="w-10 h-10 rounded-lg"
                                        style={{ 
                                            backgroundColor: currentColors.neutral[200] + '40',
                                            opacity: 0.6
                                        }}
                                    />
                                    <Box className="flex-1">
                                        <Box 
                                            className="h-5 rounded mb-2"
                                            style={{ 
                                                backgroundColor: currentColors.neutral[200] + '40',
                                                width: '70%',
                                                opacity: 0.6
                                            }}
                                        />
                                        <Box 
                                            className="h-4 rounded"
                                            style={{ 
                                                backgroundColor: currentColors.neutral[200] + '40',
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
            <ScrollView 
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
            >
                {sessions.length === 0 ? (
                    <Box className="items-center justify-center py-16">
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
                            <Text className="text-sm font-medium mb-3" style={{ color: currentColors.text.soft }}>
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