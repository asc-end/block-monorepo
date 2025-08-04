import { ChevronIcon } from '../../icons/ChevronIcon';
import { PlayIcon } from '../../icons/PlayIcon';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useTheme, Pressable, Box, Text, Button, Alert, Drawer, useAlert, NumberInput } from '@blockit/cross-ui-toolkit';
import { useAuthStore, api } from '../../../stores/authStore';
import { Timer } from '../Timer';
import { useWebSocket } from '../../../hooks/useWebsocket';
import type { FocusSession } from '@blockit/shared';
import { createCommitmentWithRetry } from '@blockit/shared';
import { SolIcon } from '../../icons/SolIcon';
import { useUser } from '../../../hooks';
import { Connection } from '@solana/web3.js';

interface PermissionStatus {
    usageStatsGranted: boolean;
    overlayGranted: boolean;
    notificationListenerGranted?: boolean;
    notificationBlockingEnabled?: boolean;
}

interface NativeAppBlocking {
    hasPermissions: boolean;
    permissionsStatus: PermissionStatus;
    requestPermissions: () => Promise<boolean>;
    startBlocking: () => Promise<void>;
    stopBlocking: () => Promise<void>;
    refreshPermissions?: () => Promise<void>;
}

interface FocusSessionProps {
    nativeAppBlocking?: NativeAppBlocking;
    sendTransaction?: (tx: any) => Promise<{ signature: string } | null>;
    onNavigateToSuccess?: (sessionId: string) => void;
    onNavigateToLose?: (sessionId: string) => void;
}

