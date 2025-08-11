import { Stack } from 'expo-router';
import { Box, useTheme } from '@blockit/cross-ui-toolkit';

export default function CreateRoutineLayout() {
  const { currentColors } = useTheme();

  return (
    <Box className="flex-1" style={{ backgroundColor: currentColors.background }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          headerTintColor: currentColors.text.main,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: currentColors.background,
          },
        }}
      >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Create Routine",
        }}
      />
      <Stack.Screen
        name="apps"
        options={{
          headerTitle: "Apps",
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          headerTitle: "Calendar",
        }}
      />
      <Stack.Screen
        name="money"
        options={{
          headerTitle: "Money",
        }}
      />
      <Stack.Screen
        name="time"
        options={{
          headerTitle: "Routine Time",
        }}
      />
      </Stack>
    </Box>
  );
}