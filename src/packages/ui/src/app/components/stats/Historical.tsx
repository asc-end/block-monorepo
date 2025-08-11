import { Box, Text, ScrollView, useTheme, Pressable } from "@blockit/cross-ui-toolkit";
import { useHistoricalSessions } from "../../../hooks/useHistoricalSessions";
import { formatTime } from "../../../lib/time";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { FocusIcon } from "../../icons";

interface HistoricalProps {
    onSeeAll?: () => void;
}

export function Historical({ onSeeAll }: HistoricalProps) {
    const { currentColors } = useTheme();
    const { sessions, isLoading, error } = useHistoricalSessions();

    if (isLoading) {
        return (
            <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
                <Text className="text-base font-semibold mb-4" style={{ color: currentColors.text.main }}>
                    Historical Sessions
                </Text>
                <Box className="flex flex-col gap-3">
                    {[1, 2, 3].map((index) => (
                        <Box 
                            key={index}
                            className="p-3 rounded-xl"
                            style={{
                                backgroundColor: currentColors.surface.elevated,
                                borderWidth: 1,
                                borderColor: currentColors.neutral[200] + '20'
                            }}
                        >
                            <Box className="flex flex-row justify-between items-start mb-2">
                                <Box className="flex-1 flex flex-row items-center gap-2">
                                    <Box 
                                        className="w-8 h-8 rounded-lg"
                                        style={{ 
                                            backgroundColor: currentColors.neutral[200] + '40',
                                            opacity: 0.6
                                        }}
                                    />
                                    <Box className="flex-1">
                                        <Box 
                                            className="h-4 rounded mb-1"
                                            style={{ 
                                                backgroundColor: currentColors.neutral[200] + '40',
                                                width: '60%',
                                                opacity: 0.6
                                            }}
                                        />
                                        <Box 
                                            className="h-3 rounded"
                                            style={{ 
                                                backgroundColor: currentColors.neutral[200] + '40',
                                                width: '40%',
                                                opacity: 0.6
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box 
                                    className="h-5 rounded-md"
                                    style={{ 
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 60,
                                        opacity: 0.6
                                    }}
                                />
                            </Box>
                            
                            <Box className="flex flex-row items-center gap-4">
                                <Box 
                                    className="h-3 rounded"
                                    style={{ 
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 80,
                                        opacity: 0.6
                                    }}
                                />
                                <Box 
                                    className="h-3 rounded"
                                    style={{ 
                                        backgroundColor: currentColors.neutral[200] + '40',
                                        width: 60,
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
            <Box className="p-4 rounded-2xl" style={{ backgroundColor: currentColors.surface.card }}>
                <Text className="text-base font-semibold mb-4" style={{ color: currentColors.text.main }}>
                    Historical Sessions
                </Text>
                <Box className="items-center justify-center py-8">
                    <Text style={{ color: currentColors.error.main }}>Failed to load sessions</Text>
                </Box>
            </Box>
        );
    }

    return (
        <Box className="p-4 rounded-2xl flex-1" style={{ backgroundColor: currentColors.surface.card }}>
            <Box className="flex flex-row justify-between items-center mb-4 w-full">
                <Text className="text-base font-semibold" style={{ color: currentColors.text.main }}>
                    Historical Sessions
                </Text>
                {sessions.length > 0 && onSeeAll && (
                    <Pressable 
                        onPress={onSeeAll}
                        className="flex flex-row items-center gap-1 px-3 py-1 rounded-lg"
                    >
                        <Text className="text-sm">See all</Text>
                        <ChevronIcon direction="right" size={12} color={currentColors.text.main} />
                    </Pressable>
                )}
            </Box>
            
            {sessions.length === 0 ? (
                <Box className="items-center justify-center py-8">
                    <Text className="text-2xl mb-2">📚</Text>
                    <Text className="text-sm font-medium mb-1" style={{ color: currentColors.text.main }}>
                        No completed sessions yet
                    </Text>
                    <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                        Complete a focus session or routine to see it here
                    </Text>
                </Box>
            ) : (
                <Box className="flex flex-col gap-3 flex-1">
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        {sessions.slice(0, 5).map((session) => {
                            const isRoutine = session.type === 'routine';
                            const statusColor = session.status === 'completed' 
                                ? currentColors.success.main 
                                : currentColors.error.main;
                            
                            return (
                                <Box 
                                    key={session.id}
                                    className="p-3 rounded-xl mb-2"
                                    style={{
                                        backgroundColor: currentColors.surface.elevated,
                                        borderWidth: 1,
                                        borderColor: currentColors.neutral[200] + '20'
                                    }}
                                >
                                    <Box className="flex flex-row justify-between items-start mb-2">
                                        <Box className="flex-1 flex flex-row items-center gap-2">
                                            <Box 
                                                className="w-8 h-8 rounded-lg items-center justify-center"
                                                style={{ 
                                                    backgroundColor: isRoutine 
                                                        ? currentColors.primary[100] + '60'
                                                        : currentColors.secondary[100] + '60'
                                                }}
                                            >
                                                {isRoutine ? (
                                                    <Text className="text-sm">
                                                        {session.emoji || '🎯'}
                                                    </Text>
                                                ) : (
                                                    <FocusIcon size={18} color={currentColors.secondary[500]} />
                                                )}
                                            </Box>
                                            <Box className="flex-1">
                                                <Text className="font-medium text-sm" style={{ color: currentColors.text.main }}>
                                                    {session.name}
                                                </Text>
                                                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                    {isRoutine ? 'Routine' : 'Focus Session'}
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Box 
                                            className="px-2 py-1 rounded-md"
                                            style={{ 
                                                backgroundColor: statusColor + '20'
                                            }}
                                        >
                                            <Text 
                                                className="text-xs font-medium capitalize"
                                                style={{ color: statusColor }}
                                            >
                                                {session.status}
                                            </Text>
                                        </Box>
                                    </Box>
                                    
                                    <Box className="flex flex-row items-center gap-4">
                                        <Box className="flex flex-row items-center gap-1">
                                            <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                📅
                                            </Text>
                                            <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                {new Date(session.startTime).toLocaleDateString()}
                                            </Text>
                                        </Box>
                                        
                                        {session.duration && (
                                            <Box className="flex flex-row items-center gap-1">
                                                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                    ⏱️
                                                </Text>
                                                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                    {session.duration} min
                                                </Text>
                                            </Box>
                                        )}
                                        
                                        {session.stakeAmount && session.stakeAmount > 0 && (
                                            <Box className="flex flex-row items-center gap-1">
                                                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                    💰
                                                </Text>
                                                <Text className="text-xs" style={{ color: currentColors.text.soft }}>
                                                    ${session.stakeAmount}
                                                </Text>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}
                    </ScrollView>
                </Box>
            )}
        </Box>
    );
}