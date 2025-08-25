import { Box, Text } from "@blockit/cross-ui-toolkit";
import { darkColors } from "@blockit/ui";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
  featureColors: string[];
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradientFrom, 
  gradientTo, 
  features, 
  featureColors 
}: FeatureCardProps) {
  return (
    <Box className="relative p-6 md:p-8 rounded-3xl" style={{
      backgroundColor: darkColors.surface.elevated + '90',
      border: `1px solid ${darkColors.neutral[700]}50`
    }}>
      <Box className="flex items-center gap-4 mb-6">
        <Box className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center" style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
        }}>
          {icon}
        </Box>
        <Text variant="h3" className="text-2xl md:text-3xl font-bold" style={{ color: darkColors.text.main }}>
          {title}
        </Text>
      </Box>
      <Text variant="body" className="text-lg mb-6 leading-relaxed" style={{ color: darkColors.text.soft }}>
        {description}
      </Text>
      <Box className="space-y-4">
        {features.map((feature, index) => (
          <Box key={index} className="flex items-center gap-3">
            <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: featureColors[index] }} />
            <Text variant="body" style={{ color: darkColors.text.main }}>{feature}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}