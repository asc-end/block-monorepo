import React from 'react';

export interface PressableProps {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number };
    onPressIn?: () => void
    onPressOut?:() => void
}

function getHitSlopStyle(hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number }) {
    if (!hitSlop) return {};
    if (typeof hitSlop === 'number') {
        return {
            position: 'relative' as const,
            // The button itself will be wrapped, see below
        };
    }
    return {
        position: 'relative' as const,
        // The button itself will be wrapped, see below
    };
}

function getHitSlopWrapperStyle(hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number }) {
    if (!hitSlop) return {};
    if (typeof hitSlop === 'number') {
        return {
            display: 'inline-block',
            position: 'relative' as const,
            marginTop: -hitSlop,
            marginBottom: -hitSlop,
            marginLeft: -hitSlop,
            marginRight: -hitSlop,
            paddingTop: hitSlop,
            paddingBottom: hitSlop,
            paddingLeft: hitSlop,
            paddingRight: hitSlop,
        };
    }
    return {
        display: 'inline-block',
        position: 'relative' as const,
        marginTop: -(hitSlop.top ?? 0),
        marginBottom: -(hitSlop.bottom ?? 0),
        marginLeft: -(hitSlop.left ?? 0),
        marginRight: -(hitSlop.right ?? 0),
        paddingTop: hitSlop.top ?? 0,
        paddingBottom: hitSlop.bottom ?? 0,
        paddingLeft: hitSlop.left ?? 0,
        paddingRight: hitSlop.right ?? 0,
    };
}

export function Pressable({ 
    children, 
    onPress, 
    disabled = false, 
    className = '', 
    style,
    hitSlop,
    onPressIn,
    onPressOut,
    ...props 
}: PressableProps) {
    // If hitSlop is set, wrap the button in a div that increases the clickable area
    if (hitSlop) {
        return (
            <div style={getHitSlopWrapperStyle(hitSlop)}>
                <button
                    onClick={onPress}
                    onPointerDown={onPressIn}
                    onPointerUp={onPressOut}
                    disabled={disabled}
                    className={`bg-transparent transition-opacity duration-150 active:opacity-50 ${className} cursor-pointer`}
                    style={{ ...style, ...getHitSlopStyle(hitSlop) }}
                    {...props}
                >
                    {children}
                </button>
            </div>
        );
    }
    return (
        <button
            onClick={onPress}
            onPointerDown={onPressIn}
            onPointerUp={onPressOut}
            disabled={disabled}
            className={`bg-transparent transition-opacity duration-150 cursor-pointer active:opacity-50 ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
