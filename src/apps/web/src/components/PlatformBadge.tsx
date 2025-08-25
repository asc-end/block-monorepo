import { Box } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { ReactNode } from "react";

interface PlatformBadgeProps {
  icon: ReactNode;
  name: string;
  iconColor: string;
}

export function PlatformBadge({ icon, name, iconColor }: PlatformBadgeProps) {
  return (
    <Box className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer" style={{
      backgroundColor: `${darkColors.surface.card}50`,
      border: `1px solid ${darkColors.neutral[700]}50`
    }}>
      <Box style={{ color: iconColor }}>
        {icon}
      </Box>
      <span style={{ color: darkColors.text.soft }}>{name}</span>
    </Box>
  );
}