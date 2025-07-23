import { Program, workspace, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import type { Escrow } from "../../target/types/escrow";
import { assert } from "chai";
import BN from "bn.js";

describe("escrow", () => {
  // Configure the client to use the local cluster
  const provider = AnchorProvider.env();
  setProvider(provider);

  // Helper function to verify an account has been properly closed in Solana
  const assertAccountClosed = (accountInfo: any, accountName: string = "Account") => {
    assert.isNotNull(accountInfo, `${accountName} should still exist after closing`);
    assert.equal(accountInfo.lamports, 0, `${accountName} should have 0 lamports`);
    assert.equal(accountInfo.data.length, 0, `${accountName} should have empty data`);
    assert.equal(accountInfo.owner.toString(), "11111111111111111111111111111111", `${accountName} should be owned by System Program`);
  };

  const program = workspace.Escrow as Program<Escrow>;

  // Log provider information
  console.log("\n=========== Provider Configuration ===========");
  console.log("- RPC URL:", provider.connection.rpcEndpoint);
  console.log("- Wallet PublicKey:", provider.wallet.publicKey.toBase58());
  console.log("- Commitment:", provider.opts.commitment);
  console.log("- Program ID:", program.programId.toBase58());
  console.log("================================================")

  const user = provider.wallet;

  // Helper function to get blockchain time
  async function getBlockchainTime(): Promise<number> {
    const slot = await provider.connection.getSlot();
    const blockTime = await provider.connection.getBlockTime(slot);
    return blockTime || Math.floor(Date.now() / 1000);
  }

  // Test accounts
  let authority: Keypair;
  let treasuryPubKey: PublicKey;
  let otherUser: Keypair;

  beforeEach(async () => {
    // Generate fresh keypairs for each test
    authority = Keypair.generate();
    treasuryPubKey = new PublicKey("DoGXPkPav6iyXk6sKnaBQdzP2PsJ9hVZnv6CpPgVzkkA");
    otherUser = Keypair.generate();

    // Airdrop SOL to test accounts
    const airdropTx = await provider.connection.requestAirdrop(
      authority.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx);

    const airdropTx2 = await provider.connection.requestAirdrop(
      otherUser.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropTx2);
  });

  describe("create_commitment", () => {
    it("Creates a commitment successfully", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400); // 1 day from now

      // Derive commitment PDA
      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
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
      assert.ok(commitment.createdAt.gte(new BN(currentTime)));

      // Verify SOL was transferred
      const commitmentBalance = await provider.connection.getBalance(commitmentPda);
      const rentExempt = await provider.connection.getMinimumBalanceForRentExemption(
        program.account.commitment.size
      );
      assert.equal(commitmentBalance - rentExempt, amount.toNumber());
    });

    it("Fails with invalid unlock time", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime - 86400); // 1 day ago

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      try {
        await program.methods
          .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
          .accountsPartial({
            commitment: commitmentPda,
            user: user.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Invalid unlock time");
      }
    });

    it("Allows multiple commitments with same unlock time", async () => {
      const amount = new BN(LAMPORTS_PER_SOL / 2);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400);

      // Create first commitment
      const [commitment1Pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
          commitment: commitment1Pda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Wait a second to ensure different created_at
      await new Promise(resolve => setTimeout(resolve, 1100));

      // Create second commitment with same unlock time
      const currentTime2 = await getBlockchainTime();
      const [commitment2Pda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime2).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime2))
        .accountsPartial({
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
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 2); // 2 seconds from now

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
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
        .accountsPartial({
          commitment: commitmentPda,
          user: user.publicKey,
        })
        .rpc();
      await provider.connection.confirmTransaction(tx, 'confirmed');

      const userBalanceAfter = await provider.connection.getBalance(user.publicKey);
      const expectedBalance = userBalanceBefore + amount.toNumber() + rentExempt;
      assert.approximately(userBalanceAfter, expectedBalance, 10000);

      const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
      assertAccountClosed(commitmentAccount, "Commitment account");
    });

    it("Fails to claim before unlock time", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400); // 1 day from now

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Try to claim immediately
      try {
        await program.methods
          .claimCommitment()
          .accountsPartial({
            commitment: commitmentPda,
            user: user.publicKey,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Commitment is still locked");
      }
    });

    it("Only commitment owner can claim", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 2);

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
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
          .accountsPartial({
            commitment: commitmentPda,
            user: otherUser.publicKey,
          })
          .signers([otherUser])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Invalid user");
      }
    });
  });

  describe("forfeit_commitment", () => {
    it("Authority can forfeit commitment", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400);

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const treasuryBalanceBefore = await provider.connection.getBalance(treasuryPubKey);

      // Forfeit as authority
      await program.methods
        .forfeitCommitment()
        .accountsPartial({
          commitment: commitmentPda,
          authority: authority.publicKey,
          user: user.publicKey,
          treasury: treasuryPubKey,
        })
        .signers([authority])
        .rpc();

      // Verify fund distribution
      const treasuryBalanceAfter = await provider.connection.getBalance(treasuryPubKey);

      assert.equal(
        treasuryBalanceAfter - treasuryBalanceBefore,
        amount.toNumber(),
        "Treasury should receive the full forfeited amount"
      );

      // Verify commitment was closed
      const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
      assertAccountClosed(commitmentAccount, "Commitment account");
    });

    it("Only authority can forfeit", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400);

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      // Try to forfeit as user
      try {
        await program.methods
          .forfeitCommitment()
          .accountsPartial({
            commitment: commitmentPda,
            authority: user.publicKey,
            user: user.publicKey,
            treasury: treasuryPubKey,
          })
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Invalid authority");
      }

      // Try to forfeit as other user
      try {
        await program.methods
          .forfeitCommitment()
          .accountsPartial({
            commitment: commitmentPda,
            authority: otherUser.publicKey,
            user: user.publicKey,
            treasury: treasuryPubKey,
          })
          .signers([otherUser])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Invalid authority");
      }
    });

    it("Cannot forfeit after unlock time", async () => {
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 2);

      const [commitmentPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commitment"),
          user.publicKey.toBuffer(),
          new BN(currentTime).toArrayLike(Buffer, "le", 8),
          unlockTime.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      // Create commitment
      await program.methods
        .createCommitment(amount, unlockTime, authority.publicKey, new BN(currentTime))
        .accountsPartial({
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
          .accountsPartial({
            commitment: commitmentPda,
            authority: authority.publicKey,
            user: user.publicKey,
            treasury: treasuryPubKey,
          })
          .signers([authority])
          .rpc();
        assert.fail("Expected error");
      } catch (err) {
        assert.include((err as Error).toString(), "Commitment has already been unlocked");
      }
    });
  });
});