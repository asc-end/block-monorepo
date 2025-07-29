import { Stack, router } from 'expo-router';
import { Box, useTheme, Pressable, Text } from '@blockit/cross-ui-toolkit';

export default function SettingsLayout() {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <Stack
        screenOptions={{
          headerTintColor: currentColors.text.main,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          contentStyle: {
            backgroundColor: currentColors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Settings",
          }}
        />
      </Stack>
    </Box>
  );
}