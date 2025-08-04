import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import { marketplacePDAs, METADATA_PROGRAM_ID } from "./constants";
import type { MarketplaceProgram } from "./types";
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Instruction, Program } from '@coral-xyz/anchor';
import { timeToUnix } from "..";
import idl from "../../../../../back/programs/target/idl/data_marketplace.json" with { type: "json" };
import BN from "bn.js"

let program: MarketplaceProgram | null = null;

function getProgram(): MarketplaceProgram {
  if (!program) {
    const connection = new Connection("https://api.devnet.solana.com");
    program = new Program(idl, { connection });
  }
  return program;
}
program = getProgram();

/**
 * Create a new listing transaction
 */
export async function createListingTx(seller: PublicKey | string, startDate: Date, endDate: Date, pricePerDay: BN | number | string): Promise<Transaction> {
  if (typeof seller === 'string') {
    seller = new PublicKey(seller);
  }
  if (typeof pricePerDay === 'number' || typeof pricePerDay === 'string') {
    pricePerDay = new BN(pricePerDay);
  }
  try {
    const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig();
    const marketplaceData = await program!.account.marketplaceConfig.fetch(marketplaceConfigPda);

    const currentListingCounter = new BN(marketplaceData.listingCounter);
    const [listing] = marketplacePDAs.getListing(currentListingCounter);
    const [dataSeller] = marketplacePDAs.getSeller(seller);

    const startTimestamp = new BN(Math.floor(startDate.getTime() / 1000));
    const endTimestamp = new BN(Math.floor(endDate.getTime() / 1000));

    return await program!.methods
      .createListing(startTimestamp, endTimestamp, pricePerDay)
      .accountsPartial({
        seller,
        listing,
        marketplaceConfig: marketplaceConfigPda,
        dataSeller,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
  } catch (e) {
    console.log("Error creating listing", e)
    throw e
  }
}

/**
 * Update an existing listing transaction
 */
export async function updateListingTx(seller: PublicKey | string, listingId: BN | number | string, newEndDate?: Date, newPricePerDay?: BN | number | string): Promise<Transaction> {
  if (typeof seller === 'string') {
    seller = new PublicKey(seller);
  }
  if (typeof listingId === 'number' || typeof listingId === 'string') {
    listingId = new BN(listingId);
  }
  if (typeof newPricePerDay === 'number' || typeof newPricePerDay === 'string') {
    newPricePerDay = new BN(newPricePerDay);
  }
  const [listing] = marketplacePDAs.getListing(listingId, program!.programId);

  const newEndTimestamp = newEndDate ? new BN(Math.floor(newEndDate.getTime() / 1000)) : null;

  return await program!.methods
    .updateListing(newEndTimestamp, newPricePerDay ?? null)
    .accountsPartial({
      seller,
      listing,
    })
    .transaction();
}

/**
 * Remove a listing transaction
 */
export async function removeListingTx(seller: PublicKey | string, listingId: BN | number | string): Promise<Transaction> {
  if (typeof seller === 'string') {
    seller = new PublicKey(seller);
  }
  if (typeof listingId === 'number' || typeof listingId === 'string') {
    listingId = new BN(listingId);
  }
  const [listing] = marketplacePDAs.getListing(listingId, program!.programId);
  const [dataSeller] = marketplacePDAs.getSeller(seller, program!.programId);

  return program!.methods
    .removeListing()
    .accountsPartial({ seller, listing, dataSeller })
    .transaction();
}

/**
 * Purchase a data pass transaction
 */
export async function purchaseDataPassTx(
  buyer: PublicKey,
  startDate: Date,
  endDate: Date,
  maxPricePerDay: BN,
  eligibility: {
    count: number,
    merkleRoot: number[],
    countProof: number[][]
  }
): Promise<Transaction> {
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program!.programId);
  const marketplaceData = await program!.account.marketplaceConfig.fetch(marketplaceConfig);

  const [dataPass] = marketplacePDAs.getDataPass(new BN(marketplaceData.passCounter), program!.programId);
  const [passNftMint] = marketplacePDAs.getPassNftMint(dataPass, program!.programId);

  const buyerTokenAccount = await getAssociatedTokenAddress(passNftMint, buyer);

  // Derive metadata account PDA
  const [metadataAccount] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      passNftMint.toBuffer()
    ],
    METADATA_PROGRAM_ID
  );

  const startTimestamp = new BN(Math.floor(startDate.getTime() / 1000));
  const endTimestamp = new BN(Math.floor(endDate.getTime() / 1000));

  return await program!.methods
    .purchaseDataPass(
      startTimestamp,
      endTimestamp,
      maxPricePerDay,
      eligibility.merkleRoot,
      eligibility.count,
      eligibility.countProof
    )
    .accountsPartial({
      buyer,
      dataPass,
      marketplaceConfig,
      passNftMint,
      buyerNftAccount: buyerTokenAccount,
      metadataAccount: metadataAccount,

      tokenProgram: TOKEN_PROGRAM_ID,
      tokenMetadataProgram: METADATA_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .transaction();
}


export async function claimRevenueIx(seller: PublicKey | string, periodId: BN | number | string, amount: BN | number | string, merkleProof: number[][]): Promise<TransactionInstruction> {
  if (typeof seller === 'string') {
    seller = new PublicKey(seller);
  }
  if (typeof periodId === 'number' || typeof periodId === 'string') {
    periodId = new BN(periodId);
  }
  if (typeof amount === 'number' || typeof amount === 'string') {
    amount = new BN(amount);
  }
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program!.programId);
  const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(periodId, program!.programId);
  const [revenueClaim] = marketplacePDAs.getRevenueClaim(seller, periodId, program!.programId);
  const [dataSeller] = marketplacePDAs.getSeller(seller, program!.programId);

  const ix = await program!.methods
    .claimRevenue(amount, merkleProof)
    .accountsPartial({
      seller,
      merkleDistributor,
      marketplaceConfig,
      revenueClaim,
      dataSeller,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  return ix;
}

/**
 * Claim revenue transaction
 */
export async function claimRevenueTx(seller: PublicKey | string, periodId: BN | number, amount: BN | number, merkleProof: number[][]): Promise<Transaction> {
  const ix = await claimRevenueIx(seller, periodId, amount, merkleProof);
  const tx = new Transaction();
  tx.add(ix);

  return tx;
}


export async function updateMerkleRootTx(authority: PublicKey, periodId: BN, merkleRoot: number[]): Promise<Transaction> {
  const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program!.programId);
  const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(periodId, program!.programId);

  return await program!.methods
    .updateMerkleRoot(merkleRoot)
    .accountsPartial({
      authority,
      marketplaceConfig,
      merkleDistributor,
      systemProgram: SystemProgram.programId,
    })
    .transaction();
}