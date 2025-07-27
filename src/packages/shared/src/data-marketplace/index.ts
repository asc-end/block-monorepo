import { PublicKey, SystemProgram } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import type { MarketplaceProgram } from './types';

// Constants
export const MARKETPLACE_PROGRAM_ID = new PublicKey('5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj');
export const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// PDA derivation helpers
export const marketplacePDAs = {
  getMarketplaceConfig: (programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('marketplace_config')], programId),

  getSeller: (seller: PublicKey, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('seller'), seller.toBuffer()], programId),

  getListing: (listingId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('listing'), listingId.toArrayLike(Buffer, 'le', 8)], programId),

  getDataPass: (passId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('data_pass'), passId.toArrayLike(Buffer, 'le', 8)], programId),

  getPassNftMint: (dataPassPda: PublicKey, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('pass_nft'), dataPassPda.toBuffer()], programId),

  getMerkleDistributor: (periodId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([Buffer.from('merkle_distributor'), periodId.toArrayLike(Buffer, 'le', 8)], programId),

  getRevenueClaim: (seller: PublicKey, periodId: BN, programId = MARKETPLACE_PROGRAM_ID) =>
    PublicKey.findProgramAddressSync([
      Buffer.from('revenue_claim'),
      seller.toBuffer(),
      periodId.toArrayLike(Buffer, 'le', 8)
    ], programId),
};

// Helper to calculate data pass payment
export function calculateDataPassPayment(startDate: BN, endDate: BN, maxPricePerDay: BN, eligibleSellerCount: number): BN {
  const days = endDate.sub(startDate).div(new BN(86400));
  return maxPricePerDay.mul(days).mul(new BN(eligibleSellerCount));
}

// Helper to check if listing overlaps with date range
export function doesListingOverlapDateRange(listingStart: BN, listingEnd: BN, queryStart: BN, queryEnd: BN): boolean {
  return listingStart.lte(queryEnd) && listingEnd.gte(queryStart);
}

// Backend-specific helpers for merkle tree generation
export interface MerkleLeaf {
  seller: PublicKey;
  amount: BN;
}

export function createMerkleLeafData(seller: PublicKey, amount: BN): Buffer {
  return Buffer.concat([seller.toBuffer(), amount.toArrayLike(Buffer, 'le', 8)]);
}

// Create a snapshot merkle leaf that includes just the seller address
export function createSnapshotMerkleLeaf(seller: PublicKey): Buffer {
  return seller.toBuffer();
}

// Backend helpers (for reference)
export async function prepareUpdateMerkleRootAccounts(program: MarketplaceProgram, authority: PublicKey, periodId: BN) {
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

  return {
    accounts: {
      authority,
      marketplaceConfig,
      merkleDistributor,
      systemProgram: SystemProgram.programId,
    },
    signers: []
  };
}

export * from './queries';
export * from './transactions';
export * from './types';