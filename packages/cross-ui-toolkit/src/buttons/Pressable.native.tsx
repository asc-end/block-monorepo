import React from 'react';
import { Pressable as RNPressable, ViewStyle, TextStyle, StyleProp } from 'react-native';

export interface PressableComponentProps {
    className?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    disabled?: boolean;
    hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number };
    testID?: string;
    accessibilityLabel?: string;
    accessibilityRole?: string;
}

export function Pressable({ className, children, style, onPress, disabled, ...props }: PressableComponentProps) {
    return (
        <RNPressable 
            style={style}
            onPress={onPress}
            disabled={disabled}
            className={className}
            {...props}
        >
            {children}
        </RNPressable>
    );
}
