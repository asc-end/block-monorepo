import { Box, Text } from "@blockit/cross-ui-toolkit";

export default function Home() {
  return (
    <Box className="min-h-screen w-full flex items-center justify-center">
      <Box className="p-8">
        <Text variant="h2" className="text-2xl font-bold text-center mb-4">
          Welcome to Blokit!
        </Text>
        <Text variant="body" className="text-gray-400 text-center">
          You are successfully connected.
        </Text>
      </Box>
    </Box>
  );
}