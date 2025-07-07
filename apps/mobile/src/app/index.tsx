import { View } from "react-native";
import { Text, useTheme, Pressable } from '@blockit/cross-ui-toolkit';
import { useEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";

export default function Page() {
  const { currentColors } = useTheme();
  const { logout } = usePrivy();
  const { wallets } = useEmbeddedSolanaWallet()

  return (
    <View className="flex-1 justify-center items-center p-8" style={{ backgroundColor: currentColors.background }}>
      <Text className="text-2xl font-bold mb-4" style={{ color: currentColors.text.main }}>
        Connected Successfully!
      </Text>
      <Text className="text-lg mb-2" style={{ color: currentColors.text.secondary }}>
        {wallets[0]?.address}
      </Text>
      <View className="mt-8">
        <Pressable
          onPress={logout}
          className="px-6 py-3 rounded-lg"
          style={{ backgroundColor: currentColors.primary[500] }}
        >
          <Text className="text-white font-bold">Disconnect</Text>
        </Pressable>
      </View>
    </View>
  );
}