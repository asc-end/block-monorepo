import { Path, Svg } from "@blockit/cross-ui-toolkit";

interface PlayIconProps {
  size?: number;
  color?: string;
}

export function PlayIcon({ size = 24, color = 'currentColor' }: PlayIconProps) {
  return (
    <Svg size={size} color={color}>
      <Path d="M8 5c0-.6.4-1 1-1 .2 0 .5.1.7.3l11 7c.5.3.5 1.1 0 1.4l-11 7c-.4.3-1 .1-1.3-.3-.2-.2-.3-.4-.3-.7V5z" fill={color} />
    </Svg>
  );
} 