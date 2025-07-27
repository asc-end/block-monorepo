import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { createListingTx, updateListingTx, purchaseDataPassTx, calculateDataPassPayment,} from "@blockit/shared";
import { createEligibilityMerkleRoot, getListing, getListingCounter, getPass, getPassCounter, initializeMarketplaceIfNeeded, mockMerkleRoot, timeToUnix } from "./utils/test-helpers";

describe("Data Marketplace - Edge Cases", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const seller1 = Keypair.generate();
  const seller2 = Keypair.generate();
  const seller3 = Keypair.generate();
  const seller4 = Keypair.generate();
  const seller5 = Keypair.generate();
  const buyer = Keypair.generate();

  // PDAs
  let marketplaceConfigPda: PublicKey;

  // Track listing IDs
  let listingId1: BN;
  let listingId2: BN;
  let listingId3: BN;
  let listingId4: BN;
  let listingId5: BN;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(seller1.publicKey, 100 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(seller2.publicKey, 100 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(seller3.publicKey, 100 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(seller4.publicKey, 100 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(seller5.publicKey, 100 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(buyer.publicKey, 10000 * LAMPORTS_PER_SOL); // More SOL for purchases

    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);

  });

  describe("Date Range Edge Cases", () => {
    it("should handle single day listing", async () => {
      listingId1 = await getListingCounter(program)

      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1704067200 + 86400); // Jan 2, 2024 (24 hours later)
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      const tx = await createListingTx( program, seller1.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller1]);

      const listing = await getListing(program, listingId1)

      expect(listing.startDate.toString()).to.equal(startDate.toString());
      expect(listing.endDate.toString()).to.equal(endDate.toString());
    });

    it("should handle very long date range (1 year)", async () => {
      listingId2 = await getListingCounter(program)

      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1735689600);   // Jan 1, 2025
      const pricePerDay = new BN(0.001 * LAMPORTS_PER_SOL); // Very low price for long period

      const tx = await createListingTx( program, seller2.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller2]);

      const daysDiff = endDate.sub(startDate).divn(86400).toNumber(); // Convert seconds to days
      expect(daysDiff).to.equal(366); // 2024 is a leap year
    });

    it("should handle leap year date (Feb 29)", async () => {
      listingId3 = await getListingCounter(program)

      const startDate = new BN(1709164800); // Feb 29, 2024
      const endDate = new BN(1709164800 + 86400); // Mar 1, 2024 (24 hours later)
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      const tx = await createListingTx( program, seller3.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller3]);

      const listing = await getListing(program, listingId3)

      expect(listing.startDate.toString()).to.equal(startDate.toString());
      expect(listing.endDate.toString()).to.equal(endDate.toString());
    });
  });

  describe("Price Edge Cases", () => {
    it("should handle minimum price (1 lamport)", async () => {
      listingId4 = await getListingCounter(program)

      const startDate = new BN(1704067200);
      const endDate = new BN(1704153600);
      const pricePerDay = new BN(1); // 1 lamport

      const tx = await createListingTx( program, seller4.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller4]);

      const listing = await getListing(program, listingId4)
      expect(listing.pricePerDay.toString()).to.equal("1");
    });

    it("should handle very high price", async () => {
      listingId5 = await getListingCounter(program)

      const startDate = timeToUnix(new BN(1704067200));
      const endDate = timeToUnix(new BN(1704153600));
      const pricePerDay = new BN(1000 * LAMPORTS_PER_SOL); // 1000 SOL per day

      const tx = await createListingTx(program, seller5.publicKey, startDate, endDate, pricePerDay);
      await provider.sendAndConfirm(tx, [seller5]);

      const listing = await getListing(program, listingId5)
      expect(listing.pricePerDay.toString()).to.equal((1000 * LAMPORTS_PER_SOL).toString());
    });
  });

  describe("Purchase Edge Cases", () => {
    it("should handle purchasing single day pass", async () => {
      // Get the current pass counter before purchase
      const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      const passId = configBefore.passCounter;

      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704067200 + 86400);   // Jan 2, 2024
      const maxPricePerDay = new BN(1001 * LAMPORTS_PER_SOL); // Higher than listing price
      const eligibility = createEligibilityMerkleRoot([seller1.publicKey]);

      const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer]);

      const dataPass = await getPass(program, passId)

      // Verify the pass was created
      expect(dataPass.buyer.toString()).to.equal(buyer.publicKey.toString());
      expect(dataPass.startDate.toString()).to.equal(passStartDate.toString());
      expect(dataPass.endDate.toString()).to.equal(passEndDate.toString());
      expect(dataPass.maxPricePerDay.toString()).to.equal(maxPricePerDay.toString());

      // Verify total paid matches the calculation
      const totalPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(totalPayment.toString());
    });

    it("should handle purchasing with exact price match", async () => {
      // Get the current pass counter before purchase
      const passId = await getPassCounter(program)

      const passStartDate = new BN(1704153600); // Jan 2, 2024
      const passEndDate = new BN(1704153600 + 86400);   // Jan 3, 2024
      const maxPricePerDay = new BN(1000 * LAMPORTS_PER_SOL); // Exact match

      const eligibility = createEligibilityMerkleRoot([seller1.publicKey]);
      const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer]);

      const dataPass = await getPass(program, passId)

      // Verify the pass was created with correct values
      expect(dataPass.buyer.toString()).to.equal(buyer.publicKey.toString());
      expect(dataPass.maxPricePerDay.toString()).to.equal(maxPricePerDay.toString());

      const totalPayment = calculateDataPassPayment(passStartDate, passEndDate, maxPricePerDay, eligibility.count);
      expect(dataPass.totalPaid.toString()).to.equal(totalPayment.toString());
    });

    it("should handle large number of eligible sellers", async () => {
      // Get the current pass counter before purchase
      const passId = await getPassCounter(program)

      const passStartDate = new BN(1704240000); // Jan 3, 2024
      const passEndDate = new BN(1704240000 + 86400);   // Jan 4, 2024
      
      const maxPricePerDay = new BN(1);
      const largeSellerCount = 10000; // Large number passed to the transaction

      const sellers = Array(largeSellerCount).fill(null).map(() => Keypair.generate().publicKey);
      const eligibility = createEligibilityMerkleRoot(sellers);
      const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer]);

      const dataPass = await getPass(program, passId)

      expect(dataPass.buyer.toString()).to.equal(buyer.publicKey.toString());
      expect(dataPass.eligibleSellerCount).to.equal(largeSellerCount);
    });
  });

  describe("Update Listing Edge Cases", () => {
    it("should update only end date (leave price unchanged)", async () => {
      const newEndDate = new BN(1704326400); // Jan 4, 2024

      // First get current price
      const listingBefore = await getListing(program, listingId5)
      const originalPrice = listingBefore.pricePerDay;

      const tx = await updateListingTx(program, seller5.publicKey, listingId5, timeToUnix(newEndDate), originalPrice);
      await provider.sendAndConfirm(tx, [seller5]);

      const listingAfter = await getListing(program, listingId5)
      expect(listingAfter.endDate.toString()).to.equal(newEndDate.toString());
      expect(listingAfter.pricePerDay.toString()).to.equal(originalPrice.toString());
    });

    it("should update both end date and price", async () => {
      const listing = await getListing(program, listingId5)

      const newEndDate = listing.endDate.add(new BN(86400 * 7)); // 7 days later
      const newPrice = listing.pricePerDay.divn(2); // Half the price

      const tx = await updateListingTx(program, seller5.publicKey, listingId5, timeToUnix(newEndDate), newPrice);
      await provider.sendAndConfirm(tx, [seller5]);

      const listingAfter = await getListing(program, listingId5)
      expect(listingAfter.endDate.toString()).to.equal(newEndDate.toString());
      expect(listingAfter.pricePerDay.toString()).to.equal(newPrice.toString());
    });
  });

  describe("Counter Edge Cases", () => {
    it("should correctly increment listing counter with multiple listings", async () => {
      // Create multiple sellers
      const sellers = Array(5).fill(null).map(() => Keypair.generate());

      // Airdrop to all sellers
      await Promise.all( sellers.map(s => provider.connection.requestAirdrop(s.publicKey, 10 * LAMPORTS_PER_SOL)));
      await new Promise(resolve => setTimeout(resolve, 1000));

      const startCounter = (await program.account.marketplaceConfig.fetch(marketplaceConfigPda)).listingCounter.toNumber();

      // Each seller creates a listing
      for (let i = 0; i < sellers.length; i++) {
        const startDate = new BN(1704067200); // Jan 1, 2024
        const endDate = new BN(1704153600); // Jan 2, 2024

        const tx = await createListingTx( program, sellers[i].publicKey, timeToUnix(startDate), timeToUnix(endDate), new BN(LAMPORTS_PER_SOL));
        await provider.sendAndConfirm(tx, [sellers[i]]);
      }

      // Check counter
      const endCounter = (await program.account.marketplaceConfig.fetch(marketplaceConfigPda)).listingCounter.toNumber();
      expect(endCounter).to.equal(startCounter + 5);
    });

    it("should correctly increment pass counter with multiple purchases", async () => {
      const startPassCount = (await program.account.marketplaceConfig.fetch(marketplaceConfigPda)).passCounter.toNumber();

      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704067200 + 86400); // Jan 2, 2024

      const maxPricePerDay = new BN(2 * LAMPORTS_PER_SOL);

      // Make 3 more purchases
      for (let i = 0; i < 3; i++) {
        const eligibility = createEligibilityMerkleRoot([seller1.publicKey]);
        const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
        await provider.sendAndConfirm(tx, [buyer]);
      }

      // Check counter
      const endPassCount = (await program.account.marketplaceConfig.fetch(marketplaceConfigPda)).passCounter.toNumber();
      expect(endPassCount).to.equal(startPassCount + 3);
    });
  });
});