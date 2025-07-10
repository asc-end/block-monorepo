import { useEffect, useCallback, useRef, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

interface UseUserCreationParams {
  user: any;
  isReady: boolean;
  getAccessToken: () => Promise<string | null>;
  walletAddress?: string;
}

export const useUserCreation = ({
  user,
  isReady,
  getAccessToken,
  walletAddress,
}: UseUserCreationParams) => {
  const { setToken, apiClient } = useAuthStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent duplicate user creation attempts
  const hasAttemptedRef = useRef(false);

  const createUser = useCallback(async () => {
    if (!isReady || !user || !walletAddress || isCreated || isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      // Always ensure token is set before creating user
      const token = await getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }
      setToken(token);

      await apiClient.post('/users/create', { walletAddress });
      setIsCreated(true);
    } catch (err: any) {
      // Try to extract a more specific error message if available
      let message = 'Failed to create user';
      if (err?.response?.data?.error) {
        message = err.response.data.error;
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
      console.error('Error creating user:', err);
    } finally {
      setIsCreating(false);
    }
  }, [isReady, user, walletAddress, isCreated, isCreating, getAccessToken, setToken, apiClient]);

  useEffect(() => {
    if (isReady && user && walletAddress && !isCreated && !isCreating && !hasAttemptedRef.current) {
      hasAttemptedRef.current = true;
      createUser();
    } else if (!isReady || !user || !walletAddress) {
      hasAttemptedRef.current = false;
    }
  }, [isReady, user, walletAddress, isCreated, isCreating, createUser]);

  return { isCreating, isCreated, error, createUser };
};