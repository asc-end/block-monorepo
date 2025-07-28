import React from 'react';
import { Switch, View, ViewStyle } from 'react-native';
import { ToggleProps } from '.';

export function Toggle(props: ToggleProps): React.ReactElement {
  const {
    value,
    onValueChange,
    disabled = false,
    style,
    trackColor,
    thumbColor,
    size = 'md',
  } = props;

  const defaultTrackColor = {
    false: '#E5E5EA',
    true: '#34C759',
  };

  const defaultThumbColor = '#FFFFFF';

  const actualTrackColor = trackColor || defaultTrackColor;
  const actualThumbColor = thumbColor?.true || thumbColor?.false || defaultThumbColor;

  // React Native Switch doesn't support custom sizes directly,
  // so we'll wrap it in a View and scale it
  const scale = size === 'sm' ? 1 : size === 'lg' ? 1.4 : 1.2;

  const containerStyle: ViewStyle = {
    transform: [{ scale }],
    ...style,
  };

  return (
    <View style={containerStyle}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={actualTrackColor}
        thumbColor={actualThumbColor}
        ios_backgroundColor={actualTrackColor.false}
      />
    </View>
  );
}