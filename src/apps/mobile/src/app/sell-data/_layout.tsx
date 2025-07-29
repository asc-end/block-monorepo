import { Stack } from 'expo-router';
import { useTheme } from '@blockit/cross-ui-toolkit';

export default function SellDataLayout() {
  const { currentColors } = useTheme();

  return (
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
          headerTitle: "Sell my data ✨",
        }}
      />
    </Stack>
  );
}