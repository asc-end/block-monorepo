import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { marketplacePDAs } from './index';
import type { DataListingAccount, DataPassAccount, MarketplaceProgram } from './types';

// Query helpers for the frontend

/**
 * Get marketplace statistics
 */
export async function getMarketplaceStats(
  program: MarketplaceProgram
): Promise<{
  totalPoolBalance: BN;
  totalLifetimeRevenue: BN;
  listingCounter: BN;
  passCounter: BN;
  currentPeriod: BN;
}> {
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfig);
  
  return {
    totalPoolBalance: config.currentPeriodRevenue,
    totalLifetimeRevenue: config.totalLifetimeRevenue,
    listingCounter: config.listingCounter,
    passCounter: config.passCounter,
    currentPeriod: config.snapshotPeriod,
  };
}

/**
 * Get all active listings
 */
export async function getActiveListings(
  program: MarketplaceProgram,
  maxPrice?: BN
): Promise<DataListingAccount[]> {
  const now = new BN(Math.floor(Date.now() / 1000));
  const allListings = await program.account.dataListing.all();
  
  return allListings
    .filter(l => {
      const listing = l.account;
      const isActive = listing.startDate.lte(now) && listing.endDate.gte(now);
      const priceOk = !maxPrice || listing.pricePerDay.lte(maxPrice);
      return isActive && priceOk;
    })
    .map(l => l.account);
}

/**
 * Get buyer's data passes
 */
export async function getBuyerPasses(
  program: MarketplaceProgram,
  buyer: PublicKey
): Promise<DataPassAccount[]> {
  const passes = await program.account.dataPass.all([
    {
      memcmp: {
        offset: 8 + 8, // After discriminator + pass_id
        bytes: buyer.toBase58(),
      },
    },
  ]);
  
  return passes.map(p => p.account);
}

/**
 * Check if seller has unclaimed revenue
 */
export async function getSellerUnclaimedRevenue(
  program: MarketplaceProgram,
  seller: PublicKey
): Promise<BN> {
  const [dataSeller] = marketplacePDAs.getSeller(seller, program.programId);
  
  try {
    const sellerAccount = await program.account.dataSeller.fetch(dataSeller);
    return sellerAccount.unclaimedRevenue;
  } catch {
    return new BN(0);
  }
}

/**
 * Get seller's listing if exists
 */
export async function getSellerListing( program: MarketplaceProgram, seller: PublicKey ): Promise<DataListingAccount | null> {
  const [dataSeller] = marketplacePDAs.getSeller(seller, program.programId);
  
  try {
    const sellerAccount = await program.account.dataSeller.fetch(dataSeller);
    if (sellerAccount.listingId) {
      const [listing] = marketplacePDAs.getListing(sellerAccount.listingId, program.programId);
      const listingAccount = await program.account.dataListing.fetch(listing);
      return listingAccount;
    }
  } catch {
    // Seller or listing doesn't exist
  }
  
  return null;
}

/**
 * Calculate total cost for a data pass
 */
export function calculatePassCost( listings: DataListingAccount[], startDate: Date, endDate: Date ): BN {
  const start = new BN(Math.floor(startDate.getTime() / 1000));
  const end = new BN(Math.floor(endDate.getTime() / 1000));
  const days = end.sub(start).div(new BN(86400)).add(new BN(1));
  
  // Find the maximum price per day among all listings
  const maxPrice = listings.reduce((max, listing) => {
    return listing.pricePerDay.gt(max) ? listing.pricePerDay : max;
  }, new BN(0));
  
  return maxPrice.mul(days);
}