import { useLogin, useLoginWithEmail, useLoginWithFarcasterV2, useLoginWithOAuth, usePrivy, useWallets } from "@privy-io/react-auth";
import { Box, Button, Pressable, Text } from "@blockit/cross-ui-toolkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Error from "./Error";
import { sendMessageToExtension } from "../lib/sendMessageToExtension";
import { useUserCreation } from "@blockit/ui";

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
  const walletAddress = wallets?.[0]?.address;
  const [isPressed, setIsPressed] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const { isCreating, isCreated, error } = useUserCreation({
    user,
    isReady: ready,
    getAccessToken,
    walletAddress
  });

  const features = [
    {
      title: "Focus Sessions",
      description: "Block distracting websites and apps during dedicated work sessions",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      )
    },
    {
      title: "Smart Analytics",
      description: "Track your productivity patterns and optimize your workflow",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      )
    },
    {
      title: "Cross-Platform",
      description: "Seamlessly sync across web, mobile, and browser extension",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const sendTokenToExtension = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        await sendMessageToExtension({ type: "AUTH_TOKEN", token: accessToken }, window);

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
      <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <Text className="text-slate-300 text-xl">Initializing Blockit...</Text>
        </div>
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-row w-full">
        {/* Left Panel - Content */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
          </div>
          
          <div className="relative z-10 max-w-lg">
            {/* Logo */}
            <div className="flex items-center mb-12">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              </div>
              <Text className="text-white text-2xl font-bold">Blockit</Text>
            </div>

            {/* Main Heading */}
            <div className="mb-12">
              <Text className="text-white text-5xl font-bold leading-tight mb-6">
                Reclaim Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Digital Focus
                </span>
              </Text>
              <Text className="text-slate-300 text-xl leading-relaxed">
                Transform distractions into deep work sessions. Block websites, track productivity, and build better digital habits across all your devices.
              </Text>
            </div>

            {/* Rotating Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentFeature 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-40 transform translate-x-4'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-500 ${
                      index === currentFeature 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <Text className="text-white text-lg font-semibold mb-1">
                        {feature.title}
                      </Text>
                      <Text className="text-slate-400">
                        {feature.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Indicators */}
            <div className="flex space-x-2 mt-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-blue-500 w-6' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Login */}
        <div className="w-full lg:flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-lg">
            {/* Mobile Header (hidden on desktop) */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              </div>
              <Text className="text-2xl font-bold text-gray-900 mb-2">Blockit</Text>
              <Text className="text-gray-600">Reclaim your digital focus</Text>
            </div>

            {/* Login Form */}
            <div className="text-center mb-8">
              <Text className="text-3xl font-bold text-gray-900 mb-3">
                Ready to focus?
              </Text>
              <Text className="text-gray-600 text-lg">
                Sign in to start blocking distractions and tracking your productivity
              </Text>
            </div>

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
              <div 
                className="w-full p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white mr-4">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10,17 15,12 10,7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  <Text className="text-white text-xl font-semibold">
                    Sign In
                  </Text>
                </div>
              </div>
            </Pressable>

            {/* Simple note */}
            <div className="mt-12 text-center">
              <Text className="text-sm text-gray-500 mb-2">
                No credit card required. Works on all your devices.
              </Text>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <Text className="text-sm text-gray-500">
                By signing in, you agree to our{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Privacy Policy
                </a>
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}