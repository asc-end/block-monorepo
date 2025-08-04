import { useTheme, Text, Pressable, Box, TextInput, Button } from '@blockit/cross-ui-toolkit';
import { useState } from 'react';

const OAUTH_PROVIDERS = [
  { key: "github", icon: "github", label: "GitHub" },
  // { key: "farcaster", icon: "archway", label: "Farcaster" },
  { key: "twitter", icon: "twitter", label: "Twitter" },
  { key: "telegram", icon: "telegram", label: "Telegram" },
];

interface LoginProps {
  loginWithFarcaster: () => Promise<any>,
  useLoginWithEmail: () => {
    sendCode: ({ email }: { email: string }) => Promise<any>,
    loginWithCode: ({ code }: { code: string }) => Promise<any>,
  },
  useLoginWithOAuth: ({ onError }: { onError: (err: any) => void }) => {
    state: {
      status: string,
    },
    login: ({ provider }: { provider: string }) => Promise<void>,
  }
  solanaConnectButton: React.ReactNode,
}

export function Login(props: LoginProps) {
  const { useLoginWithOAuth, useLoginWithEmail, solanaConnectButton } = props;
  const { sendCode, loginWithCode } = useLoginWithEmail();

  const { currentColors } = useTheme();
  const [error, setError] = useState("");
  const [emailStep, setEmailStep] = useState<'initial' | 'email' | 'code'>('initial');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  
  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });

  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await sendCode({ email });
      setEmailStep('code');
    } catch (err: any) {
      setError(err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    if (!code) {
      setError("Please enter the code");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await loginWithCode({ code });
    } catch (err: any) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="flex-1 justify-center items-center px-6 py-10"
      style={{ backgroundColor: currentColors.background }}
    >
      <Box className="items-center mb-14">
        <Text variant="h1" className="mb-2">
          Welcome to Blockit
        </Text>
        <Text variant="caption">
          Sign in or create an account to unlock your full potential
        </Text>
      </Box>
      
      {/* Email login flow */}
      {emailStep === 'email' && (
        <Box className="w-full mb-6" style={{ gap: 12 }}>
          <Box>
            <Text variant="h3" className="mb-2">Enter your email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              keyboardType="email-address"
              className="w-full px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: currentColors.surface.card,
                borderWidth: 1,
                borderColor: currentColors.neutral[300]
              }}
            />
          </Box>
          <Box className="flex flex-row" style={{ gap: 8 }}>
            <Button
              onPress={() => setEmailStep('initial')}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              onPress={handleEmailSubmit}
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Code verification */}
      {emailStep === 'code' && (
        <Box className="w-full mb-6" style={{ gap: 12 }}>
          <Box>
            <Text variant="h3" className="mb-2">Enter verification code</Text>
            <Text variant="caption" className="mb-3">
              We sent a code to {email}
            </Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Enter 6-digit code"
              keyboardType="numeric"
              className="w-full px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: currentColors.surface.card,
                borderWidth: 1,
                borderColor: currentColors.neutral[300]
              }}
            />
          </Box>
          <Box className="flex flex-row" style={{ gap: 8 }}>
            <Button
              onPress={() => {
                setEmailStep('email');
                setCode("");
              }}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Back
            </Button>
            <Button
              onPress={handleCodeSubmit}
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Initial login options */}
      {emailStep === 'initial' && (
        <Box className="w-full" style={{ gap: 4 }}>
          <Pressable
            onPress={() => setEmailStep('email')}
            className="w-full px-8 py-3 rounded-2xl shadow-lg active:opacity-90 flex flex-row items-center justify-center"
            style={{ backgroundColor: currentColors.primary[500] }}
          >
            {/* <FontAwesome5 name="envelope" size={20} color="white" style={{ marginRight: 10 }} /> */}
            <Text variant="h3">
              Connect with Email
            </Text>
          </Pressable>
          {solanaConnectButton && solanaConnectButton}
          <Box className="flex flex-row w-full flex-wrap justify-between" style={{ gap: 4 }}>
            {OAUTH_PROVIDERS.map((provider) => (
              <Pressable
                key={provider.key}
                onPress={() => oauth.login({ provider: provider.key })}
                disabled={oauth.state.status === "loading"}
                className="flex flex-1 items-center justify-center py-3 rounded-xl shadow-lg active:opacity-90"
                style={{
                  backgroundColor: currentColors.primary[200],
                }}
              >
                <Text >{provider.label}</Text>
              </Pressable>
            ))}
          </Box>
        </Box>
      )}

      {error && (
        <Box className="w-full mt-4 px-2">
          <Text
            variant="caption"
            className="text-center rounded-lg px-4 py-2"
            style={{
              color: currentColors.error.main,
              backgroundColor: currentColors.error.main + '22',
            }}
          >
            Error: {error}
          </Text>
        </Box>
      )}

      <Text
        variant="caption"
        className="mt-10 opacity-70 text-center"
      >
        By connecting, you agree to our{" "}
        <Text
          variant="caption"
          style={{
            color: currentColors.primary[500],
            textDecorationLine: 'underline',
          }}
        >
          Terms of Service
        </Text>
      </Text>
    </Box>
  );
}