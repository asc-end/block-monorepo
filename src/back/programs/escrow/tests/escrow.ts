import { Program, workspace, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import type { Escrow } from "../../target/types/escrow";
import { assert } from "chai";
import BN from "bn.js";
import { claimCommitmentTx, createCommitmentTx, forfeitCommitmentTx, getCommitment, getCommitmentPda, getAllCommitmentsByUser, getNextAvailableId } from "@blockit/shared";

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
  let user: Keypair;

  beforeEach(async () => {
    // Generate fresh keypairs for each test
    authority = Keypair.generate();
    treasuryPubKey = new PublicKey("DoGXPkPav6iyXk6sKnaBQdzP2PsJ9hVZnv6CpPgVzkkA");
    otherUser = Keypair.generate();
    user = Keypair.generate();

    // Airdrop SOL to test accounts
    await Promise.all([
      provider.connection.requestAirdrop(authority.publicKey, 2 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(otherUser.publicKey, 2 * LAMPORTS_PER_SOL),
      provider.connection.requestAirdrop(user.publicKey, 2 * LAMPORTS_PER_SOL),
    ]);

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  describe("create_commitment", () => {
    it("Creates a commitment successfully", async () => {
      const id = await getNextAvailableId(program, user.publicKey);
      const amount = new BN(LAMPORTS_PER_SOL);
      const currentTime = await getBlockchainTime();
      const unlockTime = new BN(currentTime + 86400); // 1 day from now

      const commitmentPda = getCommitmentPda(program, user.publicKey, id);

      // Create commitment
      // console.log(authority.publicKey);
      // const tx = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);

      console.log(user.publicKey);
      const sig = await program.methods
        .createCommitment(id, amount, unlockTime, authority.publicKey)
        .accountsPartial({
          commitment: commitmentPda,
          user: user.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([user])
        .rpc();

        console.log(sig);

      await provider.connection.confirmTransaction(sig, "confirmed");

      // Fetch transaction details to get logs
      const transactionData = await provider.connection.getTransaction(sig, { maxSupportedTransactionVersion: 0, commitment: "confirmed" }).catch(e => {
        console.log("Error fetching transaction", e);
        return null;
      });

      console.log("\n=== Transaction Logs ===");
      console.log("Signature:", sig);
      console.log(transactionData);

      const eventIx = transactionData?.meta?.innerInstructions?.[0].instructions[0];
      const rawData = anchor.utils.bytes.bs58.decode(eventIx?.data ?? "");
      const base64Data = anchor.utils.bytes.base64.encode(rawData.subarray(8));
      const event = program.coder.events.decode(base64Data);
      console.log(event);

      // Fetch and verify commitment
      const commitment = await getCommitment(program, user.publicKey, id);

      assert.equal(commitment.user.toString(), user.publicKey.toString());
      assert.equal(commitment.id.toString(), id.toString());
      assert.equal(commitment.amount.toString(), amount.toString());
      assert.equal(commitment.unlockTime.toString(), unlockTime.toString());
      assert.equal(commitment.authority.toString(), authority.publicKey.toString());

      // Verify SOL was transferred
      const commitmentBalance = await provider.connection.getBalance(commitmentPda);
      const rentExempt = await provider.connection.getMinimumBalanceForRentExemption(
        program.account.commitment.size
      );
      assert.equal(commitmentBalance - rentExempt, amount.toNumber());
    });

    // it("Fails with invalid unlock time", async () => {
    //   const id = await getNextAvailableId(program, user.publicKey);
    //   const amount = new BN(LAMPORTS_PER_SOL);
    //   const currentTime = await getBlockchainTime();
    //   const unlockTime = new BN(currentTime - 86400); // 1 day ago

    //   try {
    //     const tx = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
    //     await provider.sendAndConfirm(tx, [user]);
    //     assert.fail("Expected error");
    //   } catch (err) {
    //     assert.include((err as Error).toString(), "Invalid unlock time");
    //   }
    // });

    // it("Allows multiple commitments with different IDs", async () => {
    //   const amount = new BN(LAMPORTS_PER_SOL / 2);
    //   const currentTime = await getBlockchainTime();
    //   const unlockTime = new BN(currentTime + 86400);

    //   // Create first commitment
    //   const id1 = await getNextAvailableId(program, user.publicKey);
    //   console.log(id1);
    //   const commitment1Pda = getCommitmentPda(program, user.publicKey, id1);

    //   const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id1, authority.publicKey);
    //   await provider.sendAndConfirm(tx1, [user]);

    //   // Create second commitment with different ID
    //   const id2 = new BN(id1.toString()).add(new BN(1));
    //   console.log(id2);
    //   const commitment2Pda = getCommitmentPda(program, user.publicKey, id2);

    //   const tx2 = await createCommitmentTx(user.publicKey, amount, unlockTime, id2, authority.publicKey);
    //   await provider.sendAndConfirm(tx2, [user]);

    //   // Verify both commitments exist
    //   const commitment1 = await program.account.commitment.fetch(commitment1Pda);
    //   const commitment2 = await program.account.commitment.fetch(commitment2Pda);

    //   assert.equal(commitment1.id.toString(), id1.toString());
    //   assert.equal(commitment2.id.toString(), id2.toString());
    //   assert.equal(commitment1.unlockTime.toString(), commitment2.unlockTime.toString());
    // });
  });

  // describe("claim_commitment", () => {
  //   it("Claims commitment after unlock time", async () => {
  //     const id = await getNextAvailableId(program, user.publicKey);
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 2); // 2 seconds from now

  //     const commitmentPda = getCommitmentPda(program, user.publicKey, id);

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     const userBalanceBefore = await provider.connection.getBalance(user.publicKey);

  //     // Get the rent-exempt amount for the commitment account
  //     const rentExempt = await provider.connection.getMinimumBalanceForRentExemption(
  //       program.account.commitment.size
  //     );

  //     // Wait for unlock time
  //     await new Promise(resolve => setTimeout(resolve, 3000));
  //     // Claim commitment
  //     const tx2 = await claimCommitmentTx(user.publicKey, id);
  //     await provider.sendAndConfirm(tx2, [user]);

  //     const userBalanceAfter = await provider.connection.getBalance(user.publicKey);
  //     const expectedBalance = userBalanceBefore + amount.toNumber() + rentExempt;
  //     assert.approximately(userBalanceAfter, expectedBalance, 10000);

  //     const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
  //     assertAccountClosed(commitmentAccount, "Commitment account");
  //   });

  //   it("Fails to claim before unlock time", async () => {
  //     const id = await getNextAvailableId(program, user.publicKey);
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 86400); // 1 day from now

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     // Try to claim immediately
  //     try {
  //       const tx2 = await claimCommitmentTx(user.publicKey, id);
  //       await provider.sendAndConfirm(tx2, [user]);
  //       assert.fail("Expected error");
  //     } catch (err) {
  //       assert.include((err as Error).toString(), "Commitment is still locked");
  //     }
  //   });

  //   it("Only commitment owner can claim", async () => {
  //     const id = await getNextAvailableId(program, user.publicKey);
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 2);

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     // Wait for unlock
  //     await new Promise(resolve => setTimeout(resolve, 3000));

  //     // Try to claim as different user
  //     try {

  //       const commitment = getCommitmentPda(program!, user.publicKey, id);
  //       const tx = await program!.methods
  //           .claimCommitment()
  //           .accountsPartial({
  //               commitment,
  //               user: otherUser.publicKey,
  //           })
  //           .transaction()

  //       await provider.sendAndConfirm(tx, [otherUser]);

  //       assert.fail("Expected error");
  //     } catch (err) {
  //       console.log(err);
  //       assert.include((err as Error).toString(), "Invalid user");
  //     }
  //   });
  // });

  // describe("forfeit_commitment", () => {
  //   it("Authority can forfeit commitment", async () => {
  //     const id = await getNextAvailableId(program, user.publicKey);
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 86400);

  //     const commitmentPda = getCommitmentPda(program, user.publicKey, id);

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     const treasuryBalanceBefore = await provider.connection.getBalance(treasuryPubKey);

  //     // Forfeit as authority
  //     const tx2 = await forfeitCommitmentTx(user.publicKey, id, authority.publicKey, treasuryPubKey);
  //     await provider.sendAndConfirm(tx2, [authority]);

  //     // Verify fund distribution
  //     const treasuryBalanceAfter = await provider.connection.getBalance(treasuryPubKey);

  //     assert.equal(
  //       treasuryBalanceAfter - treasuryBalanceBefore,
  //       amount.toNumber(),
  //       "Treasury should receive the full forfeited amount"
  //     );

  //     // Verify commitment was closed
  //     const commitmentAccount = await provider.connection.getAccountInfo(commitmentPda);
  //     assertAccountClosed(commitmentAccount, "Commitment account");
  //   });

  //   it("Only authority can forfeit", async () => {
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 86400);
  //     const id = await getNextAvailableId(program, user.publicKey);

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     const commitment = getCommitmentPda(program!, user.publicKey, id);
  //     // Try to forfeit as user
  //     try {
  //       const tx = await program!.methods
  //           .forfeitCommitment()
  //           .accountsPartial({
  //               commitment,
  //               user: user.publicKey,
  //               treasury: treasuryPubKey,
  //               authority: user.publicKey,
  //           })
  //           .transaction()
  //       await provider.sendAndConfirm(tx, [user]);
  //       assert.fail("Expected error");
  //     } catch (err) {
  //       assert.include((err as Error).toString(), "Invalid authority");
  //     }

  //     // Try to forfeit as other user
  //     try {
  //       const tx = await program!.methods
  //           .forfeitCommitment()
  //           .accountsPartial({
  //               commitment,
  //               user: user.publicKey,
  //               treasury: treasuryPubKey,
  //               authority: otherUser.publicKey,
  //           })
  //           .transaction()
  //       await provider.sendAndConfirm(tx, [otherUser]);
  //       assert.fail("Expected error");
  //     } catch (err) {
  //       assert.include((err as Error).toString(), "Invalid authority");
  //     }
  //   });

  //   it("Cannot forfeit after unlock time", async () => {
  //     const amount = new BN(LAMPORTS_PER_SOL);
  //     const currentTime = await getBlockchainTime();
  //     const unlockTime = new BN(currentTime + 2);
  //     const id = await getNextAvailableId(program, user.publicKey);

  //     // Create commitment
  //     const tx1 = await createCommitmentTx(user.publicKey, amount, unlockTime, id, authority.publicKey);
  //     await provider.sendAndConfirm(tx1, [user]);

  //     // Wait past unlock time
  //     await new Promise(resolve => setTimeout(resolve, 3000));

  //     // Try to forfeit
  //     try {
  //       const tx2 = await forfeitCommitmentTx(user.publicKey, id, authority.publicKey, treasuryPubKey);
  //       await provider.sendAndConfirm(tx2, [authority]);
  //       assert.fail("Expected error");
  //     } catch (err) {
  //       assert.include((err as Error).toString(), "Commitment has already been unlocked");
  //     }
  //   });
  // });
});