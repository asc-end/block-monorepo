import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {getAssociatedTokenAddress } from "@solana/spl-token";
import { expect } from "chai";
import BN from "bn.js";
import { createListingTx, purchaseDataPassTx, marketplacePDAs, calculateDataPassPayment } from "@blockit/shared";
import { getMarketplaceConfig, getPass, getPassCounter, initializeMarketplaceIfNeeded, mockMerkleRoot, timeToUnix, createEligibilityMerkleRoot } from "./utils";

describe("Data Marketplace - Buyer Behavior", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const buyer1 = Keypair.generate();
  const buyer2 = Keypair.generate();
  const buyer3 = Keypair.generate();
  const seller1 = Keypair.generate();
  const seller2 = Keypair.generate();
  const seller3 = Keypair.generate();

  // PDAs
  let marketplaceConfigPda: PublicKey;
  
  // Track pass IDs for specific buyers
  let buyer1FirstPassId: BN;
  let buyer2PassId: BN;

  before(async () => {
    // Airdrop SOL to test accounts
    await Promise.all([
      provider.connection.requestAirdrop(buyer1.publicKey, 100 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer2.publicKey, 100 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer3.publicKey, 350 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller1.publicKey, 10 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller2.publicKey, 10 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller3.publicKey, 10 * LAMPORTS_PER_SOL),
    ]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);


    // Create listings for testing
    // Seller 1: Premium price, long period

    let startDate = new BN(1704067200); // Jan 1, 2024
    let endDate = new BN(1735689600);   // Jan 1, 2025
    let pricePerDay = new BN(5 * LAMPORTS_PER_SOL); // 5 SOL/day

    let tx = await createListingTx( program, seller1.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay
);
    await provider.sendAndConfirm(tx, [seller1]);

    startDate = new BN(1704067200); // Jan 1, 2024
    endDate = new BN(1719792000);   // Jul 1, 2024
    pricePerDay = new BN(2 * LAMPORTS_PER_SOL); // 2 SOL/day

    // Seller 2: Mid-range price
    tx = await createListingTx( program, seller2.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
    await provider.sendAndConfirm(tx, [seller2]);

    startDate = new BN(1704067200); // Jan 1, 2024
    endDate = new BN(1711929600);   // Apr 1, 2024
    pricePerDay = new BN(0.5 * LAMPORTS_PER_SOL); // 0.5 SOL/day

    // Seller 3: Budget price
    tx = await createListingTx( program, seller3.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
    await provider.sendAndConfirm(tx, [seller3]);
  });

  describe("Purchase Strategies", () => {
    it("should allow budget-conscious buyer to purchase only cheap listings", async () => {
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(1 * LAMPORTS_PER_SOL); // Only willing to pay 1 SOL/day

      // Get pass counter before purchase
      const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      const passId = configBefore.passCounter;
      buyer1FirstPassId = passId; // Track buyer1's first pass

      // This should only include seller3 (0.5 SOL/day)
      const eligibility = createEligibilityMerkleRoot([seller3.publicKey]);
      const tx = await purchaseDataPassTx( program, buyer1.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer1]);

      const dataPass = await getPass(program, passId);
      
      expect(dataPass.eligibleSellerCount).to.equal(1);
      const expectedPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(expectedPayment.toString());
    });

    it("should allow premium buyer to access all listings", async () => {
      const passStartDate = new BN(1704672000); // Jan 8, 2024
      const passEndDate = new BN(1705190400);   // Jan 14, 2024
      const maxPricePerDay = new BN(10 * LAMPORTS_PER_SOL); // Willing to pay up to 10 SOL/day



      // Get pass counter before purchase
      const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      const passId = configBefore.passCounter;
      buyer2PassId = passId; // Track buyer2's pass

      const sellers = [seller1.publicKey, seller2.publicKey, seller3.publicKey];
      const eligibility = createEligibilityMerkleRoot(sellers);

      await provider.connection.requestAirdrop(buyer2.publicKey, (7 * eligibility.count + 10) * maxPricePerDay.toNumber());

      
      const tx = await purchaseDataPassTx( program, buyer2.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer2]);

      const dataPass = await getPass(program, passId);
      
      expect(dataPass.eligibleSellerCount).to.equal(3);
      // Total payment is based on buyer's max price, not actual seller prices
      const expectedPayment = calculateDataPassPayment( passStartDate,  passEndDate,  maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(expectedPayment.toString());
    });
  });

  describe("Multiple Purchases", () => {
    it("should allow buyer to purchase multiple passes for different periods", async () => {
      // First purchase: January
      let passStartDate = new BN(1704067200); // Jan 1, 2024
      let passEndDate = new BN(1706659200);   // Jan 31, 2024
      const maxPricePerDay = new BN(3 * LAMPORTS_PER_SOL);
      const eligibility = createEligibilityMerkleRoot([seller2.publicKey, seller3.publicKey]);

      await provider.connection.requestAirdrop(buyer3.publicKey, (30 * eligibility.count + 1) * maxPricePerDay.toNumber());

      let tx = await purchaseDataPassTx( program, buyer3.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer3]);

      // Second purchase: February
      passStartDate = new BN(1706745600); // Feb 1, 2024
      passEndDate = new BN(1709164800);   // Feb 29, 2024

      await provider.connection.requestAirdrop(buyer3.publicKey, (30 * eligibility.count + 1) * maxPricePerDay.toNumber());

      tx = await purchaseDataPassTx( program, buyer3.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer3]);

      // Third purchase: March (only seller3 still active)
      passStartDate = new BN(1709251200); // Mar 1, 2024
      passEndDate = new BN(1711843200);   // Mar 31, 2024
      const eligibility2 = createEligibilityMerkleRoot([seller3.publicKey]);

      tx = await purchaseDataPassTx( program, buyer3.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility2);
      await provider.sendAndConfirm(tx, [buyer3]);

      // Verify all passes exist
      const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      expect(config.passCounter.toNumber()).to.be.at.least(5);
    });
  });

  describe("NFT Pass Management", () => {
    it("should mint unique NFT for each data pass", async () => {
      // Get pass NFT details for buyer1's first pass
      const [dataPassPda] = marketplacePDAs.getDataPass(buyer1FirstPassId, program.programId);
      const [passNftMintPda] = marketplacePDAs.getPassNftMint(dataPassPda, program.programId);

      // Get buyer's token account
      const buyerTokenAccount = await getAssociatedTokenAddress(
        passNftMintPda,
        buyer1.publicKey
      );

      // Check token balance (should be 1)
      const tokenBalance = await provider.connection.getTokenAccountBalance(buyerTokenAccount);
      expect(tokenBalance.value.amount).to.equal("1");
    });

    it("should have correct NFT metadata", async () => {
      // Use buyer2's tracked pass ID
      const dataPass = await getPass(program, buyer2PassId);

      // Verify pass data is stored correctly
      expect(dataPass.buyer.toString()).to.equal(buyer2.publicKey.toString());
      expect(dataPass.passId.toString()).to.equal(buyer2PassId.toString());
      
      // NFT represents access rights
      expect(dataPass.eligibleSellerCount).to.equal(3);
      expect(dataPass.eligibilityMerkleRoot).to.not.be.null;
    });
  });

  describe("Payment Calculations", () => {
    // TODO: I don't think buyer should be able to purchase a pass for a partial day.
    // The pass should be for the entire day.
    it("should calculate correct payment for partial day", async () => {
      // Purchase for 1.5 days (36 hours)
      const passStartDate = new BN(1704067200); // Jan 1, 2024 00:00
      const passEndDate = new BN(1704196800);   // Jan 2, 2024 12:00 (1.5 days)
      const maxPricePerDay = new BN(1 * LAMPORTS_PER_SOL);

      // Get pass counter before purchase
      const passId = await getPassCounter(program);

      const eligibility = createEligibilityMerkleRoot([seller3.publicKey]);
      const tx = await purchaseDataPassTx( program, buyer1.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer1]);

      const dataPass = await getPass(program, passId);
      
      // Should pay for 2 full days at buyer's max price
      const expectedPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(expectedPayment.toString());
    });

    it("should handle exact day boundaries", async () => {
      // Purchase for exactly 7 days
      const passStartDate = new BN(1704067200); // Jan 1, 2024 00:00
      const passEndDate = new BN(1704585600);   // Jan 7, 2024 00:00 (exactly 6 days)
      const maxPricePerDay = new BN(3 * LAMPORTS_PER_SOL);

      // Get pass counter before purchase
      const passId = await getPassCounter(program);
      const eligibility = createEligibilityMerkleRoot([seller2.publicKey, seller3.publicKey]);

      const tx = await purchaseDataPassTx( program, buyer2.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer2]);

      const dataPass = await getPass(program, passId);
      
      // Should pay for exactly 7 days at buyer's max price
      const expectedPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(expectedPayment.toString());
    });
  });

  describe("Access Rights", () => {
    it("should snapshot seller list at purchase time", async () => {
      const passStartDate = new BN(1705276800); // Jan 15, 2024
      const passEndDate = new BN(1705363200);   // Jan 16, 2024
      const maxPricePerDay = new BN(10 * LAMPORTS_PER_SOL);

      // Get pass counter before purchase
      const passId = await getPassCounter(program);

      // Purchase with specific merkle root
      const eligibility = createEligibilityMerkleRoot([seller2.publicKey, seller3.publicKey]);
      const tx = await purchaseDataPassTx(program,buyer1.publicKey,timeToUnix(passStartDate),timeToUnix(passEndDate),maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer1]);

      const dataPass = await getPass(program, passId);
      
      // Verify snapshot is stored
      expect(dataPass.eligibilityMerkleRoot).to.not.be.null;
      expect(dataPass.eligibilityMerkleRoot[0]).to.equal(eligibility.merkleRoot[0]);
      expect(dataPass.eligibleSellerCount).to.equal(eligibility.count);
    });

    it("should handle overlapping purchase periods", async () => {
      // First purchase: Jan 20-25
      let passStartDate = new BN(1705708800); // Jan 20, 2024
      let passEndDate = new BN(1706140800);   // Jan 25, 2024
      const maxPricePerDay = new BN(3 * LAMPORTS_PER_SOL);
      const passCounterBefore = await getPassCounter(program);

      const eligibility = createEligibilityMerkleRoot([seller2.publicKey, seller3.publicKey]);

      let tx = await purchaseDataPassTx( program, buyer3.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer3]);

      // Overlapping purchase: Jan 23-28
      passStartDate = new BN(1705968000); // Jan 23, 2024
      passEndDate = new BN(1706400000);   // Jan 28, 2024

      tx = await purchaseDataPassTx( program, buyer3.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer3]);

      // Both passes should exist independently
      const passCounter = await getPassCounter(program);
      expect(passCounter.toNumber()).to.be.at.least(passCounterBefore.toNumber() + 2);
    });
  });

  describe("Buyer Pool Contributions", () => {
    it("should track total pool contributions", async () => {
      const passStartDate = new BN(1706486400); // Jan 29, 2024
      const passEndDate = new BN(1706572800);   // Jan 30, 2024
      const maxPricePerDay = new BN(5 * LAMPORTS_PER_SOL);

      // Get pass counter and total pool balance before purchase
      const passId = await getPassCounter(program);

      const eligibility = createEligibilityMerkleRoot([seller2.publicKey, seller3.publicKey]);
      const tx = await purchaseDataPassTx( program, buyer1.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer1]);

      // Get marketplace config balance after purchase
      const configAfter = await getMarketplaceConfig(program);

      // Pool should have increased by payment amount
      const dataPass = await getPass(program, passId);
      expect(configAfter.currentPeriodRevenue.toNumber()).to.be.at.least(dataPass.totalPaid.toNumber());

    });
  });
});