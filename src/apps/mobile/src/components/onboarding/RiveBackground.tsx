import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import Rive, { useRive, RiveRef, Fit } from 'rive-react-native';

const { width: screenWidth } = Dimensions.get('window');

interface RiveBackgroundProps {
  currentStep: number;
}

const ARTBOARDS = ['Eye', 'Slip', 'Landscape', 'Landscape', 'Landscape', 'World'];

export function RiveBackground({ currentStep }: RiveBackgroundProps) {
  const riveRef = useRef<RiveRef>(null);
  useRive();

  // Show app icon for the final step
  if (currentStep === 6) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image
          source={require('../../../assets/icon.png')}
          style={{
            width: screenWidth * 0.5,
            height: screenWidth * 0.5,
            resizeMode: 'contain'
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Rive
        ref={riveRef}
        source={require('../../../assets/rive/blockit.riv')}
        artboardName={ARTBOARDS[Math.min(currentStep, ARTBOARDS.length - 1)]}
        stateMachineName="State Machine 1"
        autoplay={true}
        fit={Fit.Cover}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
}); 