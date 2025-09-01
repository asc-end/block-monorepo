import React from 'react';

export interface BlurProps {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default' | 'extraLight' | 'regular' | 'prominent';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Blur({ 
  intensity = 50, 
  tint = 'default',
  children,
  className,
  style 
}: BlurProps) {
  const blurAmount = Math.min(Math.max(intensity, 0), 100);
  
  return (
    <div 
      className={className}
      style={{
        backdropFilter: `blur(${blurAmount * 0.2}px)`,
        WebkitBackdropFilter: `blur(${blurAmount * 0.2}px)`,
        ...style
      }}
    >
      {children}
    </div>
  );
}