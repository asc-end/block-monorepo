import { Box, Pressable, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { Hands } from '../svgs/Hands';

interface ReclaimScreenProps {
  onContinue: () => void;
}

export function ReclaimScreen({ onContinue }: ReclaimScreenProps) {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1 justify-end items-center pb-6" style={{ backgroundColor: currentColors.background }}>
      <Box className="absolute inset-0 flex items-center justify-center">
        <Hands />
      </Box>

      <Text className='text-center' style={{ fontSize: 36, lineHeight: 36, fontFamily: "ClashDisplay" }}>
        Reclaim your world
      </Text>
    </Box>
  );
}