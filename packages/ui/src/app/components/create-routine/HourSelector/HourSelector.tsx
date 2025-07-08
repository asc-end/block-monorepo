import React, { useState, useRef, useEffect } from 'react';
import { Box, Text } from '@blockit/cross-ui-toolkit';
import { HourSelectorProps } from './index';

export function HourSelector({ selectedHours, onHoursChange, currentColors }: HourSelectorProps) {
    const [isDragging, setIsDragging] = useState(false);
    const touchedHours = useRef(new Set<number>()).current;
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleHour = (hour: number) => {
        if (!touchedHours.has(hour)) {
            const newHours = selectedHours?.includes(hour)
                ? selectedHours.filter(h => h !== hour)
                : [...(selectedHours || []), hour];
            onHoursChange(newHours);
            touchedHours.add(hour);
        }
    };

    const clearTouchedHours = () => touchedHours.clear();

    const getHourFromElement = (element: HTMLElement): number => {
        const hourAttr = element.getAttribute('data-hour');
        return hourAttr ? parseInt(hourAttr, 10) : -1;
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.preventDefault();
        setIsDragging(true);
        clearTouchedHours();
        const hour = getHourFromElement(e.target as HTMLElement);
        if (hour !== -1) toggleHour(hour);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        const element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (element) {
            const hour = getHourFromElement(element);
            if (hour !== -1) toggleHour(hour);
        }
    };

    useEffect(() => {
        const handleGlobalPointerUp = () => {
            setIsDragging(false);
            clearTouchedHours();
        };

        document.addEventListener('pointerup', handleGlobalPointerUp);
        return () => {
            document.removeEventListener('pointerup', handleGlobalPointerUp);
        };
    }, []);

    const renderHourBlock = (hour: number, displayHour: string) => {
        const isSelected = selectedHours?.includes(hour) || false;
        const hourBlockStyle = {
            backgroundColor: isSelected ? currentColors.primary[500] + "30" : currentColors.white,
            borderColor: isSelected ? currentColors.primary[500] + "30" : currentColors.neutral[200],
            boxShadow: isSelected ? `0 2px 4px ${currentColors.primary[500]}30` : 'none',
            touchAction: 'none' as const,
        };

        return (
            <div
                key={hour}
                data-hour={hour}
                onPointerDown={handlePointerDown}
                className='select-none rounded-lg border-[1px] px-2 py-0.5 w-full cursor-pointer'
                style={hourBlockStyle}
            >
                <Text
                    style={{
                        color: isSelected ? currentColors.text.main : currentColors.text.soft,
                        fontSize: 12,
                        fontWeight: isSelected ? '600' : '500',
                        textAlign: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    {`${displayHour}:00`}
                </Text>
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-row"
            style={{ gap: 8, userSelect: 'none' }}
            onPointerMove={handlePointerMove}
        >
            <Box className="flex flex-col flex-1" style={{ gap: 1 }}>
                {Array.from({ length: 12 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return renderHourBlock(i, hour);
                })}
            </Box>
            <Box className="flex flex-col flex-1" style={{ gap: 1 }}>
                {Array.from({ length: 12 }, (_, i) => {
                    const hourIndex = i + 12;
                    const hour = hourIndex.toString().padStart(2, '0');
                    return renderHourBlock(hourIndex, hour);
                })}
            </Box>
        </div>
    );
}