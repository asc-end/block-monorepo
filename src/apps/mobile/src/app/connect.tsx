import { useLoginWithOAuth, useLoginWithFarcaster, useLoginWithEmail, OAuthProviderType, useLoginWithSiws } from "@privy-io/expo";
import { Login} from '@blockit/ui';
import { SolanaConnectButton } from '@/components/connection/SolanaConnectButton';

export default function Connect() {
  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { login, state } = useLoginWithOAuth();

  return (
    <Login
      useLoginWithEmail={() => ({ sendCode, loginWithCode })}
      useLoginWithOAuth={() => ({
        state: { status: state.status },
        login: ({ provider }: { provider: string }) => login({ provider: provider as OAuthProviderType }).then(() => { }),
      })}
      loginWithFarcaster={() => Promise.resolve()}
      solanaConnectButton={<SolanaConnectButton />} />
  );
}