import { expect } from 'chai';
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TestDatabase } from '../utils/testDatabase';
import { TransactionHelpers } from '../utils/transactionHelpers';
import EscrowIndexer from '../../src/index';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load devnet environment
dotenv.config({ path: path.join(__dirname, '../../.env.devnet') });

describe('Escrow Indexer Devnet E2E Tests', function() {
  this.timeout(300000); // 5 minutes for devnet tests
  
  let connection: Connection;
  let database: TestDatabase;
  let indexer: EscrowIndexer;
  let transactionHelpers: TransactionHelpers;
  let userWallet: Keypair;
  let authorityWallet: Keypair;
  
  // Use the deployed program ID from environment
  const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || '9xW16Nm43UQqfPdPJ5yqJgDaXRjewUvpN6CUqLqESZyB');

  before(async () => {
    console.log('Setting up devnet test environment...');
    
    if (!process.env.HELIUS_API_KEY) {
      throw new Error('HELIUS_API_KEY environment variable is required for devnet tests');
    }
    
    // Connect to devnet via Helius
    const rpcUrl = `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;
    connection = new Connection(rpcUrl, 'confirmed');
    console.log('Connected to Solana devnet via Helius');

    // Set up test database
    database = new TestDatabase();
    await database.setup();
    console.log('Test database created');

    // Create test wallets
    userWallet = Keypair.generate();
    authorityWallet = Keypair.generate();
    
    // Request airdrops (devnet allows up to 2 SOL per request)
    console.log('Requesting airdrops for test wallets...');
    try {
      await connection.requestAirdrop(userWallet.publicKey, 2 * LAMPORTS_PER_SOL);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait between airdrops
      await connection.requestAirdrop(authorityWallet.publicKey, 2 * LAMPORTS_PER_SOL);
      
      // Wait for confirmations
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Airdrop failed:', error);
      console.log('Note: Devnet airdrops can be rate-limited. You may need to wait or use pre-funded wallets.');
    }
    
    console.log('Test wallets funded');

    // Initialize transaction helpers with deployed program
    transactionHelpers = new TransactionHelpers(connection, PROGRAM_ID, userWallet);

    // Start indexer
    indexer = new EscrowIndexer();
    await indexer.start();
    console.log('Indexer started for devnet');
  });

  after(async () => {
    console.log('Cleaning up devnet test environment...');
    if (indexer) await indexer.stop();
    if (database) await database.teardown();
  });

  beforeEach(async () => {
    await database.reset();
  });

  describe('Commitment Creation on Devnet', () => {
    it('should index a new commitment when created on devnet', async () => {
      const amount = 100000000; // 0.1 SOL
      const unlockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      // Create commitment
      const { tx, commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      console.log(`Commitment created on devnet: ${tx}`);
      console.log(`View on explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);

      // Wait for indexing (longer for devnet)
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Verify database
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment).to.not.be.null;
      expect(commitment?.userId).to.equal(userWallet.publicKey.toString());
      expect(commitment?.amount.toString()).to.equal(amount.toString());
      expect(commitment?.status).to.equal('active');
      expect(commitment?.authorityPubkey).to.equal(authorityWallet.publicKey.toString());
    });
  });

  describe('Commitment Claim on Devnet', () => {
    it('should update status when commitment is claimed on devnet', async () => {
      // First create a commitment
      const amount = 100000000; // 0.1 SOL
      const unlockTime = Math.floor(Date.now() / 1000) - 60; // 1 minute ago (claimable)

      const { commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for initial indexing
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Claim the commitment
      const claimTx = await transactionHelpers.claimCommitment(userWallet, createdAt, unlockTime);
      console.log(`Commitment claimed on devnet: ${claimTx}`);
      console.log(`View on explorer: https://explorer.solana.com/tx/${claimTx}?cluster=devnet`);

      // Wait for status update
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Verify status updated
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment?.status).to.equal('claimed');
    });
  });
});