export function FocusSession({ nativeAppBlocking, sendTransaction, onNavigateToSuccess, onNavigateToLose }: FocusSessionProps) {
    const { currentColors } = useTheme();
    const [duration, setDuration] = useState(30);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const durationModalRef = useRef<any>(null);
    const stakeModalRef = useRef<any>(null);
    const { visible, options, show, hide } = useAlert();
    const { user } = useUser();
    const { token } = useAuthStore();

    useWebSocket({
        onFocusSessionUpdate: async (session, action) => {

            if (action === 'created') {
                setActiveSession(session);
                // Start native blocking if available
                await nativeAppBlocking?.startBlocking();
            } else if (action === 'disabled' || action === 'completed') {
                setActiveSession(null);
                // Stop native blocking if available
                await nativeAppBlocking?.stopBlocking();
            }
        }
    });

    useEffect(() => {
        if (token) loadSession();
    }, [token]);

    const showError = (message: string) => show({ title: "Error", message, buttons: [{ text: "OK" }] });

    const loadSession = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const { data } = await api().get('/focus-session/active');
            setActiveSession(data);

            // If there's an active session, start native blocking
            if (data) {
                await nativeAppBlocking?.startBlocking();
            }
        } catch {
            setActiveSession(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSession = async (action: 'start' | 'end' | 'complete') => {
        if (!token) return showError("You must be logged in.");
        if (action === 'start' && stakeAmount > 0 && !user?.walletAddress) {
            return showError("Please connect your wallet to stake SOL.");
        }

        try {
            if (action === 'start') {
                setIsCreating(true);
                setActiveSession(null)
                
                let sessionData: any = { duration, notes: 'Focus session started' };
                
                // If there's a stake amount, create the on-chain commitment FIRST
                if (stakeAmount > 0 && user?.walletAddress && sendTransaction) {
                    try {
                        // Calculate unlock time (current time + duration in minutes)
                        const unlockTime = new Date(Date.now() + duration * 60 * 1000);

                        const result = await createCommitmentWithRetry(user.walletAddress, stakeAmount, unlockTime);
                        const signature = await sendTransaction(result.tx);
                        console.log(signature)
                        if (!signature) throw new Error("Failed to create commitment");

                        // Add commitment data to session creation
                        sessionData.commitment = {
                            commitmentId: result.id.toString(),
                            amount: stakeAmount, // Send as SOL, API will convert to lamports
                            unlockTime: unlockTime.toISOString(),
                            signature: signature.signature
                        };
                    } catch (commitmentError) {
                        throw commitmentError;
                    }
                }
                
                // Now create the session (with commitment data if applicable)
                const { data } = await api().post('/focus-session', sessionData);
                
                setActiveSession(data)
                // The WebSocket will handle setting the active session
                // Don't set it here to avoid race conditions
                setStakeAmount(0); // Reset stake amount
            } else if (activeSession) {
                await api().post(`/focus-session/${activeSession.id}/${action === 'end' ? 'disable' : 'complete'}`, {});
                const sessionId = activeSession.id;
                setActiveSession(null);
                if (action === 'complete') {
                    if (onNavigateToSuccess) {
                        onNavigateToSuccess(sessionId);
                    } else {
                        show({ title: "Congratulations!", message: "Focus session completed!", buttons: [{ text: "Great!" }] });
                    }
                }
            }
        } catch (error) {
            showError(`Failed to ${action} focus session.`);
        } finally {
            setIsCreating(false);
        }
    };

    const confirmEnd = () => show({
        title: "Stop Focus Session",
        message: "Are you sure? You'll lose your progress.",
        buttons: [
            { text: "Cancel", style: "cancel" },
            {
                text: "Stop", style: "destructive", onPress: async () => {
                    // If there's a commitment and onNavigateToLose is provided, navigate to lose screen
                    if (activeSession?.commitment && onNavigateToLose) {
                        handleSession("end")
                        onNavigateToLose(activeSession.id);
                    } else {
                        await handleSession('end');
                    }
                }
            }
        ]
    });

    // Show permission request UI if needed (when native blocking is available but permissions not granted)
    if (activeSession && nativeAppBlocking && !nativeAppBlocking.hasPermissions) {
        return (
            <Fragment>
                <Box style={{ backgroundColor: currentColors.surface.card, gap: 6 }} className='w-full p-4 flex flex-col rounded-2xl'>
                    <Box className='flex flex-row justify-between items-center'>
                        <Text variant='h5'>Focus Session</Text>
                        {(!activeSession || (activeSession && activeSession.commitment && activeSession.commitment.amount)) && (
                            <Pressable
                                onPress={() => stakeModalRef.current?.open()}
                                className='flex flex-row items-center gap-1 px-3 py-1 rounded-full'
                                style={{ backgroundColor: stakeAmount && !activeSession ? currentColors.primary[200] : currentColors.neutral[200] }}
                            >
                                <SolIcon size={16} color={stakeAmount > 0 ? currentColors.primary[500] : currentColors.text.soft} />
                                <Text variant='caption' style={{ color: stakeAmount > 0 ? currentColors.primary[500] : currentColors.text.soft }}>
                                    {stakeAmount > 0 ? `${stakeAmount} SOL` : 'Stake'}
                                </Text>
                            </Pressable>
                        )}
                    </Box>

                    <Box style={{ backgroundColor: currentColors.warning?.light || '#fff3cd' }} className='p-4 rounded-xl'>
                        <Text variant='h6' className='mb-2'>🔒 Permissions Required</Text>
                        <Text variant='body' className='mb-3'>
                            To block distracting apps during your focus session, we need:
                        </Text>
                        <Box className='mb-4'>
                            <Text variant='caption' className='mb-1'>
                                • Usage Stats Access: {nativeAppBlocking.permissionsStatus.usageStatsGranted ? '✅' : '❌'}
                            </Text>
                            <Text variant='caption' className='mb-1'>
                                • Display Over Apps: {nativeAppBlocking.permissionsStatus.overlayGranted ? '✅' : '❌'}
                            </Text>
                        </Box>
                        <Box className="flex flex-row gap-2">
                            <Button
                                title="Grant Permissions"
                                variant="primary"
                                style={{ flex: 1 }}
                                onPress={async () => {
                                    const granted = await nativeAppBlocking.requestPermissions();
                                    if (!granted) {
                                        show({
                                            title: 'Permissions Required',
                                            message: 'Please grant all permissions to enable app blocking during focus sessions.',
                                            buttons: [{ text: 'OK' }]
                                        });
                                    }
                                }}
                            />
                            {nativeAppBlocking.refreshPermissions && (
                                <Button
                                    title="🔄"
                                    variant="outline"
                                    style={{ width: 50 }}
                                    onPress={nativeAppBlocking.refreshPermissions}
                                />
                            )}
                        </Box>
                    </Box>

                    {!isLoading && activeSession && (
                        <>
                            <Timer
                                duration={activeSession.duration}
                                isActive={!!activeSession}
                                onComplete={() => handleSession('complete')}
                                startTime={new Date(activeSession.startTime).toISOString()}
                            />
                            {activeSession.commitment && (
                                <Box className="flex flex-row items-center justify-center gap-2 mt-2 p-2 rounded-lg" style={{ backgroundColor: currentColors.neutral[100] }}>
                                    <SolIcon size={18} color={currentColors.primary[500]} />
                                    <Text variant="caption" style={{ color: currentColors.text.main }}>
                                        {(parseFloat(activeSession.commitment.amount) / 1e9).toFixed(2)} SOL staked
                                    </Text>
                                </Box>
                            )}
                        </>
                    )}

                    {!isLoading && (
                        <Button
                            title={activeSession ? 'Give up' : isCreating ? 'Creating...' : 'Start'}
                            leftIcon={activeSession ?
                                <Box className="w-[18px] h-[18px] bg-white rounded-[2px]" /> :
                                !isCreating ? <PlayIcon size={18} color="white" /> : undefined
                            }
                            onPress={activeSession ? confirmEnd : () => handleSession('start')}
                            variant={activeSession ? "destructive" : "primary"}
                            disabled={isCreating || (!activeSession && stakeAmount > 0 && !user?.walletAddress)}
                        />
                    )}
                </Box>

                <Alert visible={visible} title={options.title} message={options.message} buttons={options.buttons} onDismiss={hide} />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Box style={{ backgroundColor: currentColors.surface.card, gap: 6 }} className='w-full p-4 flex flex-col rounded-2xl'>
                <Box className='flex flex-row justify-between items-center'>
                    <Text variant='h5'>Focus Session</Text>
                    {(!activeSession || activeSession.status && stakeAmount) && (
                        <Pressable
                            onPress={() => stakeModalRef.current?.open()}
                            className='flex flex-row items-center gap-1 px-3 py-1 rounded-full'
                            style={{ backgroundColor: stakeAmount > 0 ? currentColors.primary[200] : currentColors.neutral[200] }}
                        >
                            <SolIcon size={16} color={stakeAmount > 0 ? currentColors.primary[500] : currentColors.text.soft} />
                            <Text variant='caption' style={{ color: stakeAmount > 0 ? currentColors.primary[500] : currentColors.text.soft }}>
                                {stakeAmount > 0 ? `${stakeAmount} SOL` : 'Stake'}
                            </Text>
                        </Pressable>
                    )}
                    {(activeSession && activeSession.commitment && activeSession.commitment.amount) && (
                        <Box
                            className='flex flex-row items-center gap-1 px-3 py-1 rounded-full'
                            style={{ backgroundColor: currentColors.neutral[200] }}
                        >
                            <SolIcon size={16} color={currentColors.text.soft} />
                            <Text variant='caption' style={{ color: currentColors.text.soft }}>
                                {`${(parseFloat(activeSession.commitment.amount) / 1e9).toFixed(2)} SOL`}
                            </Text>
                        </Box>
                    )}

                </Box>

                {isLoading ? (
                    <>
                        <Box
                            style={{ backgroundColor: currentColors.neutral[300], opacity: 0.5 }}
                            className='w-full p-4 rounded-xl flex flex-row justify-between items-center animate-pulse'
                        >
                            <Box style={{ backgroundColor: currentColors.neutral[400] }} className='h-5 w-16 rounded' />
                            <Box className='flex flex-row items-center gap-1'>
                                <Box style={{ backgroundColor: currentColors.neutral[400] }} className='h-5 w-12 rounded' />
                            </Box>
                        </Box>
                        <Box
                            style={{ backgroundColor: currentColors.neutral[300], opacity: 0.5 }}
                            className='w-full h-12 rounded-xl animate-pulse'
                        />
                    </>
                ) : !activeSession ? (
                    <Pressable
                        style={{ backgroundColor: currentColors.neutral[300] }}
                        className='w-full p-4 rounded-xl flex flex-row justify-between items-center'
                        onPress={() => durationModalRef.current?.open()}
                    >
                        <Text>Duration</Text>
                        <Box className='flex flex-row items-center gap-1'>
                            <Text>{duration} min</Text>
                            <ChevronIcon color={currentColors.text.soft} />
                        </Box>
                    </Pressable>
                ) : null}

                {!isLoading && activeSession && (
                    <Timer
                        duration={activeSession.duration}
                        isActive={!!activeSession}
                        onComplete={() => handleSession('complete')}
                        startTime={new Date(activeSession.startTime).toISOString()}
                    />
                )}

                {!isLoading && (
                    <Button
                        title={activeSession ? 'Give up' : isCreating ? 'Creating...' : 'Start'}
                        leftIcon={activeSession ?
                            <Box className="w-[18px] h-[18px] bg-white rounded-[2px]" /> :
                            !isCreating ? <PlayIcon size={18} color="white" /> : undefined
                        }
                        loading={isCreating}
                        onPress={activeSession ? confirmEnd : () => handleSession('start')}
                        variant={activeSession ? "destructive" : "primary"}
                        disabled={isCreating || (!activeSession && stakeAmount > 0 && !user?.walletAddress)}
                    />
                )}

            </Box>

            <Alert visible={visible} title={options.title} message={options.message} buttons={options.buttons} onDismiss={hide} />

            <Drawer ref={durationModalRef}>
                <Box className="p-4 rounded-t-xl">
                    <Text variant="h6" className="mb-2">⏰ Set Focus Duration</Text>
                    <Text variant="body" style={{ color: currentColors.text.soft }} className="mb-4">
                        Choose how long you want your focus session to last.
                    </Text>
                    <Box className="flex flex-row items-center justify-center mb-4">
                        <Button title="-" variant="outline" size="sm" style={{ width: 40, marginRight: 12 }}
                            onPress={() => duration > 5 && setDuration(duration - 5)} />
                        <Text variant="h4" className="mx-2 min-w-[60px] text-center">{duration} min</Text>
                        <Button title="+" variant="outline" size="sm" style={{ width: 40, marginLeft: 12 }}
                            onPress={() => duration < 180 && setDuration(duration + 5)} />
                    </Box>
                    <Button title="Set Duration" variant="primary" onPress={() => durationModalRef.current?.close()} />
                </Box>
            </Drawer>

            <Drawer ref={stakeModalRef}>
                <Box className="p-4 rounded-t-xl">
                    <Box className="flex flex-row items-center gap-2 mb-2">
                        <SolIcon size={24} color={currentColors.primary[500]} />
                        <Text variant="h6">Set Stake Amount</Text>
                    </Box>
                    <Text variant="body" style={{ color: currentColors.text.soft }} className="mb-4">
                        Stake SOL to commit to completing your focus session. If you give up, your stake will be forfeited.
                    </Text>
                    <Box className="mb-4">
                        <NumberInput
                            value={stakeAmount}
                            onChangeNumber={(value) => setStakeAmount(value || 0)}
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
                                    style={{ backgroundColor: stakeAmount === preset ? currentColors.neutral[500] : currentColors.neutral[200] }}
                                    onPress={() => setStakeAmount(preset)}
                                >

                                    <Text variant="body" style={{ color: currentColors.text.soft }}>
                                        {preset} SOL
                                    </Text>
                                </Pressable>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Fragment>
    );
}