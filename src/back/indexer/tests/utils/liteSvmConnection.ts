import { Connection, Keypair, PublicKey, Transaction, VersionedTransaction, SendOptions, Commitment, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { LiteSVM } from 'litesvm';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Mock Connection that uses LiteSVM for local testing
 * This provides a Solana-like environment without needing a real validator
 */
export class LiteSvmConnection extends Connection {
  private liteSvm: LiteSVM;
  private programId: PublicKey;

  constructor(programId?: string) {
    // Use a dummy URL since we're not actually connecting to anything
    super('http://localhost:0', 'confirmed');
    
    this.liteSvm = new LiteSVM();
    this.programId = new PublicKey(programId || '9xW16Nm43UQqfPdPJ5yqJgDaXRjewUvpN6CUqLqESZyB');
    
    // Load the escrow program
    const programPath = path.join(__dirname, '../../../../../target/deploy/escrow.so');
    if (fs.existsSync(programPath)) {
      const programBytes = fs.readFileSync(programPath);
      this.liteSvm.addProgram(this.programId, programBytes);
      console.log(`Loaded escrow program at ${this.programId.toString()}`);
    } else {
      throw new Error(`Program file not found at ${programPath}. Run 'anchor build' first.`);
    }
  }

  async start(): Promise<Connection> {
    console.log('LiteSVM connection initialized');
    return this;
  }

  async stop(): Promise<void> {
    console.log('LiteSVM connection closed');
  }

  getConnection(): Connection {
    return this;
  }

  // Override methods to use LiteSVM

  async getBalance(publicKey: PublicKey, commitment?: Commitment): Promise<number> {
    const account = this.liteSvm.getAccount(publicKey);
    return account ? account.lamports : 0;
  }

  async requestAirdrop(publicKey: PublicKey, lamports: number): Promise<string> {
    this.liteSvm.airdrop(publicKey, lamports).unwrap();
    return 'mock-airdrop-signature';
  }

  async confirmTransaction(signature: string | { signature: string }, commitment?: Commitment): Promise<RpcResponseAndContext<SignatureResult>> {
    // LiteSVM transactions are instant, so we always return confirmed
    return {
      context: { slot: 0 },
      value: { err: null }
    };
  }

  async sendTransaction(
    transaction: Transaction | VersionedTransaction,
    signers?: Array<Keypair>,
    options?: SendOptions
  ): Promise<string> {
    // For LiteSVM, we need the legacy Transaction format
    if (transaction instanceof Transaction) {
      const result = this.liteSvm.sendTransaction(transaction);
      if (result.isOk()) {
        return 'mock-tx-signature';
      } else {
        throw new Error(`Transaction failed: ${result.unwrapErr()}`);
      }
    }
    throw new Error('LiteSVM only supports legacy transactions');
  }

  async getLatestBlockhash(commitment?: Commitment): Promise<{ blockhash: string; lastValidBlockHeight: number }> {
    return {
      blockhash: this.liteSvm.latestBlockhash(),
      lastValidBlockHeight: 1000000
    };
  }

  async getVersion(): Promise<any> {
    return { 'solana-core': '1.18.0 (litesvm)' };
  }

  async getAccountInfo(publicKey: PublicKey, commitment?: Commitment): Promise<any> {
    const account = this.liteSvm.getAccount(publicKey);
    if (!account) return null;
    
    return {
      data: account.data,
      executable: account.executable,
      lamports: account.lamports,
      owner: account.owner,
      rentEpoch: account.rentEpoch || 0
    };
  }

  async getProgramAccounts(programId: PublicKey, configOrCommitment?: any): Promise<Array<any>> {
    // LiteSVM doesn't have a direct way to get program accounts
    // For testing, we'll return an empty array
    return [];
  }

  async getSignaturesForAddress(address: PublicKey, options?: any, commitment?: Commitment): Promise<Array<any>> {
    // Mock implementation for testing
    return [];
  }

  async getTransaction(signature: string, config?: any): Promise<any> {
    // Mock implementation for testing
    return null;
  }

  // Mock WebSocket subscription methods
  onProgramAccountChange(
    programId: PublicKey,
    callback: (accountInfo: any) => void,
    commitment?: Commitment
  ): number {
    console.log('Mock: onProgramAccountChange subscription created');
    // Return a mock subscription ID
    return 1;
  }

  onLogs(
    filter: PublicKey | 'all' | 'allWithVotes',
    callback: (logs: any) => void,
    commitment?: Commitment
  ): number {
    console.log('Mock: onLogs subscription created');
    // Return a mock subscription ID
    return 2;
  }

  async removeProgramAccountChangeListener(id: number): Promise<void> {
    console.log('Mock: Removed program account change listener');
  }

  async removeOnLogsListener(id: number): Promise<void> {
    console.log('Mock: Removed logs listener');
  }

  // Helper method to get the underlying LiteSVM instance for direct manipulation
  getLiteSvm(): LiteSVM {
    return this.liteSvm;
  }
}