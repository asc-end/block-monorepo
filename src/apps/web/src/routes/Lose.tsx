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

    return (
        <Box className="flex flex-col items-center justify-center flex-1 p-8">
            <Box className="mb-8">
                <SimpleEye />
            </Box>
            
            <Text 
                className="font-clash font-semibold text-center mb-4" 
                style={{ 
                    lineHeight: 1, 
                    fontSize: "clamp(3rem, 10vw, 6rem)",
                    color: currentColors.text.main 
                }}
            >
                I see you
            </Text>
            
            <Text 
                className="font-clash text-xl text-center mb-8 max-w-md"
                style={{ color: currentColors.text.soft }}
            >
                You thought you could just get around by uninstalling?
            </Text>
            
            {forfeiting && (
                <Box className="flex items-center justify-center mb-4">
                    <Text className="font-clash animate-pulse">
                        Forfeiting your commitments...
                    </Text>
                </Box>
            )}
            
            {forfeitResults && !forfeiting && (
                <Box className="flex flex-col items-center mt-8">
                    {((forfeitResults.results?.focusSessions?.forfeited || 0) === 0 && 
                      (forfeitResults.results?.routines?.forfeited || 0) === 0) ? (
                        <Text 
                            className="font-clash"
                            style={{ color: currentColors.text.verySoft }}
                        >
                            Nothing lost, you're good for now
                        </Text>
                    ) : (
                        <>
                            <Text 
                                className="font-clash text-2xl mb-6"
                                style={{ color: currentColors.text.main }}
                            >
                                You lost:
                            </Text>
                            
                            <Box className="flex flex-row gap-8">
                                <Box className="text-center">
                                    <Text 
                                        className="font-clash text-5xl font-bold"
                                        style={{ color: currentColors.text.main }}
                                    >
                                        {forfeitResults.results?.focusSessions?.forfeited || 0}
                                    </Text>
                                    <Text 
                                        className="font-clash text-sm mt-1"
                                        style={{ color: currentColors.text.soft }}
                                    >
                                        focus {(forfeitResults.results?.focusSessions?.forfeited || 0) === 1 ? 'session' : 'sessions'}
                                    </Text>
                                    {forfeitResults.results?.focusSessions?.totalAmount ? (
                                        <Text 
                                            className="font-clash text-sm mt-1 font-semibold"
                                            style={{ color: currentColors.text.main }}
                                        >
                                            ${(forfeitResults.results.focusSessions.totalAmount / 1000000).toFixed(2)}
                                        </Text>
                                    ) : null}
                                </Box>
                                
                                <Box 
                                    className="w-px h-20 self-center"
                                    style={{ backgroundColor: currentColors.neutral[200] + '40' }}
                                />
                                
                                <Box className="text-center">
                                    <Text 
                                        className="font-clash text-5xl font-bold"
                                        style={{ color: currentColors.text.main }}
                                    >
                                        {forfeitResults.results?.routines?.forfeited || 0}
                                    </Text>
                                    <Text 
                                        className="font-clash text-sm mt-1"
                                        style={{ color: currentColors.text.soft }}
                                    >
                                        {(forfeitResults.results?.routines?.forfeited || 0) === 1 ? 'routine' : 'routines'}
                                    </Text>
                                    {forfeitResults.results?.routines?.totalAmount ? (
                                        <Text 
                                            className="font-clash text-sm mt-1 font-semibold"
                                            style={{ color: currentColors.text.main }}
                                        >
                                            ${(forfeitResults.results.routines.totalAmount / 1000000).toFixed(2)}
                                        </Text>
                                    ) : null}
                                </Box>
                            </Box>
                            
                            {((forfeitResults.results?.focusSessions?.totalAmount || 0) + (forfeitResults.results?.routines?.totalAmount || 0)) > 0 && (
                                <Box className="mt-8 text-center">
                                    <Text 
                                        className="font-clash text-4xl font-bold"
                                        style={{ color: currentColors.text.main }}
                                    >
                                        ${(((forfeitResults.results?.focusSessions?.totalAmount || 0) + (forfeitResults.results?.routines?.totalAmount || 0)) / 1000000).toFixed(2)}
                                    </Text>
                                    <Text 
                                        className="font-clash text-sm"
                                        style={{ color: currentColors.text.soft }}
                                    >
                                        total lost
                                    </Text>
                                </Box>
                            )}
                            
                            <Text 
                                className="font-clash text-lg mt-8"
                                style={{ color: currentColors.text.soft }}
                            >
                                Hope it was worth it.
                            </Text>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
}