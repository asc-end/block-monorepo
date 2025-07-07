import { Box, Text } from "@blockit/cross-ui-toolkit";

export function Home() {
  return (
    <Box className="min-h-screen p-4 flex items-center justify-center">
      <Box className="p-8">
        <Text variant="h2" className="text-2xl font-bold text-center mb-4">
          Blokit Extension
        </Text>
        <Text variant="body" className="text-gray-600 text-center">
          You are successfully authenticated.
        </Text>
      </Box>
    </Box>
  );
}