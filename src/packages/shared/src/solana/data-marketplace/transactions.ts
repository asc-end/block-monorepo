import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import { marketplacePDAs, METADATA_PROGRAM_ID } from "./constants";
import type { MarketplaceProgram } from "./types";
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN } from '@coral-xyz/anchor';
import { timeToUnix } from "..";

/**
 * Create a new listing transaction
 */
export async function createListingTx(program: MarketplaceProgram, seller: PublicKey, startDate: Date, endDate: Date, pricePerDay: BN): Promise<Transaction> {
    const [marketplaceConfigPda] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const marketplaceData = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
  
    const currentListingCounter = new BN(marketplaceData.listingCounter);
    const [listing] = marketplacePDAs.getListing(currentListingCounter, program.programId);
    const [dataSeller] = marketplacePDAs.getSeller(seller, program.programId);
  
    const startTimestamp = new BN(Math.floor(startDate.getTime() / 1000));
    const endTimestamp = new BN(Math.floor(endDate.getTime() / 1000));

    return await program.methods
      .createListing(startTimestamp, endTimestamp, pricePerDay)
      .accountsPartial({
        seller,
        listing,
        marketplaceConfig: marketplaceConfigPda,
        dataSeller,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
  }
  
  /**
   * Update an existing listing transaction
   */
  export async function updateListingTx(program: MarketplaceProgram, seller: PublicKey, listingId: BN, newEndDate?: Date, newPricePerDay?: BN): Promise<Transaction> {
    const [listing] = marketplacePDAs.getListing(listingId, program.programId);
  
    const newEndTimestamp = newEndDate ? new BN(Math.floor(newEndDate.getTime() / 1000)) : null;
  
    return await program.methods
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
  export async function removeListingTx(program: MarketplaceProgram, seller: PublicKey, listingId: BN): Promise<Transaction> {
    const [listing] = marketplacePDAs.getListing(listingId, program.programId);
    const [dataSeller] = marketplacePDAs.getSeller(seller, program.programId);
  
    return program.methods
      .removeListing()
      .accountsPartial({ seller, listing, dataSeller })
      .transaction();
  }
  
  /**
   * Purchase a data pass transaction
   */
  export async function purchaseDataPassTx(
    program: MarketplaceProgram,
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
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const marketplaceData = await program.account.marketplaceConfig.fetch(marketplaceConfig);
  
    const [dataPass] = marketplacePDAs.getDataPass(new BN(marketplaceData.passCounter), program.programId);
    const [passNftMint] = marketplacePDAs.getPassNftMint(dataPass, program.programId);
  
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
  
    return await program.methods
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
  
  /**
   * Claim revenue transaction
   */
  export async function claimRevenueTx(program: MarketplaceProgram, seller: PublicKey, periodId: BN, amount: BN, merkleProof: number[][]): Promise<Transaction> {
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);
    const [revenueClaim] = marketplacePDAs.getRevenueClaim(seller, periodId, program.programId);
    const [dataSeller] = marketplacePDAs.getSeller(seller, program.programId);
  
    const tx = await program.methods
      .claimRevenue(amount, merkleProof)
      .accountsPartial({
        seller,
        merkleDistributor,
        marketplaceConfig,
        revenueClaim,
        dataSeller,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
  
    return tx;
  }

  export async function updateMerkleRootTx(program: MarketplaceProgram, authority: PublicKey, periodId: BN, merkleRoot: number[]): Promise<Transaction> {
    const [marketplaceConfig] = marketplacePDAs.getMarketplaceConfig(program.programId);
    const [merkleDistributor] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

    return await program.methods
      .updateMerkleRoot(merkleRoot)
      .accountsPartial({
        authority,
        marketplaceConfig,
        merkleDistributor,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
  }