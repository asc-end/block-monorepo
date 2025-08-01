import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../../target/types/data_marketplace";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {  marketplacePDAs, createMerkleLeafData, updateMerkleRootTx, DataPassAccount, DataListingAccount, DataSellerAccount, RevenueClaimAccount, MarketplaceConfigAccount, MerkleDistributorAccount} from "@blockit/shared";

// Re-export marketplacePDAs for convenience
export { marketplacePDAs } from "@blockit/shared";

// Common test constants
export const CONFIRM_DELAY = 1000; // milliseconds to wait after airdrops

export const mockMerkleRoot = Array(32).fill(1);

// Helper to create a merkle root that includes seller count
export function createEligibilityMerkleRoot(sellerAddresses: PublicKey[]): {
  merkleRoot: number[];
  countProof: number[][];
  count: number;
} {
  const leaves: Buffer[] = [];
  const sellerCount = sellerAddresses.length;

  // Add count as first leaf
  const countLeaf = Buffer.alloc(32);
  countLeaf.writeUInt32LE(sellerCount, 0);
  leaves.push(keccak256(countLeaf));
  
  // Add seller addresses
  sellerAddresses.forEach(seller => {
    leaves.push(keccak256(seller.toBuffer()));
  });
  
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const countProof = tree.getProof(leaves[0]).map(p => Array.from(p.data));
  
  return {
    merkleRoot: Array.from(tree.getRoot()),
    countProof,
    count: sellerCount,
  };
}

// Common test dates (Unix timestamps)
export const TEST_DATES = {
  JAN_1_2024: new BN(1704067200),
  JAN_2_2024: new BN(1704067200 + 86400),
  JAN_7_2024: new BN(1704585600),
  JAN_31_2024: new BN(1706659200),
  FEB_29_2024: new BN(1709164800), // Leap year
  MAR_1_2024: new BN(1709164800 + 86400),
  JAN_1_2025: new BN(1735689600),
};

/**
 * Interface for seller claim data used in merkle tree generation
 */
export interface SellerClaim {
  seller: PublicKey;
  amount: BN;
}

/**
 * Initialize marketplace config if not already initialized
 */
export async function initializeMarketplaceIfNeeded(
  program: Program<DataMarketplace>,
  authority: PublicKey
): Promise<PublicKey> {
  const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);

  try {
    await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
    console.log("Marketplace already initialized, skipping initialization");
  } catch (error) {
    // Marketplace not initialized, so initialize it
    await program.methods
      .initializeMarketplace()
    .accountsStrict({
        marketplaceConfig: marketplaceConfigPda,
        program: program.programId,
        eventAuthority: program.programId,
        authority: authority,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    console.log("Marketplace initialized");
  }

  return marketplaceConfigPda;
}


/**
 * Create test accounts (sellers and buyers)
 */
export function createTestAccounts(count: number = 3): {
  sellers: Keypair[];
  buyers: Keypair[];
} {
  const sellers = Array(count).fill(null).map(() => Keypair.generate());
  const buyers = Array(count).fill(null).map(() => Keypair.generate());

  return { sellers, buyers };
}

/**
 * Create and update merkle root with funds distribution
 */
export async function setupMerkleDistribution(
  program: Program<DataMarketplace>,
  provider: anchor.AnchorProvider,
  authority: anchor.Wallet,
  periodId: BN,
  claims: SellerClaim[],
): Promise<{
  merkleTree: MerkleTree;
  merkleRoot: number[];
}> {
  // Create merkle tree
  const leaves = claims.map(claim => {
    const leafData = createMerkleLeafData(claim.seller, claim.amount);
    return keccak256(leafData);
  });

  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const merkleRoot = Array.from(merkleTree.getRoot());
  
  // Update merkle root on-chain
  const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
  await provider.sendAndConfirm(tx, []);

  return { merkleTree, merkleRoot };
}

/**
 * Get merkle proof for a specific claim
 */
export function getMerkleProof(
  merkleTree: MerkleTree,
  claim: SellerClaim
): number[][] {
  const leafData = createMerkleLeafData(claim.seller, claim.amount);
  const leaf = keccak256(leafData);
  const proof = merkleTree.getProof(leaf);
  return proof.map(p => Array.from(p.data));
}

/**
 * Get current counters from marketplace config
 */
export async function getMarketplaceCounters(
  program: Program<DataMarketplace>
): Promise<{
  listingCounter: BN;
  passCounter: BN;
  snapshotPeriod: BN;
}> {
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfig);
  
  return {
    listingCounter: config.listingCounter,
    passCounter: config.passCounter,
    snapshotPeriod: config.snapshotPeriod,
  };
}

/**
 * Calculate the number of days between two dates
 */
export function calculateDaysBetween(startDate: BN, endDate: BN): number {
  return Math.floor((endDate.toNumber() - startDate.toNumber()) / 86400) + 1;
}

/**
 * Generate mock merkle root for testing
 */
export function generateMockMerkleRoot(seed: number = 1): number[] {
  return Array(32).fill(seed);
}

/**
 * Wait for transaction confirmation with optional delay
 */
export async function waitForConfirmation(delay: number = CONFIRM_DELAY): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeriodId(program: Program<DataMarketplace>): Promise<BN> {
  const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
  return config.snapshotPeriod;
}

export async function getListingCounter(program: Program<DataMarketplace>): Promise<BN> {
  const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
  return config.listingCounter;
}

export async function getPassCounter(program: Program<DataMarketplace>): Promise<BN> {
  const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
  return config.passCounter;
}

export async function getListing(program: Program<DataMarketplace>, listingId: BN): Promise<DataListingAccount> {
  const [listingPda] = marketplacePDAs.getListing(listingId, program.programId);
  const listing = await program.account.dataListing.fetch(listingPda);
  return listing;
}

export async function getPass(program: Program<DataMarketplace>, passId: BN): Promise<DataPassAccount> {
  const [passPda] = marketplacePDAs.getDataPass(passId, program.programId);
  const pass = await program.account.dataPass.fetch(passPda);
  return pass;
}

export async function getSeller(program: Program<DataMarketplace>, seller: PublicKey): Promise<DataSellerAccount> {
  const [sellerPda] = marketplacePDAs.getSeller(seller, program.programId);
  const sellerAccount = await program.account.dataSeller.fetch(sellerPda);
  return sellerAccount;
}

export async function getRevenueClaim(program: Program<DataMarketplace>, seller: PublicKey, periodId: BN): Promise<RevenueClaimAccount> {
  const [revenueClaimPda] = marketplacePDAs.getRevenueClaim(seller, periodId, program.programId);
  const revenueClaim = await program.account.sellerRevenueClaim.fetch(revenueClaimPda);
  return revenueClaim;
}

export async function getMarketplaceConfig(program: Program<DataMarketplace>): Promise<MarketplaceConfigAccount> {
  const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);
  const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
  return config;
}

export async function getMerkleDistributor(program: Program<DataMarketplace>, periodId: BN): Promise<MerkleDistributorAccount> {
  const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);
  const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
  return distributor;
}