import React from 'react';
import { ImageSourcePropType, Image as RNImage, ImageProps as RNImageProps } from 'react-native';
import { ImageProps, ImageVariant, imageStyles } from '.';

export function Image(props: ImageProps & RNImageProps): React.ReactElement {
  const { variant = 'default', style, src, className, ...rest } = props;
  const variantStyle = imageStyles[variant as ImageVariant];

  // Handle different types of URIs for React Native
  let fixedSrc: ImageSourcePropType | undefined = src as ImageSourcePropType;
  if (typeof src === 'string') {
    if (src.startsWith('https://') || src.startsWith('http://') || src.startsWith('data:')) {
      fixedSrc = { uri: src } as ImageSourcePropType;
    }
  }

  return (
    <RNImage 
      source={fixedSrc} 
      style={[variantStyle, style]} 
      className={className}
      {...rest} 
    />
  );
}
