import { Program, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import type { DataMarketplace } from "../../../../../back/programs/target/types/data_marketplace";

export type MarketplaceProgram = Program<DataMarketplace>;

// Or if you want to be more specific without the full IDL:
export interface DataMarketplaceProgram extends Program {
  account: {
    marketplaceConfig: any;
    dataListing: any;
    dataSeller: any;
    dataPass: any;
    merkleDistributor: any;
    sellerRevenueClaim: any;
  };
  methods: any;
}

// Re-export the data structures with proper types
export interface DataListingAccount {
  listingId: BN;
  seller: PublicKey;
  startDate: BN;
  endDate: BN;
  pricePerDay: BN;
  bump: number;
}

export interface DataPassAccount {
  passId: BN;
  buyer: PublicKey;
  startDate: BN;
  endDate: BN;
  maxPricePerDay: BN;
  totalPaid: BN;
  dataNftMint: PublicKey;
  purchasedAt: BN;
  eligibilityMerkleRoot: number[];
  eligibleSellerCount: number;
  bump: number;
}

export interface DataSellerAccount {
  seller: PublicKey;
  listingId: BN | null;
  totalRevenue: BN;
  unclaimedRevenue: BN;
  bump: number;
}

export interface MarketplaceConfigAccount {
  authority: PublicKey;
  currentPeriodRevenue: BN;
  totalLifetimeRevenue: BN;
  listingCounter: BN;
  passCounter: BN;
  snapshotPeriod: BN;
  bump: number;
}

export interface RevenueClaimAccount {
  seller: PublicKey;
  periodId: BN;
  amountClaimed: BN;
  claimTimestamp: BN;
  bump: number;
}

export interface MerkleDistributorAccount {
  merkleRoot: number[];
  totalPoolBalance: BN;
  snapshotTimestamp: BN;
  periodId: BN;
  totalClaims: BN;
  claimedAmount: BN;
  bump: number;
}