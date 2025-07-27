import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { claimRevenueTx, createMerkleLeafData, createListingTx, updateMerkleRootTx} from "@blockit/shared";
import { getPeriodId, getRevenueClaim, initializeMarketplaceIfNeeded } from "./utils";

describe("Data Marketplace - Merkle Proof Verification", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const sellers: Keypair[] = Array(10).fill(null).map(() => Keypair.generate());

  // PDAs
  let marketplaceConfigPda: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await Promise.all(
      sellers.map(seller =>
        provider.connection.requestAirdrop(seller.publicKey, 5 * LAMPORTS_PER_SOL)
      )
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);

    // Initialize seller accounts by creating listings
    const startDate = new Date(Date.now() + 86400000); // Tomorrow
    const endDate = new Date(Date.now() + 172800000); // Day after tomorrow
    const pricePerDay = new BN(LAMPORTS_PER_SOL);

    // Create listings for all sellers to initialize their accounts
    for (const seller of sellers) {
      const tx = await createListingTx( program, seller.publicKey, startDate, endDate, pricePerDay);
      await provider.sendAndConfirm(tx, [seller]);
    }

    console.log("Created listings for all sellers");
  });

  describe("Basic Merkle Proof", () => {
    it("should verify valid merkle proof for single seller", async () => {
      const periodId = await getPeriodId(program)

      // Single seller claim
      const claimAmount = new BN(5 * LAMPORTS_PER_SOL);
      const leafData = createMerkleLeafData(sellers[0].publicKey, claimAmount);
      const leaf = keccak256(leafData);

      const merkleTree = new MerkleTree([leaf], keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Generate proof (empty for single leaf tree)
      const proof = merkleTree.getProof(leaf);
      const merkleProof = proof.map(p => Array.from(p.data));

      // Claim revenue
      const tx = await claimRevenueTx( program, sellers[0].publicKey, periodId, claimAmount, merkleProof);
      await provider.sendAndConfirm(tx, [sellers[0]]);

      // verify claim was successful
      const revenueClaim = await getRevenueClaim(program, sellers[0].publicKey, periodId);
      expect(revenueClaim.amountClaimed.toString()).to.equal(claimAmount.toString());
    });

    it("should verify merkle proof for multiple sellers", async () => {
      const periodId = await getPeriodId(program)

      // Multiple seller claims
      const claims = [
        { seller: sellers[1].publicKey, amount: new BN(3 * LAMPORTS_PER_SOL) },
        { seller: sellers[2].publicKey, amount: new BN(2 * LAMPORTS_PER_SOL) },
        { seller: sellers[3].publicKey, amount: new BN(1 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Each seller claims their revenue
      for (let i = 0; i < claims.length; i++) {
        const claim = claims[i];
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        const leaf = keccak256(leafData);
        const proof = merkleTree.getProof(leaf);
        const merkleProof = proof.map(p => Array.from(p.data));

        const tx = await claimRevenueTx(program, claim.seller, periodId, claim.amount, merkleProof);
        await provider.sendAndConfirm(tx, [sellers[i + 1]]);
      }

      // Verify all claims were successful
      for (let i = 0; i < claims.length; i++) {
        const revenueClaim = await getRevenueClaim(program, claims[i].seller, periodId);
        expect(revenueClaim.amountClaimed.toString()).to.equal(claims[i].amount.toString());
      }
    });
  });

  describe("Complex Merkle Trees", () => {
    it("should handle deep merkle tree", async () => {
      const periodId = await getPeriodId(program)

      // Create 8 sellers (depth 3 tree)
      const claims = sellers.slice(0, 8).map((seller, i) => ({
        seller: seller.publicKey,
        amount: new BN((i + 1) * 0.5 * LAMPORTS_PER_SOL)
      }));

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Test claiming from different positions in the tree
      const testIndices = [0, 3, 7]; // First, middle, last

      for (const index of testIndices) {
        const claim = claims[index];
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        const leaf = keccak256(leafData);
        const proof = merkleTree.getProof(leaf);
        const merkleProof = proof.map(p => Array.from(p.data));

        // Verify proof length matches tree depth
        expect(proof.length).to.equal(3); // log2(8) = 3

        const tx = await claimRevenueTx( program, claim.seller, periodId, claim.amount, merkleProof);
        await provider.sendAndConfirm(tx, [sellers[index]]);
      }
    });

    it("should handle unbalanced merkle tree", async () => {
      const periodId = await getPeriodId(program)

      // Create 5 sellers (unbalanced tree)
      const claims = sellers.slice(0, 5).map((seller, i) => ({
        seller: seller.publicKey,
        amount: new BN((i + 1) * LAMPORTS_PER_SOL)
      }));

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Claim from the unbalanced positions
      const claim = claims[4]; // Last seller
      const leafData = createMerkleLeafData(claim.seller, claim.amount);
      const leaf = keccak256(leafData);
      const proof = merkleTree.getProof(leaf);
      const merkleProof = proof.map(p => Array.from(p.data));

      const tx = await claimRevenueTx(program, claim.seller, periodId, claim.amount, merkleProof);
      await provider.sendAndConfirm(tx, [sellers[4]]);
    });
  });

  describe("Merkle Proof Edge Cases", () => {
    it("should reject proof from different tree", async () => {
      const periodId = await getPeriodId(program)

      // Create correct tree
      const correctClaims = [
        { seller: sellers[5].publicKey, amount: new BN(2 * LAMPORTS_PER_SOL) },
        { seller: sellers[6].publicKey, amount: new BN(3 * LAMPORTS_PER_SOL) },
      ];

      const correctLeaves = correctClaims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const correctTree = new MerkleTree(correctLeaves, keccak256, { sortPairs: true });
      const correctRoot = Array.from(correctTree.getRoot());

      // Update with correct root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, correctRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Try to claim with proof from different tree
      const wrongClaims = [
        { seller: sellers[5].publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) }, // Wrong amount
        { seller: sellers[6].publicKey, amount: new BN(3 * LAMPORTS_PER_SOL) },
      ];

      const wrongLeaves = wrongClaims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const wrongTree = new MerkleTree(wrongLeaves, keccak256, { sortPairs: true });
      const wrongLeafData = createMerkleLeafData(sellers[5].publicKey, new BN(5 * LAMPORTS_PER_SOL));
      const wrongLeaf = keccak256(wrongLeafData);
      const wrongProof = wrongTree.getProof(wrongLeaf);
      const wrongMerkleProof = wrongProof.map(p => Array.from(p.data));

      try {
        const wrongAmount = new BN(5 * LAMPORTS_PER_SOL);
        const tx = await claimRevenueTx( program, sellers[5].publicKey, periodId, wrongAmount, wrongMerkleProof);
        await provider.sendAndConfirm(tx, [sellers[5]]);
        
        expect.fail("Should have thrown InvalidMerkleProof error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidMerkleProof");
      }
    });

    it("should reject tampered proof", async () => {
      const periodId = await getPeriodId(program)

      // Create tree
      const claims = [
        { seller: sellers[7].publicKey, amount: new BN(4 * LAMPORTS_PER_SOL) },
        { seller: sellers[8].publicKey, amount: new BN(6 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // Get valid proof and tamper with it
      const leafData = createMerkleLeafData(sellers[7].publicKey, claims[0].amount);
      const leaf = keccak256(leafData);
      const proof = merkleTree.getProof(leaf);
      const merkleProof = proof.map(p => Array.from(p.data));

      // Tamper with the proof
      if (merkleProof.length > 0) {
        merkleProof[0][0] = (merkleProof[0][0] + 1) % 256; // Change first byte
      }

      try {
        const tx = await claimRevenueTx( program, sellers[7].publicKey, periodId, claims[0].amount, merkleProof);
        await provider.sendAndConfirm(tx, [sellers[7]]);
        expect.fail("Should have thrown InvalidMerkleProof error");
      } catch (error: any) {
        expect(error.message).to.include("InvalidMerkleProof");
      }
    });

    it("should prevent double claiming", async () => {
      const periodId = await getPeriodId(program)

      // Create simple tree
      const claimAmount = new BN(10 * LAMPORTS_PER_SOL);
      const leafData = createMerkleLeafData(sellers[9].publicKey, claimAmount);
      const leaf = keccak256(leafData);

      const merkleTree = new MerkleTree([leaf], keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      // Update merkle root
      const updateTx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(updateTx, []);

      // First claim should succeed
      const proof = merkleTree.getProof(leaf);
      const merkleProof = proof.map(p => Array.from(p.data));

      const tx = await claimRevenueTx(program, sellers[9].publicKey, periodId, claimAmount, merkleProof);
      await provider.sendAndConfirm(tx, [sellers[9]]);

      // Second claim should fail
      try {
        const tx2 = await claimRevenueTx( program, sellers[9].publicKey, periodId, claimAmount, merkleProof);
        await provider.sendAndConfirm(tx2, [sellers[9]]);
        expect.fail("Should have thrown AlreadyClaimed error");
      } catch (error: any) {
        expect(
          error.message.includes("AlreadyClaimed") ||
          error.message.includes("already in use") ||
          error.message.includes("custom program error: 0x7d5")
        ).to.be.true;
      }
    });
  });
});