import { Box, Text } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { ReactNode } from "react";

interface MarketplaceFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  iconColor: string;
}

export function MarketplaceFeatureCard({ 
  icon, 
  title, 
  description, 
  gradientFrom, 
  gradientTo,
  borderColor,
  iconColor
}: MarketplaceFeatureCardProps) {
  return (
    <Box className="relative group">
      <Box className="p-6 md:p-8 rounded-2xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105" style={{
        background: `linear-gradient(135deg, ${darkColors.surface.elevated}80, ${darkColors.surface.card}50)`,
        border: `1px solid ${borderColor}30`,
        boxShadow: `0 20px 40px ${borderColor}10`
      }}>
        <Box className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center" style={{
          background: `linear-gradient(135deg, ${gradientFrom}20, ${gradientTo}10)`
        }}>
          <Box style={{ color: iconColor }}>
            {icon}
          </Box>
        </Box>
        <Text variant="h3" className="text-2xl font-bold mb-3" style={{ color: darkColors.text.main }}>
          {title}
        </Text>
        <Text variant="body" className="text-base" style={{ color: darkColors.text.soft }}>
          {description}
        </Text>
      </Box>
    </Box>
  );
}