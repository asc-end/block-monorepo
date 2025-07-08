import { ChevronIcon } from '../../icons/ChevronIcon';
import { PlayIcon } from '../../icons/PlayIcon';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useTheme, Pressable, Box, Text, Button, Alert, Drawer, useAlert } from '@blockit/cross-ui-toolkit';
import { useAuthStore } from '../../../stores/authStore';
import { Timer } from '../Timer';

// List of utility apps that should remain unblocked during focus sessions
export const UTILITY_APPS = [
    'phone',
    'messages',
    'contacts',
    'calendar',
    'clock',
    'calculator',
    'notes',
    'reminders',
    'health',
    'weather',
    'maps',
    'settings'
];

export interface InstalledApp {
    packageName: string;
    appName: string;
    iconUri?: string;
}

export default function FocusSession() {
    const { currentColors } = useTheme();
    const [duration, setDuration] = useState(30);
    const [activeSession, setActiveSession] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const durationModalRef = useRef<any>(null);
    const { visible, options, show, hide } = useAlert();
    const { token } = useAuthStore()

    useEffect(() => { if (token) getCurrentFocusSession() }, [token]);

    const handleStopFocus = () => {
        show({
            title: "Stop Focus Session",
            message: "Are you sure you want to stop your focus session? You'll lose your progress.",
            buttons: [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Stop",
                    style: "destructive",
                    onPress: () => handleEndFocusSession()
                }
            ]
        });
    };

    const getCurrentFocusSession = async () => {
        try {
        } catch (error) {
            console.error('Error fetching active focus session:', error);
        }
    };

    const handleBeginFocusSession = async () => {
        try {
            setActiveSession(true);
            setStartTime(new Date());
        } catch (error) {
            console.error('Error creating focus session:', error);
            show({
                title: "Error",
                message: "Failed to start focus session. Please try again.",
                buttons: [{ text: "OK" }]
            });
        }
    }

    const handleEndFocusSession = async () => {
        try {
            if (!activeSession) return
            setActiveSession(false);
        } catch (error) {
            console.error('Error ending focus session:', error);
            show({
                title: "Error",
                message: "Failed to end focus session. Please try again.",
                buttons: [{ text: "OK" }]
            });
        }
    }

    const handleCompleteFocusSession = async () => {
        try {
            if (!activeSession) return
            setActiveSession(false);

        } catch (error) {
            console.error('Error completing focus session:', error);
            show({
                title: "Error",
                message: "Failed to complete focus session. Please try again.",
                buttons: [{ text: "OK" }]
            });
        }
    }

    const toggleFocusSession = async () => {
        if (!activeSession)
            await handleBeginFocusSession();
        else
            await handleEndFocusSession();
    };

    return (
        <Fragment>
            <Box
                style={{
                    backgroundColor: currentColors.surface.card,
                    gap: 6
                }}
                className='w-full p-4 flex flex-col rounded-2xl'
            >
                <Box className='flex flex-row justify-between'>
                    <Text variant='h5'>
                        Focus Session
                    </Text>
                </Box>

                {!activeSession && (
                    <Pressable
                        style={{
                            backgroundColor: currentColors.neutral[300]
                        }}
                        className='w-full p-4 rounded-xl flex flex-row justify-between items-center'
                        onPress={() => durationModalRef.current?.open()}
                    >
                        <Text>Duration</Text>
                        <Box className='flex flex-row items-center gap-1'>
                            <Text>{duration} min</Text>
                            <ChevronIcon color={currentColors.text.soft} />
                        </Box>
                    </Pressable>
                )}

                {!!activeSession && (
                    <Timer
                        duration={duration}
                        isActive={!!activeSession}
                        onComplete={handleCompleteFocusSession}
                        startTime={startTime?.toISOString() || null}
                    />
                )}

                {!!activeSession ?
                    <Button
                        title={'Give up'}
                        leftIcon={<Box className="w-[18px] h-[18px] bg-white rounded-[2px]" />}
                        onPress={handleStopFocus}
                        variant="primary"
                        style={{
                            backgroundColor: currentColors.error.main,
                            borderColor: currentColors.error.dark,
                            shadowColor: currentColors.error.dark,
                            hoverColor: currentColors.error.dark,
                            activeColor: currentColors.error.dark
                        }} />
                    :
                    <Button
                        title={'Start'}
                        leftIcon={<PlayIcon size={18} color="white" />}
                        onPress={toggleFocusSession}
                        variant="primary"
                    />
                }
            </Box>

            <Alert
                visible={visible}
                title={options.title}
                message={options.message}
                buttons={options.buttons}
                onDismiss={hide}
            />
            <Drawer ref={durationModalRef}>
                <Box style={{ backgroundColor: currentColors.surface.elevated }} className="p-4 rounded-t-xl">
                    <Text variant="h6" className="mb-2">⏰ Set Focus Duration</Text>
                    <Text
                        variant="body"
                        style={{ color: currentColors.text.soft }}
                        className="mb-4"
                    >
                        Choose how long you want your focus session to last.
                    </Text>
                    <Box className="flex flex-row items-center justify-center mb-4">
                        <Button
                            title="-"
                            variant="outline"
                            size="sm"
                            style={{ width: 40, marginRight: 12 }}
                            onPress={() => {
                                if (duration > 5) {
                                    setDuration(duration - 5);
                                }
                            }}
                        />
                        <Text variant="h4" className="mx-2 min-w-[60px] text-center">
                            {duration} min
                        </Text>
                        <Button
                            title="+"
                            variant="outline"
                            size="sm"
                            style={{ width: 40, marginLeft: 12 }}
                            onPress={() => {
                                if (duration < 180) {
                                    setDuration(duration + 5);
                                }
                            }}
                        />
                    </Box>
                    <Button
                        title="Set Duration"
                        variant="primary"
                        onPress={() => {
                            durationModalRef.current?.close();
                        }}
                    />
                </Box>
            </Drawer>
        </Fragment>
    );
}