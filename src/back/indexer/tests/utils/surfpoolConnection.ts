import { Connection } from '@solana/web3.js';

/**
 * Connection wrapper for Surfpool's running localnet
 * This replaces LocalValidator for tests that need to connect to an existing Surfpool localnet
 */
export class SurfpoolConnection {
  private connection: Connection;
  private rpcUrl: string;

  constructor(rpcUrl: string = 'http://127.0.0.1:8899') {
    this.rpcUrl = rpcUrl;
    this.connection = new Connection(rpcUrl, 'confirmed');
  }

  async start(): Promise<Connection> {
    // Verify connection is active
    try {
      const version = await this.connection.getVersion();
      console.log(`Connected to Surfpool localnet at ${this.rpcUrl}`);
      console.log(`Solana version: ${JSON.stringify(version)}`);
      return this.connection;
    } catch (error) {
      throw new Error(`Failed to connect to Surfpool localnet at ${this.rpcUrl}: ${error}`);
    }
  }

  async stop(): Promise<void> {
    // No-op since we don't manage the validator
    console.log('Disconnecting from Surfpool localnet (connection only)');
  }

  getConnection(): Connection {
    return this.connection;
  }

  async requestAirdrop(publicKey: any, lamports: number): Promise<string> {
    const signature = await this.connection.requestAirdrop(publicKey, lamports);
    await this.connection.confirmTransaction(signature);
    return signature;
  }
}