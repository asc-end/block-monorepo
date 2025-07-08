import React, { useRef } from 'react';
import { Box, Text } from '@blockit/cross-ui-toolkit';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { HourSelectorProps } from './index';

export function HourSelector({ selectedHours, onHoursChange, currentColors }: HourSelectorProps) {
    const touchedHours = useRef(new Set<number>()).current;

    const toggleHour = (hour: number) => {
        if (!touchedHours.has(hour)) {
            const newHours = selectedHours?.includes(hour)
                ? selectedHours.filter(h => h !== hour)
                : [...(selectedHours || []), hour];
            onHoursChange(newHours);
            touchedHours.add(hour);
        }
    };

    const clearTouchedHours = () => {
        touchedHours.clear();
    };

    const handleTap = (x: number, y: number) => {
        const column = x < 200 ? 0 : 1;
        const row = Math.floor(y / 44);
        if (row >= 0 && row < 12) {
            const hour = column === 0 ? row : row + 12;
            toggleHour(hour);
        }
    };

    const panGesture = Gesture.Pan()
        .onStart(() => {
            runOnJS(clearTouchedHours)();
        })
        .onUpdate((e) => {
            const { x, y } = e;
            const column = x < 200 ? 0 : 1;
            const row = Math.floor(y / 44);
            if (row >= 0 && row < 12) {
                const hour = column === 0 ? row : row + 12;
                runOnJS(toggleHour)(hour);
            }
        })
        .onFinalize(() => {
            runOnJS(clearTouchedHours)();
        });

    const tapGesture = Gesture.Tap()
        .onEnd((e) => {
            const { x, y } = e;
            runOnJS(handleTap)(x, y);
        });

    const composed = Gesture.Simultaneous(panGesture, tapGesture);

    const renderHourBlock = (hour: number, displayHour: string) => {
        const isSelected = selectedHours?.includes(hour) || false;
        const hourBlockStyle = {
            backgroundColor: isSelected ? currentColors.primary[500] + "30" : currentColors.white,
            borderColor: isSelected ? currentColors.primary[500] + "30" : currentColors.neutral[200],
            shadowColor: isSelected ? currentColors.primary[500] + "30" : 'transparent',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isSelected ? 0.2 : 0,
            shadowRadius: 4,
            elevation: isSelected ? 2 : 0,
        };

        return (
            <Box
                key={hour}
                className='select-none rounded-lg border p-2 h-10 w-full'
                style={hourBlockStyle}
            >
                <Text
                    style={{
                        color: isSelected ? currentColors.text.main : currentColors.text.soft,
                        fontSize: 14,
                        fontWeight: isSelected ? '600' : '500',
                        textAlign: 'center',
                    }}
                >
                    {`${displayHour}:00`}
                </Text>
            </Box>
        );
    };

    return (
        <GestureDetector gesture={composed}>
            <Box className="flex flex-row" style={{ gap: 8 }}>
                <Box className="flex flex-col flex-1" style={{ gap: 4 }}>
                    {Array.from({ length: 12 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return renderHourBlock(i, hour);
                    })}
                </Box>
                <Box className="flex flex-col flex-1" style={{ gap: 4 }}>
                    {Array.from({ length: 12 }, (_, i) => {
                        const hourIndex = i + 12;
                        const hour = hourIndex.toString().padStart(2, '0');
                        return renderHourBlock(hourIndex, hour);
                    })}
                </Box>
            </Box>
        </GestureDetector>
    );
}