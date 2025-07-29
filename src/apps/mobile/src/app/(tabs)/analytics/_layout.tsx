import { Stack, router } from 'expo-router';
import { Box, useTheme, Pressable, Text } from '@blockit/cross-ui-toolkit';

export default function AnalyticsLayout() {
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
            headerTitle: "Analytics",
            headerRight: () => (
              <Pressable 
                onPress={() => router.push("/(tabs)/analytics/sell-data")}
                className="mr-4"
              >
                <Text style={{ color: currentColors.primary[500], fontSize: 14 }}>Sell my data ✨</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="sell-data"
          options={{
            headerTitle: "Sell my data ✨",
          }}
        />
        <Stack.Screen
          name="historical"
          options={{
            headerTitle: "Historical",
          }}
        />
      </Stack>
    </Box>
  );
}