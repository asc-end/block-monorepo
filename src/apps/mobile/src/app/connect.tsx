import { useLoginWithOAuth, useLoginWithFarcaster, useLoginWithEmail } from "@privy-io/expo";
import { Login } from '@blockit/ui';

export default function Connect() {
  const { loginWithFarcaster } = useLoginWithFarcaster();


  return (
    <Login 
      useLoginWithEmail={useLoginWithEmail}

      useLoginWithOAuth={useLoginWithOAuth}
      loginWithFarcaster={loginWithFarcaster} />
  );
}