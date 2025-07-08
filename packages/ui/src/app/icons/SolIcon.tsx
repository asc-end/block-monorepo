import { Path, Svg } from "@blockit/cross-ui-toolkit";

interface SolIconProps {
  size?: number;
  color?: string;
}

export function SolIcon({ size = 24, color = 'currentColor' }: SolIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M24.706 19.517H10.34a.59.59 0 00-.415.17l-2.838 2.815a.291.291 0 00.207.498H21.66a.59.59 0 00.415-.17l2.838-2.816a.291.291 0 00-.207-.497zm-3.046-5.292H7.294l-.068.007a.291.291 0 00-.14.49l2.84 2.816.07.06c.1.07.22.11.344.11h14.366l.068-.007a.291.291 0 00.14-.49l-2.84-2.816-.07-.06a.59.59 0 00-.344-.11zM24.706 9H10.34a.59.59 0 00-.415.17l-2.838 2.816a.291.291 0 00.207.497H21.66a.59.59 0 00.415-.17l2.838-2.815A.291.291 0 0024.706 9z"
        fill={color}
      />
    </Svg>
  );
}
