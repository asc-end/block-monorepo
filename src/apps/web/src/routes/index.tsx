import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Box, Button, Pressable, Text, useTheme } from "@blockit/cross-ui-toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Error from "./Error";
import { sendMessageToExtension } from "../lib/sendMessageToExtension";
import { createUser, useAuthStore } from "@blockit/ui";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
]);

export function App() {
  const { ready, authenticated, user, getAccessToken, login } = usePrivy();
  const { wallets } = useWallets();
  const { currentColors } = useTheme();
  const { setToken } = useAuthStore();
  const walletAddress = wallets?.[0]?.address;
  const [isPressed, setIsPressed] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      title: "Focus Sessions",
      description: "Block distracting websites and apps during dedicated work sessions",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      )
    },
    {
      title: "Smart Analytics",
      description: "Track your productivity patterns and optimize your workflow",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      )
    },
    {
      title: "Cross-Platform",
      description: "Seamlessly sync across web, mobile, and browser extension",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const sendTokenToExtension = async () => {
      const accessToken = await getAccessToken();
      setToken(accessToken);
      const urlParams = new URLSearchParams(window.location.search);

      if (accessToken) {
        try {
          createUser(user?.wallet?.address || "");

          const extensionId = urlParams.get("extensionId") || "ialoopcgpppijlhebflkpfedjapfmoch";
          await sendMessageToExtension(
            { type: "AUTH_TOKEN", token: accessToken, extensionId },
            window
          );


        } catch (error) {
          console.error("Error sending token to extension or creating user:", error);
        } finally {
          console.log("urlParams", urlParams)
          if (urlParams.get("source") === "extension" && !!urlParams.get("extensionId")) {
            setTimeout(() => { window.close() }, 3000);
          }
        }
      }
    };

    if (ready && user?.wallet?.address) {
      sendTokenToExtension();
    }
  }, [ready, user]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleLoginClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    login({ loginMethods: ["email", "farcaster", "github", "twitter", "telegram"] });
  };

  if (!ready) {
    return (
      <Box className="min-h-screen flex items-center justify-center" style={{ backgroundColor: currentColors.background }}>
        <Box className="text-center">
          <Box
            className="w-12 h-12 border-3 rounded-full animate-spin mx-auto mb-6"
            style={{
              borderColor: currentColors.neutral[400],
              borderTopColor: currentColors.primary[300]
            }}
          />
          <Text variant="h4" style={{ color: currentColors.text.main }}>
            Initializing Blockit...
          </Text>
        </Box>
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <Box className="min-h-screen flex flex-row w-full">
        {/* Left Panel - Content */}
        <Box className="hidden lg:flex lg:flex-1 p-12 flex-col justify-center relative overflow-hidden"
          style={{ backgroundColor: currentColors.neutral[200] }}>

          {/* Background Pattern */}
          <Box className="absolute inset-0 opacity-10">
            <Box
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: currentColors.primary[300] + '40' }}
            />
            <Box
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{ backgroundColor: currentColors.secondary[300] + '40' }}
            />
          </Box>

          <Box className="relative z-10 max-w-lg">
            {/* Logo */}
            <Box className="flex items-center mb-12">
              <Box
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                style={{ backgroundColor: currentColors.primary[300] }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: currentColors.white }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              </Box>
              <Text variant="h2" style={{ color: currentColors.text.main }}>
                Blockit
              </Text>
            </Box>

            {/* Main Heading */}
            <Box className="mb-12">
              <Text variant="h1" className="leading-tight mb-6" style={{ color: currentColors.text.main }}>
                Reclaim Your
                <br />
                <span style={{
                  background: `linear-gradient(to right, ${currentColors.primary[300]}, ${currentColors.secondary[300]})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Digital Focus
                </span>
              </Text>
              <Text variant="h4" className="leading-relaxed" style={{ color: currentColors.text.soft }}>
                Transform distractions into deep work sessions. Block websites, track productivity, and build better digital habits across all your devices.
              </Text>
            </Box>

            {/* Rotating Features */}
            <Box className="space-y-6">
              {features.map((feature, index) => (
                <Box
                  key={index}
                  className={`transition-all duration-500 ${index === currentFeature
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-40 transform translate-x-4'
                    }`}
                >
                  <Box className="flex items-start space-x-4">
                    <Box
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: index === currentFeature ? currentColors.primary[300] : currentColors.neutral[400],
                        color: index === currentFeature ? currentColors.white : currentColors.text.soft
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Text variant="h5" className="mb-1" style={{ color: currentColors.text.main }}>
                        {feature.title}
                      </Text>
                      <Text variant="body" style={{ color: currentColors.text.soft }}>
                        {feature.description}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Feature Indicators */}
            <Box className="flex space-x-2 mt-8">
              {features.map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setCurrentFeature(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentFeature ? 'w-6' : 'w-2'}`}
                  style={{
                    backgroundColor: index === currentFeature ? currentColors.primary[300] : currentColors.neutral[400]
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Right Panel - Login */}
        <Box className="w-full lg:flex-1 flex items-center justify-center p-8" style={{ backgroundColor: currentColors.surface.card }}>
          <Box className="w-full max-w-lg">
            {/* Mobile Header (hidden on desktop) */}
            <Box className="lg:hidden text-center mb-8">
              <Box
                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: currentColors.primary[300] }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: currentColors.white }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              </Box>
              <Text variant="h2" className="mb-2" style={{ color: currentColors.text.main }}>
                Blockit
              </Text>
              <Text variant="body" style={{ color: currentColors.text.soft }}>
                Reclaim your digital focus
              </Text>
            </Box>

            {/* Login Form */}
            <Box className="text-center mb-8">
              <Text variant="h2" className="mb-3" style={{ color: currentColors.text.main }}>
                Ready to focus?
              </Text>
              <Text variant="h5" style={{ color: currentColors.text.soft }}>
                Sign in to start blocking distractions and tracking your productivity
              </Text>
            </Box>

            {/* Login Button */}
            <Pressable
              onPress={handleLoginClick}
              className="w-full relative overflow-hidden group"
              style={{
                borderRadius: "12px",
                transform: isPressed ? "translateY(1px)" : "translateY(0px)",
                transition: "all 0.2s ease",
              }}
            >
              <Box
                className="w-full p-6 rounded-xl shadow-lg transition-all duration-200 group-hover:scale-[1.02]"
                style={{ backgroundColor: currentColors.primary[300] }}
              >
                <Box className="flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-4" style={{ color: currentColors.white }}>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10,17 15,12 10,7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <Text variant="h4" style={{ color: currentColors.white }}>
                    Sign In
                  </Text>
                </Box>
              </Box>
            </Pressable>

            {/* Simple note */}
            <Box className="mt-12 text-center">
              <Text variant="caption" className="mb-2" style={{ color: currentColors.text.soft }}>
                No credit card required. Works on all your devices.
              </Text>
            </Box>

            {/* Footer */}
            <Box className="mt-8 text-center">
              <Text variant="caption" style={{ color: currentColors.text.soft }}>
                By signing in, you agree to our{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: currentColors.primary[300], textDecoration: 'underline' }}
                  className="hover:opacity-80"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: currentColors.primary[300], textDecoration: 'underline' }}
                  className="hover:opacity-80"
                >
                  Privacy Policy
                </a>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}