import { useTheme, Text, Pressable, Box } from '@blockit/cross-ui-toolkit';
import { useState } from 'react';

const OAUTH_PROVIDERS = [
  { key: "github", icon: "github", label: "GitHub" },
  { key: "farcaster", icon: "archway", label: "Farcaster" },
  { key: "twitter", icon: "twitter", label: "Twitter" },
  { key: "telegram", icon: "telegram", label: "Telegram" },
];

interface LoginProps {
  loginWithFarcaster: () => Promise<any>,
  useLoginWithEmail: () => {
    sendCode: () => Promise<any>,
    loginWithCode: () => Promise<any>,
  },
  useLoginWithOAuth: ({onError}: {onError: (err: any) => void}) => {
    state: {
      status: string,
    },
    login: ({provider}: {provider: string}) => Promise<void>,
  }
}

export function Login(props: LoginProps) {
  const {  loginWithFarcaster, useLoginWithOAuth, useLoginWithEmail } = props;
  const { sendCode, loginWithCode } = useLoginWithEmail();

  const { currentColors } = useTheme();
  const [error, setError] = useState("");
  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });

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
      <Box className="w-full" style={{ gap: 4 }}>
        <Pressable
          onPress={loginWithCode}
          className="w-full px-8 py-3 rounded-2xl shadow-lg active:opacity-90 flex flex-row items-center justify-center"
          style={{ backgroundColor: currentColors.primary[500] }}
        >
          {/* <FontAwesome5 name="envelope" size={20} color="white" style={{ marginRight: 10 }} /> */}
          <Text variant="h3">
            Connect with Email
          </Text>
        </Pressable>

          <Box className="flex flex-row w-full flex-wrap justify-between" style={{ gap: 4 }}>
          {OAUTH_PROVIDERS.map((provider) => (
            <Pressable
              key={provider.key}
              onPress={() =>
                provider.key === 'farcaster'
                  ? loginWithFarcaster()
                  : oauth.login({ provider: provider.key })
              }
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