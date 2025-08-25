import { useEffect, useState } from 'react';
import { sendMessageToExtension } from '../lib/sendMessageToExtension';
import { usePrivy } from '@privy-io/react-auth';
import { createUser, useAuthStore } from '@blockit/ui';

export function Connect() {
  const { ready, authenticated, getAccessToken, login, user } = usePrivy();
  const { setToken } = useAuthStore();
  const [status, setStatus] = useState<'connecting' | 'waiting_auth' | 'success' | 'error'>('connecting');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [extensionId, setExtensionId] = useState<string>('');

  useEffect(() => {
    // Get extension ID from URL on mount
    const params = new URLSearchParams(window.location.search);
    const extId = params.get('extensionId');
    if (extId) {
      setExtensionId(extId);
    }
  }, []);

  useEffect(() => {
    const handleConnection = async () => {
      try {
        // Wait for Privy to be ready
        if (!ready) return;

        // Get connection parameters from URL
        const params = new URLSearchParams(window.location.search);

        if (!extensionId) {
          throw new Error('Missing extension ID');
        }

        // If not authenticated, show login prompt
        if (!authenticated) {
          setStatus('waiting_auth');
          return;
        }

        // If authenticated, get the current access token
        const authToken = await getAccessToken();
        if (!authToken) {
          throw new Error('No authentication token available');
        }

        // Set token in auth store
        setToken(authToken);
        
        // Create user if needed
        if (user?.wallet?.address) {
          await createUser(user.wallet.address);
        }

        console.log("send token")
        // Send auth token to extension using the proper API
        await sendMessageToExtension({
          type: 'AUTH_TOKEN',
          token: authToken,
          extensionId
        }, window);

        // Store connection info
        localStorage.setItem('blockit_extension_connected', 'true');
        localStorage.setItem('blockit_extension_id', extensionId);

        setStatus('success');
        
        // Close window or redirect based on source
        setTimeout(() => {
          if (params.get('source') === 'extension') {
            // Try multiple methods to close the window
            try {
              window.close();
            } catch (e) {
              // If window.close() fails, try to use opener
              if (window.opener) {
                window.opener = null;
              }
              window.close();
            }
            // If still open, show a message
            setTimeout(() => {
              if (!window.closed) {
                setStatus('success');
                console.log('Window could not be closed automatically. You can close this tab.');
              }
            }, 100);
          } else {
            window.location.href = '/';
          }
        }, 2000);
      } catch (error) {
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Connection failed');
      }
    };

    handleConnection();
  }, [ready, authenticated, getAccessToken, extensionId, user, setToken]);

  const handleLogin = () => {
    login({ loginMethods: ["email", "farcaster", "github", "twitter", "telegram"] });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        {status === 'connecting' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2">Connecting Extension</h1>
            <p className="text-gray-400">Please wait while we establish connection...</p>
          </>
        )}

        {status === 'waiting_auth' && (
          <>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
            <p className="text-gray-400 mb-6">Please sign in to connect your Blockit extension</p>
            <button
              onClick={handleLogin}
              className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Sign In
            </button>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Connection Successful!</h1>
            <p className="text-gray-400 mb-2">Your extension has been connected.</p>
            <p className="text-gray-500 text-sm">This window will close automatically, or you can close it manually.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Connection Failed</h1>
            <p className="text-gray-400 mb-4">{errorMessage}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}