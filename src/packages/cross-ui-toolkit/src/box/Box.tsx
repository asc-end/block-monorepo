import { BaseProps } from '../types';
import React from 'react';

export interface BoxProps extends BaseProps {
  onLayout?: (event: any) => void;
  [key: string]: any;
}

export function Box(props: BoxProps) {
  const { children, style, className, onLayout, ...rest} = props;
  
  // For web, we can use a ref and ResizeObserver or just call onLayout after mount
  React.useEffect(() => {
    if (onLayout && typeof window !== 'undefined') {
      // Simulate onLayout for web with a fake event structure
      const fakeEvent = {
        nativeEvent: {
          layout: {
            width: window.innerWidth,
            height: window.innerHeight,
            x: 0,
            y: 0
          }
        }
      };
      onLayout(fakeEvent);
    }
  }, [onLayout]);
  
  return (
    <div style={style} className={className} {...rest}>
      {children}
    </div>
  );
}

export default Box; 