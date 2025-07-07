import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNSlider from '@react-native-community/slider';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';

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
    style?: any;
}

export function Slider({
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 0.1,
    minTrackTintColor = currentColors.primary[300],
    maxTrackTintColor = currentColors.neutral[200],
    thumbTintColor = currentColors.primary[300],
    showLabels = true,
    minLabel = 'Min',
    maxLabel = 'Max',
    className,
    style,
}: SliderProps) {
    const { currentColors } = useTheme();
    return (
        <View className={className}>
            <RNSlider
                style={[styles.slider, style]}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor={minTrackTintColor}
                maximumTrackTintColor={maxTrackTintColor}
                thumbTintColor={thumbTintColor}
            />
            {showLabels && (
                <View className="flex flex-row justify-between mt-1">
                    <Text variant="caption" className="text-text-soft">{minLabel}</Text>
                    <Text variant="caption" className="text-text-soft">{maxLabel}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    slider: {
        width: '100%',
        height: 40,
    },
}); 