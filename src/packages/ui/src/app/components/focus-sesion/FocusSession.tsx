import { ChevronIcon } from '../../icons/ChevronIcon';
import { PlayIcon } from '../../icons/PlayIcon';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useTheme, Pressable, Box, Text, Button, Alert, Drawer, useAlert } from '@blockit/cross-ui-toolkit';
import { useAuthStore, api } from '../../../stores/authStore';
import { Timer } from '../Timer';
import { useWebSocket } from '../../../hooks/useWebsocket';
import type { FocusSession } from '@blockit/shared';

export default function FocusSession() {
    const { currentColors } = useTheme();
    const [duration, setDuration] = useState(30);
    const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const durationModalRef = useRef<any>(null);
    const { visible, options, show, hide } = useAlert();
    const { token } = useAuthStore();

    api().get('/focus-session').then(res => {
        console.log("activeSession", res.data)
    })

    useWebSocket({
        onFocusSessionUpdate: (session, action) => setActiveSession(action === 'created' ? session : null)
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
        } catch {
            setActiveSession(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSession = async (action: 'start' | 'end' | 'complete') => {
        if (!token) return showError("You must be logged in.");

        try {
            if (action === 'start') {
                const { data } = await api().post('/focus-session', { duration, notes: 'Focus session started' });
                setActiveSession(data);
            } else if (activeSession) {
                await api().post(`/focus-session/${activeSession.id}/${action === 'end' ? 'disable' : 'complete'}`, {});
                setActiveSession(null);
                if (action === 'complete') {
                    show({ title: "Congratulations!", message: "Focus session completed!", buttons: [{ text: "Great!" }] });
                }
            }
        } catch (error) {
            console.log(error)
            showError(`Failed to ${action} focus session.`);
        }
    };

    const confirmEnd = () => show({
        title: "Stop Focus Session",
        message: "Are you sure? You'll lose your progress.",
        buttons: [
            { text: "Cancel", style: "cancel" },
            { text: "Stop", style: "destructive", onPress: () => handleSession('end') }
        ]
    });

    return (
        <Fragment>
            <Box style={{ backgroundColor: currentColors.surface.card, gap: 6 }} className='w-full p-4 flex flex-col rounded-2xl'>
                <Text variant='h5' className='text-start w-full'>Focus Session</Text>

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
                        title={activeSession ? 'Give up' : 'Start'}
                        leftIcon={activeSession ? 
                            <Box className="w-[18px] h-[18px] bg-white rounded-[2px]" /> :
                            <PlayIcon size={18} color="white" />
                        }
                        onPress={activeSession ? confirmEnd : () => handleSession('start')}
                        variant="primary"
                        style={activeSession ? {
                            backgroundColor: currentColors.error.main,
                            borderColor: currentColors.error.dark,
                            shadowColor: currentColors.error.dark,
                        } : undefined}
                    />
                )}
            </Box>

            <Alert visible={visible} title={options.title} message={options.message} buttons={options.buttons} onDismiss={hide} />
            
            <Drawer ref={durationModalRef}>
                <Box style={{ backgroundColor: currentColors.surface.elevated }} className="p-4 rounded-t-xl">
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
        </Fragment>
    );
}