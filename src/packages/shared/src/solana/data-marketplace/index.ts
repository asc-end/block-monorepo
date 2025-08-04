import { PublicKey, SystemProgram } from '@solana/web3.js';
import BN from "bn.js"
import type { MarketplaceProgram } from './types';
import { MARKETPLACE_PROGRAM_ID, marketplacePDAs } from './constants';

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
  return Buffer.concat([
    seller.toBuffer() as unknown as Uint8Array, 
    amount.toArrayLike(Buffer, 'le', 8) as unknown as Uint8Array
  ]);
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

export * from './constants';
export * from './queries';
export * from './transactions';
export * from './types';