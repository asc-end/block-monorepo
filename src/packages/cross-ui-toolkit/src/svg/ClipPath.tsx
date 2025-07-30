import * as React from 'react';

export function ClipPath(props: React.SVGProps<SVGClipPathElement>) {
  const { ...restProps } = props;
  return React.createElement('clipPath', { ...restProps });
}