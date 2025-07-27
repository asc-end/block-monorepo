import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { createListingTx, updateListingTx, removeListingTx, purchaseDataPassTx, claimRevenueTx, createMerkleLeafData, updateMerkleRootTx} from "@blockit/shared";
import { createEligibilityMerkleRoot, getListing, getListingCounter, getPass, getPassCounter, getPeriodId, getSeller, initializeMarketplaceIfNeeded, mockMerkleRoot, timeToUnix } from "./utils";

describe("Data Marketplace - Seller Behavior", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const seller1 = Keypair.generate();
  const seller2 = Keypair.generate();
  const seller3 = Keypair.generate();
  const buyer1 = Keypair.generate();
  const buyer2 = Keypair.generate();

  // PDAs
  let marketplaceConfigPda: PublicKey;

  // Track listing IDs for each seller
  let seller1ListingId: BN;
  let seller2ListingId: BN;
  let seller3ListingId: BN;

  before(async () => {
    // Airdrop SOL to test accounts
    await Promise.all([
      provider.connection.requestAirdrop(seller1.publicKey, 20 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller2.publicKey, 20 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller3.publicKey, 20 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer1.publicKey, 50 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer2.publicKey, 50 * LAMPORTS_PER_SOL),
    ]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);
  });

  describe("Seller Lifecycle", () => {
    it("should activate seller on first listing creation", async () => {
      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1706659200);   // Jan 31, 2024
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      // Get listing counter before creation
      const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      seller1ListingId = configBefore.listingCounter;

      const tx = await createListingTx(program, seller1.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller1]);

      const seller = await getSeller(program, seller1.publicKey);
      expect(seller.seller.toString()).to.equal(seller1.publicKey.toString());
      expect(seller.listingId).to.not.be.null;
      expect(seller.listingId?.toString()).to.equal(seller1ListingId.toString());
      expect(seller.totalRevenue.toNumber()).to.equal(0);
    });

    it("should deactivate seller on listing removal", async () => {
      const tx = await removeListingTx(program, seller1.publicKey, seller1ListingId);
      await provider.sendAndConfirm(tx, [seller1]);

      const seller = await getSeller(program, seller1.publicKey);
      expect(seller.listingId).to.be.null;
    });

    it("should reactivate seller with new listing", async () => {
      const startDate = new BN(1707091200); // Feb 1, 2024
      const endDate = new BN(1709251200);   // Feb 29, 2024
      const pricePerDay = new BN(2 * LAMPORTS_PER_SOL);

      // Get new listing ID
      const configBefore = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      seller1ListingId = configBefore.listingCounter;

      const tx = await createListingTx(program, seller1.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller1]);

      const seller = await getSeller(program, seller1.publicKey);
      expect(seller.listingId).to.not.be.null;
      expect(seller.listingId?.toString()).to.equal(seller1ListingId.toString());
    });
  });

  describe("Multiple Sellers Competition", () => {
    it("should create listings for multiple sellers", async () => {
      seller2ListingId = await getListingCounter(program);

      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1706659200); // Jan 31, 2024
      const cheapPrice = new BN(0.5 * LAMPORTS_PER_SOL);
      const expensivePrice = new BN(3 * LAMPORTS_PER_SOL);

      // Seller 2: Cheap price
      let tx = await createListingTx(program, seller2.publicKey, timeToUnix(startDate), timeToUnix(endDate), cheapPrice);
      await provider.sendAndConfirm(tx, [seller2]);

      // Get listing ID for seller3
      seller3ListingId = await getListingCounter(program);

      tx = await createListingTx(program, seller3.publicKey, timeToUnix(startDate), timeToUnix(endDate), expensivePrice);
      await provider.sendAndConfirm(tx, [seller3]);

      // Verify all listings exist
      const config = await program.account.marketplaceConfig.fetch(marketplaceConfigPda);
      expect(config.listingCounter.toNumber()).to.be.at.least(3);
    });

    it("should handle buyer purchasing from multiple sellers", async () => {
      // Buyer wants data at max 2 SOL/day (should get seller1 and seller2, not seller3)
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(2 * LAMPORTS_PER_SOL);

      // Get pass counter before purchase
      const passId = await getPassCounter(program);

      // In production, backend would determine eligible sellers
      // For testing, we simulate that 2 sellers are eligible (seller1 and seller2)
      const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
      const tx = await purchaseDataPassTx(program, buyer1.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
      await provider.sendAndConfirm(tx, [buyer1]);

      const dataPass = await getPass(program, passId);

      expect(dataPass.eligibleSellerCount).to.equal(2);
      expect(dataPass.maxPricePerDay.toString()).to.equal(maxPricePerDay.toString());
    });
  });

  describe("Seller Revenue Tracking", () => {
    it("should track revenue across multiple claims", async () => {
      const periodId1 = await getPeriodId(program);

      // const merkleDistributorPda1 = await marketplacePDAs.getMerkleDistributor(periodId1, program.programId);

      // Create merkle tree for first distribution
      const claims1 = [
        { seller: seller1.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(3 * LAMPORTS_PER_SOL) },
      ];

      const leaves1 = claims1.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree1 = new MerkleTree(leaves1, keccak256, { sortPairs: true });
      const merkleRoot1 = Array.from(merkleTree1.getRoot());

      const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId1, merkleRoot1);
      await provider.sendAndConfirm(updateTx, []);


      // Seller1 claims from first distribution
      const leafData1 = createMerkleLeafData(seller1.publicKey, claims1[0].amount);
      const leaf1 = keccak256(leafData1);
      const proof1 = merkleTree1.getProof(leaf1).map(p => Array.from(p.data));

      let tx = await claimRevenueTx(program, seller1.publicKey, periodId1, claims1[0].amount, proof1);
      await provider.sendAndConfirm(tx, [seller1]);

      // Check seller's total revenue
      const sellerAccount1 = await getSeller(program, seller1.publicKey);
      expect(sellerAccount1.totalRevenue.toString()).to.equal((5 * LAMPORTS_PER_SOL).toString());

      const periodId2 = await getPeriodId(program);

      const claims2 = [
        { seller: seller1.publicKey, amount: new BN(7 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(4 * LAMPORTS_PER_SOL) },
      ];

      const leaves2 = claims2.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree2 = new MerkleTree(leaves2, keccak256, { sortPairs: true });
      const merkleRoot2 = Array.from(merkleTree2.getRoot());

      const updateTx2 = await updateMerkleRootTx(program, authority.publicKey, periodId2, merkleRoot2);
      await provider.sendAndConfirm(updateTx2, []);

      // Seller1 claims from second distribution
      const leafData2 = createMerkleLeafData(seller1.publicKey, claims2[0].amount);
      const leaf2 = keccak256(leafData2);
      const proof2 = merkleTree2.getProof(leaf2).map(p => Array.from(p.data));

      tx = await claimRevenueTx(program, seller1.publicKey, periodId2, claims2[0].amount, proof2);
      await provider.sendAndConfirm(tx, [seller1]);

      // Check cumulative revenue
      const sellerAccount2 = await getSeller(program, seller1.publicKey);
      expect(sellerAccount2.totalRevenue.toString()).to.equal((12 * LAMPORTS_PER_SOL).toString());
    });
  });

  describe("Seller Listing Updates", () => {
    it("should allow seller to extend listing period", async () => {
      const listingBefore = await getListing(program, seller1ListingId);

      const originalEndDate = listingBefore.endDate;
      const newEndDate = originalEndDate.add(new BN(30 * 86400)); // Extend by 30 days

      const tx = await updateListingTx(program, seller1.publicKey, seller1ListingId, timeToUnix(newEndDate), listingBefore.pricePerDay);
      await provider.sendAndConfirm(tx, [seller1]);

      const listingAfter = await getListing(program, seller1ListingId);
      expect(listingAfter.endDate.toNumber()).to.be.greaterThan(originalEndDate.toNumber());
    });

    it("should allow seller to reduce price", async () => {
      const listingBefore = await getListing(program, seller1ListingId);
      const newPrice = listingBefore.pricePerDay.divn(2); // Half the price

      const tx = await updateListingTx(program, seller1.publicKey, seller1ListingId, undefined, newPrice);
      await provider.sendAndConfirm(tx, [seller1]);

      const listingAfter = await getListing(program, seller1ListingId);
      expect(listingAfter.pricePerDay.toString()).to.equal(newPrice.toString());
    });

    it("should allow seller to increase price", async () => {
      const listingBefore = await getListing(program, seller1ListingId);
      const newPrice = listingBefore.pricePerDay.muln(3); // Triple the price

      const tx = await updateListingTx(program, seller1.publicKey, seller1ListingId, undefined, newPrice);
      await provider.sendAndConfirm(tx, [seller1]);

      const listingAfter = await getListing(program, seller1ListingId);
      expect(listingAfter.pricePerDay.toString()).to.equal(newPrice.toString());
    });
  });

  describe("Seller Market Dynamics", () => {
    it("should handle sellers competing on price", async () => {
      // Update seller2's price to undercut others
      const newCompetitivePrice = new BN(0.25 * LAMPORTS_PER_SOL); // Very cheap

      const tx = await updateListingTx(program, seller2.publicKey, seller2ListingId, undefined, newCompetitivePrice);
      await provider.sendAndConfirm(tx, [seller2]);

      const listing = await getListing(program, seller2ListingId);
      expect(listing.pricePerDay.toString()).to.equal(newCompetitivePrice.toString());
    });

    it("should handle seller temporarily removing and re-listing", async () => {
      // Remove seller3's listing
      let tx = await removeListingTx(program, seller3.publicKey, seller3ListingId);
      await provider.sendAndConfirm(tx, [seller3]);

      // Re-list with better terms
      const newStartDate = new BN(1709251200); // March 1, 2024
      const newEndDate = new BN(1711929600);   // March 31, 2024
      const newPrice = new BN(1.5 * LAMPORTS_PER_SOL);

      tx = await createListingTx( program, seller3.publicKey, timeToUnix(newStartDate), timeToUnix(newEndDate), newPrice);
      await provider.sendAndConfirm(tx, [seller3]);

      const newListingId = (await getListingCounter(program)).sub(new BN(1))
      const newListing = await getListing(program, newListingId);

      const seller = await getSeller(program, seller3.publicKey);

      expect(newListing.pricePerDay.toString()).to.equal(newPrice.toString());
      expect(newListing.seller.toString()).to.equal(seller3.publicKey.toString());
      expect(seller.listingId?.toString()).to.equal(newListingId.toString());
    });
  });
});