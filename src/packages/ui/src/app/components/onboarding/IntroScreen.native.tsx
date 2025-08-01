import { Box, Text, useTheme, Button } from '@blockit/cross-ui-toolkit';
import { Eye } from '../svgs/Eye';

interface IntroScreenProps {
  onGetStarted: () => void;
}

export function IntroScreen({ onGetStarted }: IntroScreenProps) {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1 justify-between items-center relative pb-12" style={{ backgroundColor: currentColors.background }}>
      {/* Eye SVG */}
      <Box
        style={{
          position: 'absolute',
          // top: 100,
          left: 0,
          right: 0,
        }}
      >
        <Eye />
      </Box>

      {/* Content */}
      <Box className="flex-1 justify-center items-center px-6">


      </Box>

      {/* Get Started Button */}
      <Box className="px-6" style={{ width: '100%' }}>
        <Box className="flex flex-col items-center justify-center mb-6">
          <Text
            className='text-center'
            style={{
              fontSize: 42,
              lineHeight: 48,
              fontFamily: "ClashDisplay",
              color: currentColors.text.main,
              fontWeight: '700'
            }}
          >
            The online world
          </Text>
          <Text
            className='text-center mb-4'
            style={{
              fontSize: 30,
              lineHeight: 30,
              fontFamily: "ClashDisplay",
              fontWeight: '600'
            }}
          >
            is full of wonderful things
          </Text>
        </Box>
        <Button
          title="Get Started"
          variant="primary"
          onPress={onGetStarted}

        />
      </Box>
    </Box>
  );
}