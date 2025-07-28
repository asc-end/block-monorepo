import { expect } from "chai";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DataMarketplace } from "../../target/types/data_marketplace";
import { marketplacePDAs, createListingTx, purchaseDataPassTx, updateMerkleRootTx, claimRevenueTx, calculateDataPassPayment } from "@blockit/shared";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { createEligibilityMerkleRoot, getMarketplaceConfig, getMerkleDistributor, getPeriodId, getSeller, initializeMarketplaceIfNeeded, mockMerkleRoot, TEST_DATES } from "./utils";
import { timeToUnix } from "@blockit/shared";

// Helper function to create merkle leaf data
function createMerkleLeafData(seller: anchor.web3.PublicKey, amount: BN): Buffer {
  return Buffer.concat([
    seller.toBuffer(),
    amount.toArrayLike(Buffer, 'le', 8)
  ]);
}

describe("Revenue Tracking Tests", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;
  const authority = (provider.wallet as anchor.Wallet).payer;

  let seller1: Keypair;
  let seller2: Keypair;
  let buyer1: Keypair;
  let buyer2: Keypair;

  before(async () => {
    // Initialize marketplace (skip if already initialized)
    await initializeMarketplaceIfNeeded(program, authority.publicKey);

    // Create test accounts
    seller1 = Keypair.generate();
    seller2 = Keypair.generate();
    buyer1 = Keypair.generate();
    buyer2 = Keypair.generate();

    // Fund accounts
    await Promise.all([
      provider.connection.requestAirdrop(seller1.publicKey, 100 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller2.publicKey, 100 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer1.publicKey, 100 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(buyer2.publicKey, 100 * LAMPORTS_PER_SOL),
    ]);

  });

  describe("MarketplaceConfig Revenue Tracking", () => {
    it("should track currentPeriodRevenue and totalLifetimeRevenue correctly", async () => {
      const configBefore = await getMarketplaceConfig(program);

      const initialCurrentRevenue = configBefore.currentPeriodRevenue.toNumber();
      const initialLifetimeRevenue = configBefore.totalLifetimeRevenue.toNumber();
      const startUnix = timeToUnix(TEST_DATES.JAN_1_2024);
      const endUnix = timeToUnix(TEST_DATES.JAN_7_2024);

      // Create listings
      const listing1Price = new BN(2 * LAMPORTS_PER_SOL);
      const listing1Tx = await createListingTx(program, seller1.publicKey, startUnix, endUnix, listing1Price);
      await provider.sendAndConfirm(listing1Tx, [seller1]);

      const listing2Price = new BN(LAMPORTS_PER_SOL);
      const listing2Tx = await createListingTx(program, seller2.publicKey, startUnix, endUnix, listing2Price);
      await provider.sendAndConfirm(listing2Tx, [seller2]);

      // Make purchases
      const purchase1Amount = new BN( LAMPORTS_PER_SOL);
      const eligibility = createEligibilityMerkleRoot([seller1.publicKey]);

      const purchase1Tx = await purchaseDataPassTx(program, buyer1.publicKey, startUnix, endUnix, purchase1Amount,eligibility);
      await provider.sendAndConfirm(purchase1Tx, [buyer1]);

      const purchase2Amount = new BN(2 * LAMPORTS_PER_SOL);
      const eligibility2 = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
      const purchase2Tx = await purchaseDataPassTx(program, buyer2.publicKey, startUnix, endUnix, purchase2Amount, eligibility2);
      await provider.sendAndConfirm(purchase2Tx, [buyer2]);

      // Check revenue tracking
      const configAfter = await getMarketplaceConfig(program);

      const payment1 = calculateDataPassPayment(TEST_DATES.JAN_1_2024, TEST_DATES.JAN_7_2024, purchase1Amount, eligibility.count);
      const payment2 = calculateDataPassPayment(TEST_DATES.JAN_1_2024, TEST_DATES.JAN_7_2024, purchase2Amount, eligibility2.count);

      expect(configAfter.currentPeriodRevenue.toNumber()).to.equal( initialCurrentRevenue + payment1.toNumber() + payment2.toNumber());
      expect(configAfter.totalLifetimeRevenue.toNumber()).to.equal( initialLifetimeRevenue + payment1.toNumber() + payment2.toNumber());
    });

    it("should reset currentPeriodRevenue after merkle root update", async () => {
      const configBefore = await getMarketplaceConfig(program);
      const periodId = await getPeriodId(program);

      const tx = await updateMerkleRootTx(program, authority.publicKey, periodId, mockMerkleRoot);
      await provider.sendAndConfirm(tx, []);

      // Check that currentPeriodRevenue is reset but totalLifetimeRevenue remains
      const configAfter = await getMarketplaceConfig(program);

      expect(configAfter.currentPeriodRevenue.toNumber()).to.equal(0);
      expect(configAfter.totalLifetimeRevenue.toNumber()).to.equal( configBefore.totalLifetimeRevenue.toNumber());
    });
  });

  describe("MerkleDistributor Claim Tracking", () => {
    it("should track totalClaims and claimedAmount correctly", async () => {
      // Make some purchases first

      const purchaseAmount = new BN(LAMPORTS_PER_SOL);

      const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
      const purchase3Tx = await purchaseDataPassTx(program, buyer1.publicKey, timeToUnix(TEST_DATES.JAN_1_2024), timeToUnix(TEST_DATES.JAN_7_2024), purchaseAmount, eligibility);
      await provider.sendAndConfirm(purchase3Tx, [buyer1]);

      // Create merkle tree for distribution
      // Purchase generated: 1 SOL × 6 days × 2 sellers = 12 SOL
      const claims = [
        { seller: seller1.publicKey, amount: new BN(6 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(6 * LAMPORTS_PER_SOL) }
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const periodId = await getPeriodId(program);

      const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);
      
      let merkleDistributor = await getMerkleDistributor(program, periodId);

      // Check initial state
      expect(merkleDistributor.totalClaims.toNumber()).to.equal(0);
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(0);

      // First claim
      const proof1 = merkleTree.getProof(leaves[0]).map(p => Array.from(p.data));
      const claim1Tx = await claimRevenueTx(program, seller1.publicKey, periodId, claims[0].amount, proof1);
      await provider.sendAndConfirm(claim1Tx, [seller1]);
      merkleDistributor = await getMerkleDistributor(program, periodId);

      expect(merkleDistributor.totalClaims.toNumber()).to.equal(1);
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(claims[0].amount.toNumber());

      // Second claim
      const proof2 = merkleTree.getProof(leaves[1]).map(p => Array.from(p.data));
      const claim2Tx = await claimRevenueTx(program, seller2.publicKey, periodId, claims[1].amount, proof2);
      await provider.sendAndConfirm(claim2Tx, [seller2]);

      merkleDistributor = await getMerkleDistributor(program, periodId);
      expect(merkleDistributor.totalClaims.toNumber()).to.equal(2);
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(
        claims[0].amount.toNumber() + claims[1].amount.toNumber()
      );

      // Verify total matches what was distributed
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(merkleDistributor.totalPoolBalance.toNumber());
    });
  });

  describe("DataSeller Revenue Tracking", () => {
    it("should track totalRevenue across multiple periods", async () => {
      const seller3 = Keypair.generate();
      await provider.connection.requestAirdrop(seller3.publicKey, 10 * LAMPORTS_PER_SOL);

      // Create listing
      const listingPrice = new BN(LAMPORTS_PER_SOL);
      const listingTx = await createListingTx(program, seller3.publicKey, timeToUnix(TEST_DATES.JAN_1_2024), timeToUnix(TEST_DATES.JAN_7_2024), listingPrice);
      await provider.sendAndConfirm(listingTx, [seller3]);

      const sellerAccount = await getSeller(program, seller3.publicKey);

      // Initial state
      expect(sellerAccount.totalRevenue.toNumber()).to.equal(0);

      // Claim from multiple periods
      const claimAmounts = [
        new BN(2 * LAMPORTS_PER_SOL),
        new BN(3 * LAMPORTS_PER_SOL),
        new BN(1.5 * LAMPORTS_PER_SOL)
      ];

      let cumulativeRevenue = 0;

      const purchaseAmount = new BN(LAMPORTS_PER_SOL);
      for (let i = 0; i < claimAmounts.length; i++) {
        // Make a purchase to generate revenue
        const eligibility = createEligibilityMerkleRoot([seller3.publicKey]);
        const purchaseTx = await purchaseDataPassTx(program, buyer1.publicKey, timeToUnix(TEST_DATES.JAN_1_2024), timeToUnix(TEST_DATES.JAN_7_2024), purchaseAmount, eligibility);
        await provider.sendAndConfirm(purchaseTx, [buyer1]);

        // Create merkle distribution
        const leafData = createMerkleLeafData(seller3.publicKey, claimAmounts[i]);
        const leaf = keccak256(leafData);
        const merkleTree = new MerkleTree([leaf], keccak256, { sortPairs: true });
        const merkleRoot = Array.from(merkleTree.getRoot());

        const periodId = await getPeriodId(program);
        const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
        await provider.sendAndConfirm(updateTx, []);

        // Claim revenue
        const proof = merkleTree.getProof(leaf).map(p => Array.from(p.data));
        const claimTx = await claimRevenueTx(program, seller3.publicKey, periodId, claimAmounts[i], proof);
        await provider.sendAndConfirm(claimTx, [seller3]);

        // Check cumulative revenue
        cumulativeRevenue += claimAmounts[i].toNumber();
        const sellerAccount = await getSeller(program, seller3.publicKey);
        expect(sellerAccount.totalRevenue.toNumber()).to.equal(cumulativeRevenue);
      }
    });
  });

  describe("SellerRevenueClaim Tracking", () => {
    it("should track amountClaimed and claimTimestamp correctly", async () => {
      // Create merkle distribution
      const claimAmount = new BN(4 * LAMPORTS_PER_SOL);
      const leafData = createMerkleLeafData(seller1.publicKey, claimAmount);
      const leaf = keccak256(leafData);
      const merkleTree = new MerkleTree([leaf], keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const periodId = await getPeriodId(program);
      const [revenueClaim] = marketplacePDAs.getRevenueClaim(seller1.publicKey, periodId, program.programId);

      // Update merkle root
      const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Claim revenue
      const proof = merkleTree.getProof(leaf).map(p => Array.from(p.data));
      const claimTx = await claimRevenueTx(program, seller1.publicKey, periodId, claimAmount, proof);
      const beforeClaimTime = Math.floor(Date.now() / 1000);
      await provider.sendAndConfirm(claimTx, [seller1]);
      const afterClaimTime = Math.floor(Date.now() / 1000);

      // Check claim details
      const claimAccount = await program.account.sellerRevenueClaim.fetch(revenueClaim);
      expect(claimAccount.seller.toString()).to.equal(seller1.publicKey.toString());
      expect(claimAccount.periodId.toNumber()).to.equal(periodId.toNumber());
      expect(claimAccount.amountClaimed.toNumber()).to.equal(claimAmount.toNumber());

      // Verify timestamp is reasonable
      const claimTimestamp = claimAccount.claimTimestamp.toNumber();
      expect(claimTimestamp).to.be.gte(beforeClaimTime);
      expect(claimTimestamp).to.be.lte(afterClaimTime + 20); // Allow 20 seconds buffer
    });
  });

  describe("Edge Cases and Consistency", () => {
    it("should maintain consistency between distributor balance and claims", async () => {
      // Create distribution with specific total
      // With 2 sellers and 6 days: each purchase = 1 SOL × 6 days × 2 sellers = 12 SOL
      // 4 purchases = 48 SOL total
      const totalDistribution = new BN(48 * LAMPORTS_PER_SOL);
      const claims = [
        { seller: seller1.publicKey, amount: new BN(24 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(24 * LAMPORTS_PER_SOL) }
      ];

      const purchaseAmount = new BN(LAMPORTS_PER_SOL);
      // Generate revenue to match distribution
      for (let i = 0; i < 4; i++) {
        const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
        const purchaseTx = await purchaseDataPassTx(program, buyer1.publicKey, timeToUnix(TEST_DATES.JAN_1_2024), timeToUnix(TEST_DATES.JAN_7_2024), purchaseAmount, eligibility);
        await provider.sendAndConfirm(purchaseTx, [buyer1]);
      }

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const periodId = await getPeriodId(program);

      const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      let merkleDistributor = await getMerkleDistributor(program, periodId);

      // Verify distributor has correct total
      expect(merkleDistributor.totalPoolBalance.toNumber()).to.equal(totalDistribution.toNumber());

      // Claim all revenue
      for (let i = 0; i < claims.length; i++) {
        const proof = merkleTree.getProof(leaves[i]).map(p => Array.from(p.data));
        const claimTx = await claimRevenueTx(program, claims[i].seller, periodId, claims[i].amount, proof);
        await provider.sendAndConfirm(claimTx, [i === 0 ? seller1 : seller2]);
      }

      merkleDistributor = await getMerkleDistributor(program, periodId);

      // Verify all claimed
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(totalDistribution.toNumber());
      expect(merkleDistributor.totalClaims.toNumber()).to.equal(claims.length);
    });

    it("should handle partial claims correctly", async () => {
      // Ensure buyer has enough funds for this test
      await provider.connection.requestAirdrop(buyer1.publicKey, 50 * LAMPORTS_PER_SOL);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create distribution where not everyone claims
      // Create a third seller that will have unclaimed funds
      const seller3 = Keypair.generate();
      
      // Distribute the 36 SOL among 3 sellers
      const claims = [
        { seller: seller1.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller3.publicKey, amount: new BN(26 * LAMPORTS_PER_SOL) } // Won't claim
      ];

      const purchaseAmount = new BN(LAMPORTS_PER_SOL);
      // Generate revenue
      for (let i = 0; i < 3; i++) {
        const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
        const purchaseTx = await purchaseDataPassTx( program, buyer1.publicKey, timeToUnix(TEST_DATES.JAN_1_2024), timeToUnix(TEST_DATES.JAN_7_2024), purchaseAmount, eligibility);
        await provider.sendAndConfirm(purchaseTx, [buyer1]);
      }

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const periodId = await getPeriodId(program);

      const updateTx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Only first two sellers claim
      for (let i = 0; i < 2; i++) {
        const proof = merkleTree.getProof(leaves[i]).map(p => Array.from(p.data));
        const claimTx = await claimRevenueTx( program, claims[i].seller, periodId, claims[i].amount, proof);
        await provider.sendAndConfirm(claimTx, [i === 0 ? seller1 : seller2]);
      }
      let merkleDistributor = await getMerkleDistributor(program, periodId);

      // Verify partial claims
      // Only 2 out of 3 claimed (5 + 5 = 10 SOL)
      expect(merkleDistributor.totalClaims.toNumber()).to.equal(2);
      expect(merkleDistributor.claimedAmount.toNumber()).to.equal(10 * LAMPORTS_PER_SOL);
      expect(merkleDistributor.totalPoolBalance.toNumber()).to.equal(36 * LAMPORTS_PER_SOL);

      // Unclaimed amount (seller3's 26 SOL)
      const unclaimedAmount = merkleDistributor.totalPoolBalance.sub(merkleDistributor.claimedAmount);
      expect(unclaimedAmount.toNumber()).to.equal(26 * LAMPORTS_PER_SOL);
    });
  });
});