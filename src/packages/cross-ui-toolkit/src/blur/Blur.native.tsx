import React from 'react';
import { BlurView } from 'expo-blur';
import { View, ViewStyle } from 'react-native';

export interface BlurProps {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default' | 'extraLight' | 'regular' | 'prominent';
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function Blur({
  intensity = 50,
  tint = 'default',
  children,
  className,
  style
}: BlurProps) {
  console.log("BLUR")
  return (
    <BlurView
    blurReductionFactor={100}
      // blurReductionFactor={0}
      // experimentalBlurMethod="dimezisBlurView"
      // intensity={intensity}
      // tint={"systemChromeMaterialDark"}
      // style={style}
      // className={className}
      intensity={10000}
      experimentalBlurMethod="dimezisBlurView"
      // style={{
      //   position: "absolute",
      //   bottom: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "50%",
      // }}
    >
      {children}
    </BlurView>
  );
}