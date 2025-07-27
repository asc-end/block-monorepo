import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { DataMarketplace } from "../../target/types/data_marketplace";
import { PublicKey, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { expect } from "chai";
import BN from "bn.js";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { createMerkleLeafData, updateMerkleRootTx, marketplacePDAs } from "@blockit/shared";
import { initializeMarketplaceIfNeeded, getPeriodId,} from "./utils/test-helpers";

describe("Data Marketplace - Authority Operations", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DataMarketplace as Program<DataMarketplace>;

  // Test accounts
  const authority = provider.wallet as anchor.Wallet;
  const newAuthority = Keypair.generate();
  const seller1 = Keypair.generate();
  const seller2 = Keypair.generate();
  const seller3 = Keypair.generate();

  // PDAs
  let marketplaceConfigPda: PublicKey;

  before(async () => {
    // Airdrop SOL to test accounts
    await Promise.all([
      provider.connection.requestAirdrop(newAuthority.publicKey, 5 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller1.publicKey, 10 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller2.publicKey, 10 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(seller3.publicKey, 10 * LAMPORTS_PER_SOL),
    ]);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    marketplaceConfigPda = await initializeMarketplaceIfNeeded(program, authority.publicKey);
  });

  describe("Merkle Root Management", () => {
    it("should allow authority to update merkle root for period n + 0", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // Create merkle tree with multiple sellers
      const claims = [
        { seller: seller1.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(3 * LAMPORTS_PER_SOL) },
        { seller: seller3.publicKey, amount: new BN(2 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.merkleRoot).to.deep.equal(merkleRoot);
      expect(distributor.periodId.toNumber()).to.equal(periodId.toNumber());
    });

    it("should create new merkle distributor for period n + 1", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // Different distribution for period 1
      const claims = [
        { seller: seller1.publicKey, amount: new BN(7 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(4 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());
      const claimPeriodDays = new BN(14); // Shorter claim period

      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.periodId.toNumber()).to.equal(periodId.toNumber());
    });

    it("should create merkle distributor for period n + 2", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // New distribution for period 2
      const claims = [
        { seller: seller1.publicKey, amount: new BN(8 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller3.publicKey, amount: new BN(1 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.periodId.toNumber()).to.equal(periodId.toNumber());
    });
  });

  describe("Empty Merkle Tree Handling", () => {
    it("should handle empty merkle tree (no sellers to pay)", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // Empty merkle tree
      const leaves: Buffer[] = [];
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = merkleTree.getRoot().length === 0 
        ? Array(32).fill(0) // Use zero root for empty tree
        : Array.from(merkleTree.getRoot());
      
      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.totalPoolBalance.toNumber()).to.equal(0);
    });
  });

  describe("Period Management", () => {
    it("should handle multiple periods correctly", async () => {
      for (let i = 0; i < 3; i++) {
        const periodId = await getPeriodId(program)
        
        const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

        const merkleRoot = Array(32).fill(i + 1); // Unique root per period

        const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
        await provider.sendAndConfirm(tx, []);

        const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
        expect(distributor.periodId.toNumber()).to.equal(periodId.toNumber());
        // TODO check pool balance
      }
    });
  });

  describe("Complex Merkle Trees", () => {
    it("should handle large merkle tree with many sellers", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // Create 100 sellers
      const sellerCount = 100;
      const claims = Array(sellerCount).fill(null).map((_, i) => ({
        seller: Keypair.generate().publicKey,
        amount: new BN((i + 1) * 0.01 * LAMPORTS_PER_SOL) // Variable amounts
      }));

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());
      
      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.merkleRoot).to.deep.equal(merkleRoot);
      // TODO check pool
      
      // Verify tree depth
      expect(merkleTree.getDepth()).to.be.at.least(6); // log2(100) ≈ 6.6
    });

    it("should handle unbalanced merkle tree", async () => {
      const periodId = await getPeriodId(program)
      const [merkleDistributorPda] = marketplacePDAs.getMerkleDistributor(periodId, program.programId);

      // Create odd number of sellers (not power of 2)
      const claims = [
        { seller: seller1.publicKey, amount: new BN(10 * LAMPORTS_PER_SOL) },
        { seller: seller2.publicKey, amount: new BN(5 * LAMPORTS_PER_SOL) },
        { seller: seller3.publicKey, amount: new BN(2.5 * LAMPORTS_PER_SOL) },
        { seller: Keypair.generate().publicKey, amount: new BN(1.5 * LAMPORTS_PER_SOL) },
        { seller: Keypair.generate().publicKey, amount: new BN(1 * LAMPORTS_PER_SOL) },
      ];

      const leaves = claims.map(claim => {
        const leafData = createMerkleLeafData(claim.seller, claim.amount);
        return keccak256(leafData);
      });

      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = Array.from(merkleTree.getRoot());

      const tx = await updateMerkleRootTx( program, authority.publicKey, periodId, merkleRoot);
      await provider.sendAndConfirm(tx, []);

      const distributor = await program.account.merkleDistributor.fetch(merkleDistributorPda);
      expect(distributor.merkleRoot).to.deep.equal(merkleRoot);
    });
  });
});