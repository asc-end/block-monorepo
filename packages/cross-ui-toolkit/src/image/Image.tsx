import React from 'react';
import { ImageProps, imageStyles } from '.';

export function Image(props: ImageProps): React.ReactElement {
  const { variant = 'default', style, ...rest } = props;
  const variantStyle = imageStyles[variant];

  return (
    <img style={{ ...variantStyle, ...style }} {...rest} />
  );
}
