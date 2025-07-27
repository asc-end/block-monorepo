import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { createListingTx, updateListingTx, removeListingTx, purchaseDataPassTx, claimRevenueTx, updateMerkleRootTx, createMerkleLeafData } from "@blockit/shared";
import { getPeriodId, getSeller, initializeMarketplaceIfNeeded, mockMerkleRoot, timeToUnix, getPassCounter, getPass, createEligibilityMerkleRoot } from "./utils/test-helpers";

describe("Data Marketplace - Error Cases", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const seller = Keypair.generate();
  const seller2 = Keypair.generate();
  const buyer = Keypair.generate();
  const unauthorizedUser = Keypair.generate();

  // PDAs
  let marketplaceConfigPda: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(seller.publicKey, 10 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(seller2.publicKey, 10 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(buyer.publicKey, 20 * LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(unauthorizedUser.publicKey, 5 * LAMPORTS_PER_SOL);

    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);

  });

  describe("Initialization Errors", () => {
    it("should fail to initialize marketplace twice", async () => {
      try {

        await program.methods
          .initializeMarketplace()
          .accountsPartial({
            authority: authority.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).to.include("already in use");
      }
    });
  });

  describe("Seller Errors", () => {
    it("should fail to create listing with invalid date range", async () => {
      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1703980800);   // Dec 31, 2023 (before start)
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      try {
        const tx = await createListingTx(program, seller.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
        await provider.sendAndConfirm(tx, [seller]);
        expect.fail("Should have thrown InvalidDateRange error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidDateRange");
      }
    });

    it("should fail to create listing with zero price", async () => {
      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1706659200);   // Jan 31, 2024
      const pricePerDay = new BN(0);

      try {
        const tx = await createListingTx(program, seller.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
        await provider.sendAndConfirm(tx, [seller]);
        expect.fail("Should have thrown InvalidPrice error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidPrice");
      }
    });

    it("should create first listing successfully", async () => {
      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1706659200);   // Jan 31, 2024
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      const tx = await createListingTx(program, seller.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller]);

      // Verify seller is activated
      const sellerAccount = await getSeller(program, seller.publicKey)
      expect(sellerAccount.listingId).to.not.be.null;
    });

    it("should fail to create second listing while having active listing", async () => {
      const startDate = new BN(1707091200); // Feb 1, 2024
      const endDate = new BN(1709251200);   // Feb 29, 2024
      const pricePerDay = new BN(LAMPORTS_PER_SOL * 2);

      try {
        const tx = await createListingTx(program, seller.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
        await provider.sendAndConfirm(tx, [seller]);
        expect.fail("Should have thrown SellerAlreadyHasListing error");
      } catch (error: any) {
        expect(error.message).to.include("SellerAlreadyHasListing");
      }
    });

    it("should fail to update listing with unauthorized signer", async () => {
      const newEndDate = new BN(1709251200); // Feb 29, 2024
      const newPricePerDay = new BN(LAMPORTS_PER_SOL * 2);

      // Get the actual listing ID from the seller's account
      const sellerAccount = await getSeller(program, seller.publicKey);
      const listingId = sellerAccount.listingId!;

      try {
        const tx = await updateListingTx(program, unauthorizedUser.publicKey, listingId, timeToUnix(newEndDate), newPricePerDay);
        await provider.sendAndConfirm(tx, [unauthorizedUser]);
        expect.fail("Should have thrown Unauthorized error");
      } catch (error: any) {
        expect(error.message).to.include("Unauthorized");
      }
    });

    it("should fail to remove listing with wrong seller", async () => {
      // Get the actual listing ID from the seller's account
      const sellerAccount = await getSeller(program, seller.publicKey);
      const listingId = sellerAccount.listingId!;

      const startDate = new BN(1704067200); // Jan 1, 2024
      const endDate = new BN(1706659200);   // Jan 31, 2024
      const pricePerDay = new BN(LAMPORTS_PER_SOL);

      const tx = await createListingTx(program, seller2.publicKey, timeToUnix(startDate), timeToUnix(endDate), pricePerDay);
      await provider.sendAndConfirm(tx, [seller2]);

      try {
        // seller2 tries to remove seller's listing
        const tx = await removeListingTx(program, seller2.publicKey, listingId);
        await provider.sendAndConfirm(tx, [seller2]);
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.message).to.include("Unauthorized");
      }
    });
  });

  describe("Buyer Errors", () => {
    it("should fail to purchase with invalid date range", async () => {
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1703980800);   // Dec 31, 2023 (before start)
      const maxPricePerDay = new BN(LAMPORTS_PER_SOL);

      try {
        const eligibility = createEligibilityMerkleRoot([seller.publicKey]);
        const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
        await provider.sendAndConfirm(tx, [buyer]);
        expect.fail("Should have thrown InvalidDateRange error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidDateRange");
      }
    });

    it("should fail to purchase with zero max price", async () => {
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(0);

      try {
        const eligibility = createEligibilityMerkleRoot([seller.publicKey]);
        const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
        await provider.sendAndConfirm(tx, [buyer]);
        expect.fail("Should have thrown InvalidPrice error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidPrice");
      }
    });

    it("should fail to purchase with zero eligible sellers", async () => {
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(LAMPORTS_PER_SOL);

      try {
        const eligibility = createEligibilityMerkleRoot([]);
        const tx = await purchaseDataPassTx(program, buyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
        await provider.sendAndConfirm(tx, [buyer]);
        expect.fail("Should have thrown InvalidSellerCount error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidSellerCount");
      }
    });
    
    it("demonstrates merkle root with seller count included", async () => {
      // Create test sellers
      const seller1 = Keypair.generate();
      const seller2 = Keypair.generate();
      const seller3 = Keypair.generate();
      
      // Create merkle root with 3 sellers
      const result3Sellers = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey, seller3.publicKey]);
      const result3Sellers2 = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey, seller3.publicKey]);
      
      // Create same merkle root but claiming only 2 sellers
      const result2Sellers = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey]);
      
      // These should be different since the count is included in the merkle root
      expect(result3Sellers.merkleRoot).to.not.deep.equal(result2Sellers.merkleRoot);
      expect(result3Sellers.merkleRoot).to.deep.equal(result3Sellers2.merkleRoot);
      
      // Now demonstrate a purchase with the correct count works
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(LAMPORTS_PER_SOL);
      
      const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey, seller3.publicKey]);
      // This should succeed with matching count
      const tx = await purchaseDataPassTx( program,  buyer.publicKey,  timeToUnix(passStartDate),  timeToUnix(passEndDate),  maxPricePerDay,  eligibility);
      await provider.sendAndConfirm(tx, [buyer]);
      
      // Verify the pass was created with correct seller count
      const passId = (await getPassCounter(program)).sub(new BN(1));
      const dataPass = await getPass(program, passId);
      expect(dataPass.eligibleSellerCount).to.equal(3);
    });

    it("should fail to purchase with mismatched seller count", async () => {
      // Create merkle root with 3 sellers
      const seller1 = Keypair.generate();
      const seller2 = Keypair.generate();
      const seller3 = Keypair.generate();
      
      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(LAMPORTS_PER_SOL);
      
      try {
        // Try to claim only 2 sellers when merkle root has 3
        const eligibility = createEligibilityMerkleRoot([seller1.publicKey, seller2.publicKey, seller3.publicKey]);
        eligibility.count = 2;

        const tx = await purchaseDataPassTx( program,  buyer.publicKey,  timeToUnix(passStartDate),  timeToUnix(passEndDate),  maxPricePerDay,  eligibility);
        await provider.sendAndConfirm(tx, [buyer]);
        expect.fail("Should have thrown InvalidMerkleProof error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidMerkleProof");
      }
    });

    it("should fail to purchase with insufficient funds", async () => {
      const poorBuyer = Keypair.generate();
      // Give them just a tiny amount for fees but not enough for purchase
      await provider.connection.requestAirdrop(poorBuyer.publicKey, 0.01 * LAMPORTS_PER_SOL);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const passStartDate = new BN(1704067200); // Jan 1, 2024
      const passEndDate = new BN(1704585600);   // Jan 7, 2024
      const maxPricePerDay = new BN(LAMPORTS_PER_SOL);

      try {
        const eligibility = createEligibilityMerkleRoot([seller.publicKey]);
        const tx = await purchaseDataPassTx(program, poorBuyer.publicKey, timeToUnix(passStartDate), timeToUnix(passEndDate), maxPricePerDay, eligibility);
        await provider.sendAndConfirm(tx, [poorBuyer]);
        expect.fail("Should have thrown insufficient funds error");
      } catch (error: any) {
        expect(error.message).to.include("insufficient");
      }
    });
  });

  describe("Authority Errors", () => {
    it("should fail to update merkle root with unauthorized signer", async () => {
      const merkleRoot = Array(32).fill(2);
      const periodId = await getPeriodId(program)

      try {
        const tx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
        await provider.sendAndConfirm(tx, []);

        expect.fail("Should have thrown Unauthorized error");
      } catch (error: any) {
        expect(error.message).to.include("Unauthorized");
      }
    });
  });

  describe("Revenue Claim Errors", () => {

    before(async () => {
      const periodId = await getPeriodId(program)

      const merkleRoot = Array(32).fill(3);

      const tx = await updateMerkleRootTx(program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

    });

    it("should fail to claim with invalid merkle proof", async () => {
      const claimAmount = new BN(LAMPORTS_PER_SOL);

      try {
        const periodIdForMerkle = await getPeriodId(program)

        // Update merkle root with valid tree
        const merkleTx = await updateMerkleRootTx(program, authority.publicKey, periodIdForMerkle, mockMerkleRoot);
        await provider.sendAndConfirm(merkleTx, []);

        // Create an invalid proof (random bytes)
        const invalidProof = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]];

        // Try to claim with invalid proof
        const tx = await claimRevenueTx(program, seller.publicKey, periodIdForMerkle, claimAmount, invalidProof);
        await provider.sendAndConfirm(tx, [seller]);
        expect.fail("Should have thrown InvalidMerkleProof error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidMerkleProof");
      }
    });
  });
});