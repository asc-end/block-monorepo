import { StyleSheet, View } from 'react-native';
import RNSlider from '@react-native-community/slider';
import { Text } from '../text/Text';
import { useTheme } from '../theme/context';
import { getSliderColors } from './';

export interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
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

export function Slider(props: SliderProps) {
    const { value: propValue, onValueChange, onSlidingComplete, min = 0, max = 100, step = 0.1, minTrackTintColor, maxTrackTintColor, thumbTintColor, showLabels = true, minLabel = 'Min', maxLabel = 'Max', className, style } = props
    const { currentColors } = useTheme();
    const sliderColors = getSliderColors(currentColors);

    const finalMinTrackColor = minTrackTintColor || sliderColors.minTrackTintColor;
    const finalMaxTrackColor = maxTrackTintColor || sliderColors.maxTrackTintColor;
    const finalThumbColor = thumbTintColor || sliderColors.thumbTintColor;

    const handleChange = (v: number) => {
        onValueChange?.(v);
    };
    
    const handleSlidingComplete = (v: number) => {
        onSlidingComplete?.(v);
    };

    return (
        <View className={className}>
            <RNSlider
                style={[styles.slider, style]}
                minimumValue={min}
                maximumValue={max}
                step={step}
                value={propValue}
                onValueChange={handleChange}
                onSlidingComplete={handleSlidingComplete}
                minimumTrackTintColor={finalMinTrackColor}
                maximumTrackTintColor={finalMaxTrackColor}
                thumbTintColor={finalThumbColor}
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