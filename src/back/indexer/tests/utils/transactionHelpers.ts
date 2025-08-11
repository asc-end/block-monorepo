import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet, BN } from '@coral-xyz/anchor';
import escrowIdl from '../../../programs/target/idl/escrow.json' with { type: 'json' };
import type { Escrow } from '../../../programs/target/types/escrow';

export class TransactionHelpers {
  private program: Program<Escrow>;
  private provider: AnchorProvider;

  constructor(connection: Connection, programId: PublicKey, wallet: Keypair) {
    const anchorWallet = new Wallet(wallet);
    this.provider = new AnchorProvider(connection, anchorWallet, { commitment: 'confirmed' });
    this.program = new Program(escrowIdl as any,this.provider);
  }

  async createCommitment(
    user: Keypair,
    amount: number,
    unlockTime: number,
    authority: PublicKey
  ): Promise<{ tx: string; commitmentPda: PublicKey; createdAt: number }> {
    const createdAt = Math.floor(Date.now() / 1000); // Convert to seconds
    const createdAtBuffer = Buffer.allocUnsafe(8);
    createdAtBuffer.writeBigInt64LE(BigInt(createdAt));
    
    const unlockTimeBuffer = Buffer.allocUnsafe(8);
    unlockTimeBuffer.writeBigInt64LE(BigInt(unlockTime));
    
    const [commitmentPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('commitment'),
        user.publicKey.toBuffer(),
        createdAtBuffer,
        unlockTimeBuffer
      ],
      this.program.programId
    );

    const tx = await this.program.methods
      .createCommitment(new BN(amount), new BN(unlockTime), authority, new BN(createdAt))
      .accountsPartial({
        commitment: commitmentPda,
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    return { tx, commitmentPda, createdAt };
  }

  async claimCommitment(user: Keypair, createdAt: number, unlockTime: number): Promise<string> {
    const createdAtBuffer = Buffer.allocUnsafe(8);
    createdAtBuffer.writeBigInt64LE(BigInt(createdAt));
    
    const unlockTimeBuffer = Buffer.allocUnsafe(8);
    unlockTimeBuffer.writeBigInt64LE(BigInt(unlockTime));
    
    const [commitmentPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('commitment'),
        user.publicKey.toBuffer(),
        createdAtBuffer,
        unlockTimeBuffer
      ],
      this.program.programId
    );

    const tx = await this.program.methods
      .claimCommitment()
      .accountsPartial({
        commitment: commitmentPda,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    return tx;
  }

  async forfeitCommitment(user: Keypair, authority: Keypair, createdAt: number, unlockTime: number, treasury: PublicKey, protocolTreasury: PublicKey): Promise<string> {
    const createdAtBuffer = Buffer.allocUnsafe(8);
    createdAtBuffer.writeBigInt64LE(BigInt(createdAt));
    
    const unlockTimeBuffer = Buffer.allocUnsafe(8);
    unlockTimeBuffer.writeBigInt64LE(BigInt(unlockTime));
    
    const [commitmentPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('commitment'),
        user.publicKey.toBuffer(),
        createdAtBuffer,
        unlockTimeBuffer
      ],
      this.program.programId
    );

    const tx = await this.program.methods
      .forfeitCommitment()
      .accountsPartial({
        commitment: commitmentPda,
        user: user.publicKey,
        authority: authority.publicKey,
        treasury: treasury,
        protocolTreasury: protocolTreasury,
      })
      .signers([authority])
      .rpc();

    return tx;
  }

  getProgram(): Program<Escrow> {
    return this.program;
  }
}