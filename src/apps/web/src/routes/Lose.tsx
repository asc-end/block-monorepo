import { Box, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { SimpleEye, useAuthStore, api } from "@blockit/ui";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface ForfeitResults {
    results?: {
        focusSessions?: {
            forfeited: number;
            totalAmount?: number;
        };
        routines?: {
            forfeited: number;
            totalAmount?: number;
        };
    };
}

export function LoseScreen() {
    const { currentColors } = useTheme();
    const [forfeiting, setForfeiting] = useState(false);
    const [forfeitResults, setForfeitResults] = useState<ForfeitResults | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { user, ready, getAccessToken } = usePrivy();
    const { setToken } = useAuthStore();

    useEffect(() => {
        if (ready && user) {
            forfeitAll();
        }
    }, [ready, user]);

    const forfeitAll = async () => {
        try {
            setForfeiting(true);
            setError(null);

            const freshToken = await getAccessToken();
            if (freshToken) {
                setToken(freshToken);
            }

            const response = await api().post<ForfeitResults>('/forfeit-all', {});
            setForfeitResults(response.data);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to forfeit sessions';

            if (error && typeof error === 'object' && 'response' in error) {
                const apiError = error as { response?: { data?: { message?: string; error?: string } } };
                setError(
                    apiError.response?.data?.message ||
                    apiError.response?.data?.error ||
                    errorMessage
                );
            } else {
                setError(errorMessage);
            }
        } finally {
            setForfeiting(false);
        }
    };

    const totalForfeited = (forfeitResults?.results?.focusSessions?.forfeited || 0) +
        (forfeitResults?.results?.routines?.forfeited || 0);
    const totalAmount = totalForfeited * 0.5; // 0.5 SOL per forfeited item

    return (
        <Box
            className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden"
        >
            <Box
                className="absolute inset-0 opacity-5"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${currentColors.primary[500]}40 0%, transparent 50%)`,
                    animation: 'pulse 4s ease-in-out infinite'
                }}
            />

            {/* Forfeit Status Dashboard */}
            {forfeitResults && !forfeiting && totalForfeited > 0 ? <Box
                className="fixed top-12 right-12 animate-fadeIn"
            >
                <Box className="space-y-4">
                    {(forfeitResults?.results?.focusSessions?.forfeited || 0) > 0 && (
                        <Box
                            className="p-3 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, #0D111D 0%, #15192D 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <Box className="flex justify-between items-start">
                                <Box>
                                    <Text className="text-xs opacity-60" style={{ color: '#C0C0C0' }}>
                                        Focus Sessions
                                    </Text>
                                    <Text className="font-clash text-xl font-bold mt-1" style={{ color: '#F0F0F0' }}>
                                        {forfeitResults?.results.focusSessions.forfeited}
                                    </Text>
                                </Box>
                                <Box className="text-right">
                                    <Text className="text-xs opacity-60" style={{ color: '#C0C0C0' }}>
                                        Value Lost
                                    </Text>
                                    <Text className="text-sm font-bold mt-1 font-clash" style={{ color: '#F20061' }}>
                                        0.5 SOL
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {(forfeitResults?.results?.routines?.forfeited || 0) > 0 && (
                        <Box
                            className="p-3 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, #0D111D 0%, #15192D 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <Box className="flex justify-between items-start">
                                <Box>
                                    <Text className="text-xs opacity-60" style={{ color: '#C0C0C0' }}>
                                        Routines
                                    </Text>
                                    <Text className="font-clash text-xl font-bold mt-1" style={{ color: '#F0F0F0' }}>
                                        {forfeitResults?.results.routines.forfeited}
                                    </Text>
                                </Box>
                                <Box className="text-right">
                                    <Text className="text-xs opacity-60" style={{ color: '#C0C0C0' }}>
                                        Value Lost
                                    </Text>
                                    <Text className="font-mono text-sm font-bold mt-1" style={{ color: '#F20061' }}>
                                        -0.5 SOL
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box
                    className="mt-5 p-4 rounded-lg"
                    style={{
                        background: 'linear-gradient(135deg, rgba(242, 0, 97, 0.1) 0%, rgba(242, 0, 97, 0.05) 100%)',
                        border: '1px solid rgba(242, 0, 97, 0.2)'
                    }}
                >
                    <Box className="flex justify-between items-center gap-4">
                        <Text className="text-xs font-medium" style={{ color: '#C0C0C0' }}>
                            TOTAL LIQUIDATED
                        </Text>
                        <Box className="flex items-baseline gap-1">
                            <Text className="font-clash text-2xl font-black" style={{ color: '#F20061' }}>
                                {totalAmount.toFixed(1)}
                            </Text>
                            <Text className="text-xs font-medium" style={{ color: '#F20061' }}>
                                SOL
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box> : null
            }
            {/* center flex */}
            <Box className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <Box
                    className="mb-8 transition-all duration-1000"
                    style={{
                        transform: forfeiting ? 'scale(1.05)' : 'scale(1)',
                        opacity: forfeiting ? 0.8 : 1
                    }}
                >
                    <SimpleEye />
                </Box>

                <Text
                    className="font-clash font-black text-center animate-fadeIn"
                    style={{
                        lineHeight: 1,
                        fontSize: "clamp(3.5rem, 10vw, 7rem)",
                        color: currentColors.text.main,
                        letterSpacing: '-0.03em'
                    }}
                >
                    I SEE YOU
                </Text>

                <Text
                    className="font-clash text-xl text-center mb-16 -mt-8 max-w-lg animate-fadeIn"
                    style={{
                        color: currentColors.text.soft,
                        animationDelay: '0.3s',
                        animationFillMode: 'both',
                        lineHeight: 1.4
                    }}
                >
                    You thought you could just walk away?
                </Text>

                <Box
                    className="flex flex-col items-center justify-center h-16"
                    style={{
                        opacity: forfeiting ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                    }}
                >
                    <Box className="flex gap-1.5 mb-3">
                        {[0, 1, 2].map((i) => (
                            <Box
                                key={i}
                                className="w-2 h-2 rounded-full animate-bounce"
                                style={{
                                    backgroundColor: currentColors.error.main,
                                    animationDelay: `${i * 0.15}s`
                                }}
                            />
                        ))}
                    </Box>
                    <Text
                        className="text-base"
                        style={{ color: currentColors.text.soft }}
                    >
                        Calculating losses...
                    </Text>
                </Box>

            </Box>

            {/* Fixed bottom status */}
            <Box
                className="fixed bottom-12 left-0 right-0 flex justify-center animate-fadeIn"
                style={{
                    animationDelay: '1s',
                    animationFillMode: 'both',
                    opacity: (forfeitResults && !forfeiting) ? 1 : 0,
                    pointerEvents: (forfeitResults && !forfeiting) ? 'auto' : 'none'
                }}
            >
                <Text
                    className="font-clash text-lg uppercase tracking-wider"
                    style={{
                        color: (forfeitResults && ((forfeitResults.results?.focusSessions?.forfeited || 0) === 0 &&
                            (forfeitResults.results?.routines?.forfeited || 0) === 0))
                            ? currentColors.text.soft
                            : currentColors.error.main
                    }}
                >
                    {(forfeitResults && ((forfeitResults.results?.focusSessions?.forfeited || 0) === 0 &&
                        (forfeitResults.results?.routines?.forfeited || 0) === 0))
                        ? 'No commitments lost'
                        : 'Commitments forfeited'}
                </Text>
            </Box>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.05;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.1;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }
            `}} />
        </Box>
    );
}