import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { forfeitCommitmentTx, TREASURY_PUBKEY } from '@blockit/shared';
import * as fs from 'fs';
import * as path from 'path';
import { BN } from '@coral-xyz/anchor';

/**
 * Service to handle commitment forfeits using the authority keypair
 */
export class ForfeitService {
  private connection: Connection;
  private authorityKeypair: Keypair;
  private treasuryPubkey: PublicKey;

  constructor() {
    // Initialize connection to Solana
    this.connection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
      'confirmed'
    );

    // Load authority keypair from file or env
    this.authorityKeypair = this.loadAuthorityKeypair();
    
    // Treasury wallet where forfeited funds go
    // TODO: Update this to your actual treasury wallet
    this.treasuryPubkey = TREASURY_PUBKEY
  }

  private loadAuthorityKeypair(): Keypair {
    // Try to load from environment variable first
    if (process.env.AUTHORITY_SECRET_KEY) {
      try {
        const secretKey = JSON.parse(process.env.AUTHORITY_SECRET_KEY);
        return Keypair.fromSecretKey(new Uint8Array(secretKey));
      } catch (error) {
        console.error('Failed to load authority keypair from env:', error);
      }
    }

    // Try to load from file
    const authorityPath = path.join(__dirname, '../../.authority.json');
    if (fs.existsSync(authorityPath)) {
      try {
        const authorityData = JSON.parse(fs.readFileSync(authorityPath, 'utf-8'));
        return Keypair.fromSecretKey(new Uint8Array(authorityData.secretKey));
      } catch (error) {
        console.error('Failed to load authority keypair from file:', error);
      }
    }

    throw new Error('Authority keypair not found. Run npm run generate:authority');
  }

  /**
   * Forfeit a commitment when a routine fails
   */
  async forfeitCommitment(
    userPubkey: string,
    commitmentId: string | number
  ): Promise<string> {
    try {
      const user = new PublicKey(userPubkey);
      // await this.connection.requestAirdrop(this.authorityKeypair.publicKey, 1000000000000000000);
      
      // Convert commitment ID to BN
      let idBN;
      if (typeof commitmentId === 'string') {
        // Try to parse as number first
        const parsed = parseInt(commitmentId);
        if (!isNaN(parsed)) {
          idBN = new BN(parsed);
        } else {
          // If it's not a number, it might be a large number string
          idBN = new BN(commitmentId);
        }
      } else {
        idBN = new BN(commitmentId);
      }
      
      // Create the forfeit transaction
      const tx = await forfeitCommitmentTx(
        user,
        idBN,
        this.authorityKeypair.publicKey,
        this.treasuryPubkey
      );

      // Send and confirm the transaction
      const signature = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.authorityKeypair],
        {
          commitment: 'confirmed',
          maxRetries: 3
        }
      );

      console.log(`Commitment ${commitmentId} forfeited. Tx: ${signature}`);
      return signature;
    } catch (error) {
      console.error('Failed to forfeit commitment:', error);
      throw error;
    }
  }

  /**
   * Check if a commitment can be forfeited (past unlock time)
   */
  async canForfeit(commitment: any): Promise<boolean> {
    const now = new Date();
    const unlockTime = new Date(commitment.unlockTime);
    return now > unlockTime && commitment.status === 'active';
  }
}

// Export singleton instance
export const forfeitService = new ForfeitService();