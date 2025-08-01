import { useQuery } from '@tanstack/react-query';
import { api, useAuthStore } from '@blockit/ui';
import { useSolana } from './solana/useSolana';

interface SellerProof {
  sellerAddress: string;
  periodId: string;
  amount: string;
  proof: any; // JSON type, typically number[][]
  claimed: boolean;
  claimedAt: Date | null;
  createdAt: Date;
}

interface SellerListing {
  id: string;
  listingId: string;
  sellerAddress: string;
  startDate: Date;
  endDate: Date;
  pricePerDay: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SellerDashboardData {
  earnings: {
    total: string;
    pending: string;
    claimed: string;
  };
  proofs: SellerProof[] | undefined;
  listing: SellerListing | null | undefined;
}

export const useSellerDashboard = () => {
  const { walletAddress } = useSolana();
  const { token } = useAuthStore();
  
  return useQuery<SellerDashboardData>({
    queryKey: ['sellerDashboard', walletAddress, token],
    queryFn: async () => {
      if (!walletAddress) throw new Error('No wallet address available');
      if (!token) throw new Error('No authentication token available');

      try {
        console.log('Fetching seller dashboard for:', walletAddress);
        const response = await api().get(`/marketplace/sellers/${walletAddress}`);
        console.log('Dashboard response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching seller dashboard:', error);
        if (error.response) {
          console.error('Response error:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        throw error;
      }
    },
    enabled: !!walletAddress && !!token,
    // No refetch interval - manual refetch only
  });
};