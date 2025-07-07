import { usePrivy } from "@privy-io/react-auth";
import { Box, Button, Text } from "@blockit/cross-ui-toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Error from "./Error";
import { sendMessageToExtension } from "../lib/sendMessageToExtension";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
]);

export function App() {
  const { ready, authenticated, login, user, getAccessToken } = usePrivy();

  useEffect(() => {
    const sendTokenToExtension = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        await sendMessageToExtension({type: "AUTH_TOKEN", token: accessToken}, window);

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("source") === "extension") {
          setTimeout(() => { window.close() }, 1000);
        }
      }

    };

    if (ready && authenticated && user?.wallet?.address) {
      sendTokenToExtension();
    }
  }, [ready, authenticated, user, getAccessToken]);

  if (!ready) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <Box className="min-h-screen w-full flex items-center justify-center">
        <Box className="max-w-md w-full p-8">
          <Text variant="h2" className="text-2xl font-bold text-center mb-6">
            Connect to Blokit
          </Text>
          <Button
            title="Connect Wallet"
            size="lg"
            variant="primary"
            className="w-full"
            onPress={() => login({ walletChainType: "solana-only" })}
          />
        </Box>
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}