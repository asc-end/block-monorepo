import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

interface UseUserCreationParams {
  user: any;
  isReady: boolean;
  getAccessToken: () => Promise<string | null>;
  walletAddress?: string;
}

export const useUserCreation = ({ user, isReady, getAccessToken, walletAddress }: UseUserCreationParams) => {
  const { setToken, apiClient } = useAuthStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createUser = async () => {
      if (!isReady || !user || !walletAddress || isCreated) return;

      setIsCreating(true);
      try {
        // Get and set access token first
        const token = await getAccessToken();
        if (!token) {
          throw new Error('No access token available');
        }
        
        setToken(token);

        // Create user
        await apiClient.post('/users/create', { walletAddress });
        
        setIsCreated(true);
        setError(null);
      } catch (err) {
        console.error('Error creating user:', err);
        setError('Failed to create user');
      } finally {
        setIsCreating(false);
      }
    };

    createUser();
  }, [isReady, user, walletAddress]);

  return { isCreating, isCreated, error };
};