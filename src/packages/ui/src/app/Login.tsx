import { useTheme, Text, Pressable, Box, TextInput, Gradient, Blur, Svg, Defs, Circle, Stop, RadialGradient, Filter, FEGaussianBlur, Animate } from '@blockit/cross-ui-toolkit';
import { useState } from 'react';
import { Platform } from 'react-native';


const OAUTH_PROVIDERS = [
  { key: "github", icon: "github", label: "GitHub" },
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

  // Check if we're in Solana mobile mode
  const isSolanaMobile = process.env.EXPO_PUBLIC_ENV === 'solana-mobile';
  console.log('Login render - isSolanaMobile:', isSolanaMobile);
  console.log('Login render - background color:', currentColors.background);
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
      className="flex-1 justify-center items-center px-6 py-10 relative overflow-hidden"
      style={{
        backgroundColor: currentColors.background || '#FFFFFF',
        minHeight: '100%'
      }}
    >
      {/* Background gradient orbs with SVG radial gradients */}
      <Box className="absolute inset-0 opacity-30" style={{ zIndex: 0 }}>
        <Svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        >
          <Defs>
            <RadialGradient id="purple-gradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={currentColors.pop.purple || '#8B5CF6'} stopOpacity="0.6" />
              <Stop offset="50%" stopColor={currentColors.pop.purple || '#8B5CF6'} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={currentColors.pop.purple || '#8B5CF6'} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="indigo-gradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={currentColors.pop.indigo || '#6366F1'} stopOpacity="0.5" />
              <Stop offset="50%" stopColor={currentColors.pop.indigo || '#6366F1'} stopOpacity="0.25" />
              <Stop offset="100%" stopColor={currentColors.pop.indigo || '#6366F1'} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="magenta-gradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={currentColors.pop.magenta || '#EC4899'} stopOpacity="0.5" />
              <Stop offset="50%" stopColor={currentColors.pop.magenta || '#EC4899'} stopOpacity="0.25" />
              <Stop offset="100%" stopColor={currentColors.pop.magenta || '#EC4899'} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="secondary-gradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={currentColors.secondary[600] || '#64748B'} stopOpacity="0.6" />
              <Stop offset="50%" stopColor={currentColors.secondary[600] || '#64748B'} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={currentColors.secondary[600] || '#64748B'} stopOpacity="0" />
            </RadialGradient>
            <Filter id="blur-filter">
              <FEGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </Filter>
          </Defs>
          <Circle cx="10%" cy="15%" r="15" fill="url(#purple-gradient)" filter="url(#blur-filter)">
            <Animate attributeName="cx" values="10%;15%;10%" dur="20s" repeatCount="indefinite" />
            <Animate attributeName="cy" values="15%;10%;15%" dur="15s" repeatCount="indefinite" />
            <Animate attributeName="r" values="15;20;15" dur="10s" repeatCount="indefinite" />
          </Circle>
          <Circle cx="92%" cy="50%" r="12" fill="url(#indigo-gradient)" filter="url(#blur-filter)">
            <Animate attributeName="cx" values="92%;88%;92%" dur="18s" repeatCount="indefinite" />
            <Animate attributeName="cy" values="50%;55%;50%" dur="22s" repeatCount="indefinite" />
            <Animate attributeName="r" values="12;16;12" dur="12s" repeatCount="indefinite" />
          </Circle>
          <Circle cx="30%" cy="88%" r="10" fill="url(#magenta-gradient)" filter="url(#blur-filter)">
            <Animate attributeName="cx" values="30%;35%;30%" dur="25s" repeatCount="indefinite" />
            <Animate attributeName="cy" values="88%;85%;88%" dur="20s" repeatCount="indefinite" />
            <Animate attributeName="r" values="10;14;10" dur="15s" repeatCount="indefinite" />
          </Circle>
        </Svg>

        <Gradient
          type="linear"
          direction="to-bottom-right"
          colors={[
            currentColors.primary[500] + '08',
            'transparent',
            currentColors.secondary[500] + '08'
          ]}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        />
      </Box>



      <Box className="items-center mb-12 relative z-10">
        <Box className="mb-8 relative">
          {/* Animated gradient background */}
          {/* <Gradient
            type="radial"
            colors={[
              { color: currentColors.pop.purple + '50', offset: 0 },
              { color: currentColors.pop.indigo + '30', offset: 0.5 },
              { color: 'transparent', offset: 1 }
            ]}
            className="absolute -inset-6"
            style={{
              width: 140,
              height: 140,
              opacity: 0.7
            }}
            borderRadius={70}
          />
          <Gradient
            type="radial"
            colors={[
              { color: currentColors.pop.indigo + '40', offset: 0 },
              { color: currentColors.pop.violet + '20', offset: 0.5 },
              { color: 'transparent', offset: 1 }
            ]}
            className="absolute -inset-6"
            style={{
              width: 140,
              height: 140,
              opacity: 0.5
            }}
            borderRadius={70}
          /> */}
          <Gradient
            type="linear"
            direction="to-bottom-right"
            colors={[
              currentColors.primary[500] + '15',
              currentColors.secondary[500] + '15'
            ]}
            className="w-20 h-20 items-center justify-center relative"
            style={{
              borderWidth: 1,
              borderColor: currentColors.primary[400] + '40'
            }}
            borderRadius={16}
          >
            <Text variant="h1" style={{
              fontSize: 36,
              fontWeight: '900',
              color: currentColors.primary[600]
            }}>
              B
            </Text>
          </Gradient>
        </Box>
        <Text variant="h1" className="mb-2 text-center" style={{
          fontSize: 42,
          fontWeight: '700',
          color: currentColors.text.main || '#FFFFFF',
          letterSpacing: -1
        }}>
          Welcome to Blockit
        </Text>
        <Text variant="body" className="text-center px-8" style={{
          fontSize: 17,
          lineHeight: 26,
          color: currentColors.text.soft,
          fontWeight: '400'
        }}>
          App blocker powered by stakes
        </Text>
      </Box>

      {/* Email login flow */}
      {emailStep === 'email' && (
        <Box className="w-full mb-6 relative z-10" style={{ gap: 16, maxWidth: 400 }}>
          <Box>
            <Text variant="h3" className="mb-3" style={{ fontWeight: '500', color: currentColors.text.main, fontSize: 18 }}>Enter your email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              keyboardType="email-address"
              className="w-full px-5 py-4 rounded-xl"
              style={{
                backgroundColor: currentColors.background + 'CC',
                backdropFilter: 'blur(10px)',
                borderWidth: 1,
                borderColor: email ? currentColors.primary[400] : currentColors.neutral[400],
                fontSize: 16,
                color: currentColors.text.main,
                transition: 'all 0.2s ease'
              }}
            />
          </Box>
          <Box className="flex flex-row" style={{ gap: 12 }}>
            <Pressable
              onPress={() => setEmailStep('initial')}
              disabled={loading}
              className="flex-1 py-4 rounded-xl items-center justify-center"
              style={{
                backgroundColor: currentColors.background + 'CC',
                backdropFilter: 'blur(10px)',
                borderWidth: 1,
                borderColor: currentColors.neutral[400],
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <Text variant="body" style={{ fontWeight: '500', color: currentColors.text.main }}>Back</Text>
            </Pressable>
            <Pressable
              onPress={handleEmailSubmit}
              disabled={loading || !email}
              className="flex-1 py-4 rounded-xl items-center justify-center"
              style={{
                background: loading || !email ? currentColors.neutral[400] : `linear-gradient(135deg, ${currentColors.primary[600]} 0%, ${currentColors.primary[700]} 100%)`,
                borderWidth: 1,
                borderColor: loading || !email ? currentColors.neutral[500] : currentColors.primary[700],
                boxShadow: loading || !email ? 'none' : `0 4px 20px ${currentColors.primary[600]}40`,
                transition: 'all 0.2s ease'
              }}
            >
              <Text variant="body" style={{ color: loading || !email ? currentColors.text.soft : 'white', fontWeight: '500' }}>
                {loading ? "Sending..." : "Send Code"}
              </Text>
            </Pressable>
          </Box>
        </Box>
      )}

      {/* Code verification */}
      {emailStep === 'code' && (
        <Box className="w-full mb-6 relative z-10" style={{ gap: 16, maxWidth: 400 }}>
          <Box>
            <Text variant="h3" className="mb-2" style={{ fontWeight: '500', color: currentColors.text.main, fontSize: 18 }}>Verify your email</Text>
            <Text variant="body" className="mb-4 opacity-70">
              We sent a 6-digit code to {email}
            </Text>
            <TextInput
              value={code}
              onChangeText={(text) => {
                if (text.length <= 6) setCode(text);
              }}
              placeholder="000000"
              keyboardType="numeric"
              className="w-full px-5 py-4 rounded-xl text-center"
              style={{
                backgroundColor: currentColors.background + 'CC',
                backdropFilter: 'blur(10px)',
                borderWidth: 1,
                borderColor: code.length === 6 ? currentColors.success.main : code ? currentColors.primary[400] : currentColors.neutral[400],
                fontSize: 24,
                letterSpacing: 8,
                fontWeight: '500',
                color: currentColors.text.main,
                transition: 'all 0.2s ease'
              }}
            />
          </Box>
          <Box className="flex flex-row" style={{ gap: 12 }}>
            <Pressable
              onPress={() => {
                setEmailStep('email');
                setCode("");
              }}
              disabled={loading}
              className="flex-1 py-4 rounded-xl items-center justify-center"
              style={{
                backgroundColor: currentColors.background + 'CC',
                backdropFilter: 'blur(10px)',
                borderWidth: 1,
                borderColor: currentColors.neutral[400],
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <Text variant="body" style={{ fontWeight: '500', color: currentColors.text.main }}>Back</Text>
            </Pressable>
            <Pressable
              onPress={handleCodeSubmit}
              disabled={loading || code.length !== 6}
              className="flex-1 py-4 rounded-xl items-center justify-center"
              style={{
                background: loading || code.length !== 6 ? currentColors.neutral[400] : `linear-gradient(135deg, ${currentColors.primary[600]} 0%, ${currentColors.primary[700]} 100%)`,
                borderWidth: 1,
                borderColor: loading || code.length !== 6 ? currentColors.neutral[500] : currentColors.primary[700],
                boxShadow: loading || code.length !== 6 ? 'none' : `0 4px 20px ${currentColors.primary[600]}40`,
                transition: 'all 0.2s ease'
              }}
            >
              <Text variant="body" style={{ color: loading || code.length !== 6 ? currentColors.text.soft : 'white', fontWeight: '500' }}>
                {loading ? "Verifying..." : "Verify"}
              </Text>
            </Pressable>
          </Box>
        </Box>
      )}

      {/* Initial login options */}
      {emailStep === 'initial' && (
        <Box className="w-full relative z-10" style={{ gap: 16, maxWidth: 400 }}>
          {/* Solana Mobile Mode - Show only Solana connection with simplified UI */}
          {isSolanaMobile ? (
            <>
              {solanaConnectButton && (
                <Box style={{ width: '100%', maxWidth: 400 }}>
                  {solanaConnectButton}
                </Box>
              )}
            </>
          ) : (
            /* Regular mode - Show all options */
            <>
              {/* Solana Wallet Connection */}
              {solanaConnectButton && (
                <Box>
                  {solanaConnectButton}
                </Box>
              )}

              {/* Divider */}
              <Box className="my-8 flex-row items-center" style={{ gap: 20 }}>
                <Box className="flex-1" style={{ height: 1, backgroundColor: currentColors.neutral[400] }} />
                <Text variant="body" style={{
                  fontWeight: '400',
                  fontSize: 14,
                  color: currentColors.text.soft,
                  letterSpacing: 0.5
                }}>
                  OR
                </Text>
                <Box className="flex-1" style={{ height: 1, backgroundColor: currentColors.neutral[400] }} />
              </Box>

              {/* Social Login Options */}
              <Box style={{ gap: 12 }}>
                <Pressable
                  onPress={() => setEmailStep('email')}
                  className="w-full px-8 py-4 rounded-xl active:scale-98 flex flex-row items-center justify-center"
                  style={{
                    backgroundColor: currentColors.background + '80',
                    borderWidth: 1,
                    borderColor: currentColors.neutral[400],
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Text variant="body" style={{ color: currentColors.text.main, fontWeight: '500', fontSize: 16 }}>
                    Continue with Email
                  </Text>
                </Pressable>

                <Box className="flex flex-row w-full justify-between" style={{ gap: 8 }}>
                  {OAUTH_PROVIDERS.map((provider) => (
                    <Pressable
                      onPress={() => oauth.login({ provider: provider.key })}
                      disabled={oauth.state.status === "loading"}
                      className="flex-1 items-center justify-center py-4 rounded-xl active:scale-98"
                      style={{
                        backgroundColor: currentColors.background + '60',
                        borderWidth: 1,
                        borderColor: currentColors.neutral[400],
                        opacity: oauth.state.status === "loading" ? 0.6 : 1,
                        minHeight: 52
                      }}
                    >
                      <Text variant="body" style={{ color: currentColors.text.main, fontWeight: '500' }}>
                        {provider.label}
                      </Text>
                    </Pressable>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      )}

      {error && (
        <Box className="w-full mt-6 px-2" style={{ maxWidth: 400 }}>
          <Box
            className="rounded-xl px-5 py-4 flex-row items-center"
            style={{
              backgroundColor: currentColors.error.light,
              borderWidth: 1,
              borderColor: currentColors.error.main
            }}
          >
            <Text
              variant="body"
              className="flex-1"
              style={{
                color: currentColors.error.dark,
                fontWeight: '500'
              }}
            >
              {error}
            </Text>
          </Box>
        </Box>
      )}

      {/* TODO  */}
      {/* <Box className="mt-auto pt-8">
        <Text
          variant="caption"
          className="opacity-60 text-center px-8"
          style={{ lineHeight: 20 }}
        >
          By continuing, you agree to our{" "}
          <Text
            variant="caption"
            style={{
              color: currentColors.primary[500],
              fontWeight: '600'
            }}
          >
            Terms of Service
          </Text>
          {" "}and{" "}
          <Text
            variant="caption"
            style={{
              color: currentColors.primary[500],
              fontWeight: '600'
            }}
          >
            Privacy Policy
          </Text>
        </Text>
      </Box> */}
    </Box>
  );
}