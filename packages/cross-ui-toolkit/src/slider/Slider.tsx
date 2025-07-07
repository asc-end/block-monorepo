import React, { useState, useRef, useEffect } from 'react';
import { Box } from '../box/Box';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';
import { getSliderColors } from '.';

export interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    minTrackTintColor?: string;
    maxTrackTintColor?: string;
    thumbTintColor?: string;
    showLabels?: boolean;
    minLabel?: string;
    maxLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
    value: initialValue,
    onValueChange,
    min = 0,
    max = 100,
    step = 0.1,
    minTrackTintColor,
    maxTrackTintColor,
    thumbTintColor,
    showLabels = true,
    minLabel = 'Min',
    maxLabel = 'Max',
    className = '',
    style,
}) => {
    const { currentColors } = useTheme();
    const sliderColors = getSliderColors(currentColors);
    
    const finalMinTrackColor = minTrackTintColor || sliderColors.minTrackTintColor;
    const finalMaxTrackColor = maxTrackTintColor || sliderColors.maxTrackTintColor;
    const finalThumbColor = thumbTintColor || sliderColors.thumbTintColor;
    const [value, setValue] = useState(initialValue);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newValue = Number(e.target.value);
        setValue(newValue);
        onValueChange?.(newValue);
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <Box className={`flex flex-col gap-2 ${className}`} style={style}>
            <Box className="relative w-full">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, ${finalMinTrackColor} ${percentage}%, ${finalMaxTrackColor} ${percentage}%)`,
                        accentColor: finalThumbColor,
                    }}
                />
                {showLabels && (
                    <Box className="absolute -top-6 left-0 right-0 flex justify-between">
                        <Text variant="caption" className="text-text-soft">{minLabel}</Text>
                        <Text variant="caption" className="text-text-soft">{maxLabel}</Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
