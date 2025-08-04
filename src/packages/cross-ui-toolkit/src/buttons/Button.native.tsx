import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, ActivityIndicator } from 'react-native';
import { ButtonProps, getButtonStyles, buttonSizeStyles } from '.';
import { useTheme } from '../theme/context';

export function Button(props: ButtonProps): React.ReactElement {
    const {
        children,
        variant = 'primary',
        size = 'md',
        disabled = false,
        style,
        className,
        onPress,
        onPressIn,
        onLayout,
        title,
        leftIcon,
        rightIcon,
        loading = false,
        loadingText,
        ...rest
    } = props;

    const [isPressed, setIsPressed] = useState(false);
    const { currentColors } = useTheme();
    const variantStyle = getButtonStyles(currentColors, variant);
    const sizeStyle = buttonSizeStyles[size];
    const isPrimary = variant === 'primary' || variant === 'destructive';

    // Memoize styles to prevent recreation on every render
    const nativeStyles = useMemo(() => StyleSheet.create({
        container: {
            position: 'relative' as const,
            opacity: disabled ? 0.5 : loading ? 0.7 : 1,
        },
        button: {
            backgroundColor: style?.backgroundColor ?? variantStyle.backgroundColor,
            
            borderWidth: style?.borderWidth,
            borderColor: style?.borderColor,
            borderRadius: sizeStyle.borderRadius,
            paddingHorizontal: sizeStyle.paddingHorizontal,
            paddingVertical: sizeStyle.paddingVertical,
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            transform: [{ translateY: 0 }],
            zIndex: 2,
        },
        buttonPressed: {
            transform: isPrimary ? [{ translateY: 4 }] : [],
            opacity: isPrimary ? 1 : 0.8,
            backgroundColor: style?.backgroundColor || (variantStyle['&:active'] as any)?.backgroundColor || variantStyle.backgroundColor,
        },
        shadow: {
            position: 'absolute' as const,
            top: 4,
            left: 0,
            right: 0,
            bottom: -4,
            // backgroundColor: style?.shadowColor ?? variantStyle.shadowColor,
            borderRadius: sizeStyle.borderRadius,
            zIndex: 1,
            opacity: isPrimary && !disabled ? 1 : 0,
        },
        content: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 8,
        },
        text: {
            color: style?.color ?? variantStyle.color,
            fontSize: sizeStyle.fontSize,
            fontWeight: sizeStyle.fontWeight,
            letterSpacing: sizeStyle.letterSpacing,
        },
        iconContainer: {
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
        },
        loadingContainer: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            gap: 8,
        },
    }), [variantStyle, sizeStyle, disabled, isPrimary, style]);

    const displayTitle = loading ? (loadingText || title) : title;

    return (
        <View style={nativeStyles.container} >
            <View style={nativeStyles.shadow} />
            <Pressable
                style={[
                    nativeStyles.button,
                    isPressed && nativeStyles.buttonPressed,
                ]}
                onPress={() => { onPress?.()}}
                onPressIn={() => { setIsPressed(true); onPressIn?.()}}
                onPressOut={() => setIsPressed(false)}
                onLayout={onLayout}
                disabled={disabled || loading}
                className={className}
                {...rest}
            >
                <View style={nativeStyles.content}>
                    {loading ? (
                        <View style={nativeStyles.loadingContainer}>
                            <ActivityIndicator size="small" color={variantStyle.color} />
                            {displayTitle && <Text className='font-xl' style={nativeStyles.text}>{displayTitle}</Text>}
                        </View>
                    ) : (
                        <>
                            {leftIcon && <View style={nativeStyles.iconContainer}>{leftIcon}</View>}
                            {displayTitle && <Text className='font-xl' style={nativeStyles.text}>{displayTitle}</Text>}
                            {rightIcon && <View style={nativeStyles.iconContainer}>{rightIcon}</View>}
                            {children}
                        </>
                    )}
                </View>
            </Pressable>
        </View>
    );
}
