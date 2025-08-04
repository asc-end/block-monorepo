import React from 'react';
import { Pressable as RNPressable, ViewStyle, TextStyle, StyleProp, AccessibilityRole } from 'react-native';

export interface PressableComponentProps {
    className?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    disabled?: boolean;
    hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number };
    testID?: string;
    accessibilityLabel?: string;
    accessibilityRole?: AccessibilityRole;
    onPressIn?: () => void
    onPressOut?:() => void
}

// Parse CSS transform string to React Native transform array
function parseTransform(transformString: string): any[] {
    const transforms: any[] = [];
    
    // Match transform functions like scale(0.95), translateX(10px), rotate(45deg)
    const regex = /(\w+)\(([^)]+)\)/g;
    let match;
    
    while ((match = regex.exec(transformString)) !== null) {
        const func = match[1];
        const value = match[2].trim();
        
        switch (func) {
            case 'scale':
                transforms.push({ scale: parseFloat(value) });
                break;
            case 'scaleX':
                transforms.push({ scaleX: parseFloat(value) });
                break;
            case 'scaleY':
                transforms.push({ scaleY: parseFloat(value) });
                break;
            case 'translateX':
                transforms.push({ translateX: parseFloat(value) });
                break;
            case 'translateY':
                transforms.push({ translateY: parseFloat(value) });
                break;
            case 'rotate':
                transforms.push({ rotate: value }); // Keep as string with deg
                break;
            case 'rotateX':
                transforms.push({ rotateX: value });
                break;
            case 'rotateY':
                transforms.push({ rotateY: value });
                break;
            case 'rotateZ':
                transforms.push({ rotateZ: value });
                break;
            case 'skewX':
                transforms.push({ skewX: value });
                break;
            case 'skewY':
                transforms.push({ skewY: value });
                break;
        }
    }
    
    return transforms;
}

// Convert style prop to handle CSS transform strings
function convertStyle(style: any): StyleProp<ViewStyle> {
    if (!style) return style;
    
    // Handle array of styles
    if (Array.isArray(style)) {
        return style.map(s => convertStyle(s));
    }
    
    // Handle object style
    if (typeof style === 'object' && style.transform && typeof style.transform === 'string') {
        const { transform, ...restStyle } = style;
        return {
            ...restStyle,
            transform: parseTransform(transform)
        };
    }
    
    return style;
}

// TODO: Add elevation
export function Pressable({ className, children, style, onPress, disabled, ...props }: PressableComponentProps) {
    const convertedStyle = convertStyle(style);
    
    return (
        <RNPressable 
            style={convertedStyle}
            onPress={onPress}
            disabled={disabled}
            className={className}
            {...props}
        >
            {children}
        </RNPressable>
    );
}
