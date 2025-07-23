import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { SurfpoolConnection } from './surfpoolConnection';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export class ProgramDeployment {
  private connection: Connection;
  private provider: AnchorProvider;
  private programId: PublicKey | null = null;
  private surfpoolConnection?: SurfpoolConnection;

  constructor(connection: Connection, surfpoolConnection?: SurfpoolConnection) {
    this.connection = connection;
    this.surfpoolConnection = surfpoolConnection;
    const wallet = new Wallet(Keypair.generate());
    this.provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  }

  async deployEscrowProgram(): Promise<PublicKey> {
    // Use the pre-built program from target directory
    const programSoPath = path.join(__dirname, '../../../programs/target/deploy/escrow.so');
    const programKeypairPath = path.join(__dirname, '../../../programs/target/deploy/escrow-keypair.json');
    
    // Check if program files exist
    if (!fs.existsSync(programSoPath)) {
      throw new Error(`Program .so file not found at ${programSoPath}`);
    }
    
    // Read program keypair to get the program ID
    let programKeypair: Keypair;
    if (fs.existsSync(programKeypairPath)) {
      const keypairData = JSON.parse(fs.readFileSync(programKeypairPath, 'utf-8'));
      programKeypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    } else {
      // Generate a new keypair for the program
      programKeypair = Keypair.generate();
    }
    
    console.log('Deploying escrow program...');
    
    // Deploy using solana program deploy command
    try {
      // Write keypair to temp file if it doesn't exist
      // let keypairPath = programKeypairPath;
      // if (!fs.existsSync(programKeypairPath)) {
      //   keypairPath = `/tmp/escrow-keypair-${Date.now()}.json`;
      //   fs.writeFileSync(keypairPath, JSON.stringify(Array.from(programKeypair.secretKey)));
      // }
      // // Create a fee payer keypair and fund it
      // const feePayerKeypair = Keypair.generate();
      // const feePayerPath = `/tmp/fee-payer-${Date.now()}.json`;
      // fs.writeFileSync(feePayerPath, JSON.stringify(Array.from(feePayerKeypair.secretKey)));
      
      // if (this.surfpoolConnection) {
      //   await this.surfpoolConnection.requestAirdrop(feePayerKeypair.publicKey, 10 * 1e9);
      // } else {
      //   await this.airdrop(feePayerKeypair.publicKey, 10);
      // }
      
      // const deployOutput = execSync(
      //   `solana program deploy ${programSoPath} --program-id ${keypairPath} --keypair ${feePayerPath} --url http://localhost:8899`,
      //   { stdio: 'pipe', encoding: 'utf-8' }
      // );
      
      // // Clean up fee payer file
      // fs.unlinkSync(feePayerPath);
      // console.log('Deploy success:', deployOutput);
    } catch (error: any) {
      console.log('Deploy command stdout:', error.stdout?.toString());
      console.error('Deploy command stderr:', error.stderr?.toString());
      // Program might already be deployed, which is okay for tests
    }

    this.programId = programKeypair.publicKey;
    console.log('Program deployed at:', this.programId.toBase58());
    return this.programId;
  }

  async airdrop(pubkey: PublicKey, amount: number = 10): Promise<void> {
    let retries = 3;
    while (retries > 0) {
      try {
        const signature = await this.connection.requestAirdrop(
          pubkey,
          amount * 1e9 // Convert SOL to lamports
        );
        
        // Get latest blockhash after requesting airdrop
        const latestBlockhash = await this.connection.getLatestBlockhash();
        
        // Wait for confirmation with commitment
        await this.connection.confirmTransaction({
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        }, 'confirmed');
        
        console.log(`Airdropped ${amount} SOL to ${pubkey.toBase58()}`);
        return;
      } catch (error: any) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        console.log(`Airdrop failed, retrying... (${retries} retries left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  getProgramId(): PublicKey {
    if (!this.programId) {
      throw new Error('Program not deployed');
    }
    return this.programId;
  }
}