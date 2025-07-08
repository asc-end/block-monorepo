import { Box, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { memo, useEffect, useState } from "react";

interface TimerProps {
    duration: number;
    isActive: boolean;
    onComplete: () => void;
    startTime: string | null;
}

export const Timer = memo(({ duration, isActive, onComplete, startTime }: TimerProps) => {

    const [timeRemaining, setTimeRemaining] = useState(() => {
        if (!startTime) return duration * 60;
        const startTimeMs = new Date(startTime).getTime();
        const elapsedTime = Math.floor((Date.now() - startTimeMs) / 1000);
        return Math.max(0, (duration * 60) - elapsedTime);
    });

    useEffect(() => {
        if (!isActive || !startTime) return;

        // Update immediately
        const updateTime = () => {
            const startTimeMs = new Date(startTime).getTime();
            const elapsedTime = Math.floor((Date.now() - startTimeMs) / 1000);
            const remaining = Math.max(0, (duration * 60) - elapsedTime);
            setTimeRemaining(remaining);

            if (remaining <= 0) {
                onComplete();
            }
        };

        // Update immediately and then every second
        updateTime();
        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, [isActive, duration, onComplete, startTime]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box className='flex flex-row justify-between items-center'>
            <Text>
                {formatTime(timeRemaining)}
            </Text>
            <Text>
                {formatTime(duration * 60)}
            </Text>
        </Box>
    );
});