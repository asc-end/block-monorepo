import { Path, Svg } from "@blockit/cross-ui-toolkit";

interface ChevronIconProps {
  size?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ChevronIcon({ 
  size = 24, 
  color = 'currentColor', 
  direction = 'right' 
}: ChevronIconProps) {
  const getRotation = () => {
    switch (direction) {
      case 'up':
        return -90;
      case 'down':
        return 90;
      case 'left':
        return 180;
      case 'right':
      default:
        return 0;
    }
  };

  return (
    <Svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      rotation={getRotation()}
    >
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
