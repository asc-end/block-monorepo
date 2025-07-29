import { useQuery } from '@tanstack/react-query';
import { api } from '@blockit/ui';
import { useSolana } from './useSolana';

interface SellerProof {
  sellerAddress: string;
  periodId: string;
  amount: string;
  proof: any; // JSON type, typically number[][]
  claimed: boolean;
  claimedAt: Date | null;
  createdAt: Date;
}

interface SellerDashboardData {
  earnings: {
    total: string;
    pending: string;
    claimed: string;
  };
  proofs: SellerProof[] | undefined;
  listing: {
    isActive: boolean;
    pricePerDay: string;
    updatedAt: Date;
    endDate: Date;
    listingId: string;
    sellerAddress: string;
    startDate: Date;
    accountAddress: string;
} | null | undefined
}

export const useSellerDashboard = () => {
  const { walletAddress } = useSolana();

  return useQuery<SellerDashboardData>({
    queryKey: ['sellerDashboard', walletAddress],
    queryFn: async () => {
      if (!walletAddress) {
        throw new Error('No wallet address available');
      }

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
    enabled: !!walletAddress,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};