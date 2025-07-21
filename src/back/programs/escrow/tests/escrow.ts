import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Escrow } from "../../../../../target/types/escrow";
import { assert } from "chai";
import { PublicKey, SystemProgram } from "@solana/web3.js";

describe("escrow", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Escrow as Program<Escrow>;
  const user = provider.wallet;
  
  // Test accounts
  let authority: anchor.web3.Keypair;
  let treasury: anchor.web3.Keypair;
  let protocolTreasury: anchor.web3.Keypair;
  let otherUser: anchor.web3.Keypair;
  
  beforeEach(async () => {
    // Generate fresh keypairs for each test
    authority = anchor.web3.Keypair.generate();
    treasury = anchor.web3.Keypair.generate();
    protocolTreasury = anchor.web3.Keypair.generate();
    otherUser = anchor.web3.Keypair.generate();
    
    // Airdrop SOL to test accounts
    const airdropTx = await provider.connection.requestAirdrop(
      authority.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx);
    
    const airdropTx2 = await provider.connection.requestAirdrop(
      otherUser.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx2);
  });

  describe("create_commitment", () => {
    it("Creates a commitment successfully", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 86400); // 1 day from now
      
      // Derive commitment PDA
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Fetch and verify commitment
      const commitment = await program.account.commitment.fetch(commitmentPda);
      assert.ok(commitment.user.equals(user.publicKey));
      assert.ok(commitment.amount.eq(amount));
      assert.ok(commitment.unlockTime.eq(unlockTime));
      assert.ok(commitment.authority.equals(authority.publicKey));
      assert.ok(commitment.createdAt.gte(new anchor.BN(currentTime)));
      
      // Verify SOL was transferred
      const commitmentBalance = await provider.connection.getBalance(commitmentPda);
      const rentExempt = await provider.connection.getMinimumBalanceForRentExemption(
        program.account.commitment.size
      );
      assert.equal(commitmentBalance - rentExempt, amount.toNumber());
    });

    it("Fails with invalid unlock time", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime - 86400); // 1 day ago
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      try {
        await program.methods
          .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
          .accounts({
            commitment: commitmentPda,
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Invalid unlock time");
      }
    });

    it("Allows multiple commitments with same unlock time", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL / 2);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 86400);
      
      // Create first commitment
      const [commitment1Pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitment1Pda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Wait a second to ensure different created_at
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Create second commitment with same unlock time
      const currentTime2 = Math.floor(Date.now() / 1000);
      const [commitment2Pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime2).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime2))
        .accounts({
          commitment: commitment2Pda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Verify both commitments exist
      const commitment1 = await program.account.commitment.fetch(commitment1Pda);
      const commitment2 = await program.account.commitment.fetch(commitment2Pda);
      
      assert.ok(commitment1.unlockTime.eq(commitment2.unlockTime));
      assert.ok(!commitment1.createdAt.eq(commitment2.createdAt));
    });
  });

  describe("claim_commitment", () => {
    it("Claims commitment after unlock time", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 2); // 2 seconds from now
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const userBalanceBefore = await provider.connection.getBalance(user.publicKey);
      
      // Get the rent-exempt amount for the commitment account
      const rentExempt = await provider.connection.getMinimumBalanceForRentExemption(
        program.account.commitment.size
      );

      // Wait for unlock time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Claim commitment
      const tx = await program.methods
        .claimCommitment()
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
        })
        .rpc();

      // Get transaction fee
      const txDetails = await provider.connection.getTransaction(tx, {
        commitment: 'confirmed'
      });
      const txFee = txDetails?.meta?.fee || 0;

      // Verify user got funds back (committed amount + rent-exempt balance - tx fee)
      const userBalanceAfter = await provider.connection.getBalance(user.publicKey);
      const expectedBalance = userBalanceBefore + amount.toNumber() + rentExempt - txFee;
      assert.approximately(
        userBalanceAfter,
        expectedBalance,
        10000 // Allow for small rounding differences
      );

      // Verify commitment account was closed
      const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
      assert.isNull(commitmentAccount);
    });

    it("Fails to claim before unlock time", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 86400); // 1 day from now
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Try to claim immediately
      try {
        await program.methods
          .claimCommitment()
          .accounts({
            commitment: commitmentPda,
            user: user.publicKey,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Commitment is still locked");
      }
    });

    it("Only commitment owner can claim", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 2);
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Wait for unlock
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Try to claim as different user
      try {
        await program.methods
          .claimCommitment()
          .accounts({
            commitment: commitmentPda,
            user: otherUser.publicKey,
          })
          .signers([otherUser])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Invalid user");
      }
    });
  });

  describe("forfeit_commitment", () => {
    it("Authority can forfeit commitment", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 86400);
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const treasuryBalanceBefore = await provider.connection.getBalance(treasury.publicKey);
      const protocolBalanceBefore = await provider.connection.getBalance(protocolTreasury.publicKey);

      // Forfeit as authority
      await program.methods
        .forfeitCommitment()
        .accounts({
          commitment: commitmentPda,
          authority: authority.publicKey,
          user: user.publicKey,
          treasury: treasury.publicKey,
          protocolTreasury: protocolTreasury.publicKey,
        })
        .signers([authority])
        .rpc();

      // Verify fund distribution
      const treasuryBalanceAfter = await provider.connection.getBalance(treasury.publicKey);
      const protocolBalanceAfter = await provider.connection.getBalance(protocolTreasury.publicKey);
      
      const protocolFee = amount.toNumber() * 0.1; // 10%
      const treasuryAmount = amount.toNumber() * 0.9; // 90%
      
      assert.approximately(
        protocolBalanceAfter - protocolBalanceBefore,
        protocolFee,
        1000
      );
      assert.approximately(
        treasuryBalanceAfter - treasuryBalanceBefore,
        treasuryAmount,
        1000
      );

      // Verify commitment was closed
      const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
      assert.isNull(commitmentAccount);
    });

    it("Only authority can forfeit", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 86400);
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Try to forfeit as user
      try {
        await program.methods
          .forfeitCommitment()
          .accounts({
            commitment: commitmentPda,
            authority: user.publicKey,
            user: user.publicKey,
            treasury: treasury.publicKey,
            protocolTreasury: protocolTreasury.publicKey,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Invalid authority");
      }

      // Try to forfeit as other user
      try {
        await program.methods
          .forfeitCommitment()
          .accounts({
            commitment: commitmentPda,
            authority: otherUser.publicKey,
            user: user.publicKey,
            treasury: treasury.publicKey,
            protocolTreasury: protocolTreasury.publicKey,
          })
          .signers([otherUser])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Invalid authority");
      }
    });

    it("Cannot forfeit after unlock time", async () => {
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL);
      const currentTime = Math.floor(Date.now() / 1000);
      const unlockTime = new anchor.BN(currentTime + 2);
      
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new anchor.BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(currentTime))
        .accounts({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Wait past unlock time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Try to forfeit
      try {
        await program.methods
          .forfeitCommitment()
          .accounts({
            commitment: commitmentPda,
            authority: authority.publicKey,
            user: user.publicKey,
            treasury: treasury.publicKey,
            protocolTreasury: protocolTreasury.publicKey,
          })
          .signers([authority])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include(err.toString(), "Commitment has already been unlocked");
      }
    });
  });

  describe("Query commitments", () => {
    it("Can fetch all user commitments", async () => {
      // Create a unique user for this test to avoid picking up commitments from other tests
      const testUser = anchor.web3.Keypair.generate();
      
      // Airdrop SOL to test user
      const airdropTx = await provider.connection.requestAirdrop(
        testUser.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropTx);
      
      const amount = new anchor.BN(anchor.web3.LAMPORTS_PER_SOL / 3);
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Create 3 commitments
      for (let i = 0; i < 3; i++) {
        const unlockTime = new anchor.BN(currentTime + 86400 * (i + 1));
        const createdAt = Math.floor(Date.now() / 1000);
        
        const [commitmentPda] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("commitment"),
            testUser.publicKey.toBuffer(),
            new anchor.BN(createdAt).toArrayLike(Buffer, "le", 8),
            unlockTime.toArrayLike(Buffer, "le", 8),
          ],
          program.programId
        );

        await program.methods
          .createCommitment(amount, unlockTime, authority.publicKey, new anchor.BN(createdAt))
          .accounts({
            commitment: commitmentPda,
            user: testUser.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([testUser])
          .rpc();
          
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      // Query all commitments for the test user
      const commitments = await program.account.commitment.all([
        {
          memcmp: {
            offset: 8, // After discriminator
            bytes: testUser.publicKey.toBase58(),
          },
        },
      ]);

      assert.equal(commitments.length, 3);
      commitments.forEach(commitment => {
        assert.ok(commitment.account.user.equals(testUser.publicKey));
        assert.ok(commitment.account.amount.eq(amount));
        assert.ok(commitment.account.authority.equals(authority.publicKey));
      });
    });
  });
});