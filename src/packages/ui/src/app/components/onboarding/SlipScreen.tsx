import { Box, Pressable, Text, useTheme } from '@blockit/cross-ui-toolkit';
import { MeltingClock } from '../svgs/MeltingClock';
import { Clock } from '../svgs/Clock';

interface SlipScreenProps {
  onContinue: () => void;
}

export function SlipScreen({ onContinue }: SlipScreenProps) {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1 justify-end items-center relative pb-12" style={{ backgroundColor: currentColors.background }}>
      <Box className="absolute" style={{ top: 100, left: 0, right: 0, alignItems: 'center' }}>
        <Clock size={300} />
      </Box>
      <Box className="" >
        <Text className='text-center' style={{ fontSize: 20, lineHeight: 20, fontFamily: "ClashDisplay" }}>
          But time is relative
        </Text>
        <Text className='text-center' style={{ fontSize: 36, lineHeight: 36, fontFamily: "ClashDisplay" }}>
          It can slip away fast
        </Text>
      </Box>
    </Box>
  );
}