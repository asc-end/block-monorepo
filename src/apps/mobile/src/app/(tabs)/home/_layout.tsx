import { Stack, router } from 'expo-router';
import { Box, useTheme, Pressable, Text } from '@blockit/cross-ui-toolkit';

export default function HomeLayout() {
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
            headerTitle: "Blockit",
            headerRight: () => (
              <Pressable 
                onPress={() => router.push("/(tabs)/home/sell-data")}
                className="mr-4"
              >
                <Text style={{ color: currentColors.primary[500], fontSize: 14 }}>Sell my data ✨</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="create-routine/index"
          options={{
            headerTitle: "Create Routine",
          }}
        />
        <Stack.Screen
          name="create-routine/apps"
          options={{
            headerTitle: "Apps",
          }}
        />
        <Stack.Screen
          name="create-routine/calendar"
          options={{
            headerTitle: "Calendar",
          }}
        />
        <Stack.Screen
          name="create-routine/money"
          options={{
            headerTitle: "Money",
          }}
        />
        <Stack.Screen
          name="create-routine/time"
          options={{
            headerTitle: "Routine Time",
          }}
        />
        <Stack.Screen
          name="routine"
          options={{
            headerTitle: "Routine",
          }}
        />
        <Stack.Screen
          name="sell-data"
          options={{
            headerTitle: "Sell my data ✨",
          }}
        />
      </Stack>
    </Box>

  );
}
