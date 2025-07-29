import React from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientProps, directionToPoints, normalizeColors } from '.';

export function Gradient(props: GradientProps): React.ReactElement {
  const {
    type = 'linear',
    direction = 'to-right',
    colors = ['#000000', '#FFFFFF'],
    startPoint,
    endPoint,
    locations,
    borderRadius = 0,
    style,
    className,
    children,
    ...rest
  } = props;

  const { colors: normalizedColors, offsets } = normalizeColors(colors);
  
  // Get start and end points
  const points = direction ? directionToPoints[direction] : undefined;
  const start = startPoint || points?.start || { x: 0.5, y: 0 };
  const end = endPoint || points?.end || { x: 0.5, y: 1 };
  
  // Use locations if provided, otherwise use offsets from color stops
  const gradientLocations = locations || offsets;

  const gradientStyle: ViewStyle = {
    borderRadius: typeof borderRadius === 'number' ? borderRadius : 0,
    ...(style as ViewStyle),
  };

  if (type === 'radial') {
    // Note: react-native-radial-gradient might need to be installed separately
    // For now, we'll use a fallback with the first color
    return (
      <View style={[{ backgroundColor: normalizedColors[0] }, gradientStyle]} {...rest}>
        {children}
      </View>
    );
    
    // When react-native-radial-gradient is available:
    // return (
    //   <RadialGradient
    //     style={gradientStyle}
    //     colors={normalizedColors}
    //     stops={gradientLocations}
    //     center={[0.5, 0.5]}
    //     radius={0.5}
    //     {...rest}
    //   >
    //     {children}
    //   </RadialGradient>
    // );
  }

  return (
    <LinearGradient
      colors={normalizedColors}
      start={start}
      end={end}
      locations={gradientLocations}
      style={gradientStyle}
      className={className}
      {...rest}
    >
      {children}
    </LinearGradient>
  );
}