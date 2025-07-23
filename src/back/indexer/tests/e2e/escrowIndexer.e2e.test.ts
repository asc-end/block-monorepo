import { expect } from 'chai';
import { Keypair } from '@solana/web3.js';
import { SurfpoolConnection } from '../utils/surfpoolConnection';
import { TestDatabase } from '../utils/testDatabase';
import { ProgramDeployment } from '../utils/programDeployment';
import { TransactionHelpers } from '../utils/transactionHelpers';
import EscrowIndexer from '../../src/index';

describe('Escrow Indexer E2E Tests', function() {
  this.timeout(1200000); // 2 minutes for entire suite
  
  // Ensure we're using localnet for tests
  process.env.NETWORK = 'localnet';
  process.env.RPC_URL = 'http://127.0.0.1:8899';
  process.env.WS_URL = 'ws://127.0.0.1:8900';

  let surfpoolConnection: SurfpoolConnection;
  let database: TestDatabase;
  let deployment: ProgramDeployment;
  let indexer: EscrowIndexer;
  let transactionHelpers: TransactionHelpers;
  let userWallet: Keypair;
  let authorityWallet: Keypair;

  before(async () => {
    console.log('Setting up test environment...');
    
    // Connect to existing Surfpool localnet
    surfpoolConnection = new SurfpoolConnection();
    const connection = await surfpoolConnection.start();
    console.log('Connected to Surfpool localnet');

    // Set up test database
    database = new TestDatabase();
    await database.setup();
    console.log('Test database created');

    // Deploy escrow program
    deployment = new ProgramDeployment(connection, surfpoolConnection);
    const programId = await deployment.deployEscrowProgram();
    console.log(`program set up: ${programId}`);

    // Create test wallets
    userWallet = Keypair.generate();
    authorityWallet = Keypair.generate();
    await surfpoolConnection.requestAirdrop(userWallet.publicKey, 10 * 1e9);
    await surfpoolConnection.requestAirdrop(authorityWallet.publicKey, 10 * 1e9);
    console.log('Test wallets funded');

    // Initialize transaction helpers
    transactionHelpers = new TransactionHelpers(connection, programId, userWallet);

    // Start indexer
    indexer = new EscrowIndexer();
    await indexer.start();
    console.log('Indexer started');
  });

  after(async () => {
    console.log('Cleaning up test environment...');
    if (indexer) await indexer.stop();
    if (database) await database.teardown();
    if (surfpoolConnection) await surfpoolConnection.stop();
  });

  beforeEach(async () => {
    await database.reset();
  });

  describe('Commitment Creation', () => {
    it('should index a new commitment when created', async () => {
      const amount = 1000000000; // 1 SOL
      const unlockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      // Create commitment
      const { tx, commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for indexing
      await new Promise(resolve => setTimeout(resolve, 3000));

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

  describe('Commitment Claim', () => {
    it('should update status when commitment is claimed', async () => {
      // First create a commitment
      const amount = 1000000000;
      const unlockTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago (claimable)

      const { commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for initial indexing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Claim the commitment
      await transactionHelpers.claimCommitment(userWallet, createdAt, unlockTime);

      // Wait for status update
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verify status updated
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment?.status).to.equal('claimed');
    });
  });

  describe('Commitment Forfeit', () => {
    it('should update status when commitment is forfeited', async () => {
      // Create a new user for this test
      const newUser = Keypair.generate();
      await surfpoolConnection.requestAirdrop(newUser.publicKey, 10 * 1e9);
      
      const helpers = new TransactionHelpers(
        surfpoolConnection.getConnection(),
        deployment.getProgramId(),
        newUser
      );

      // Create commitment
      const amount = 1000000000;
      const unlockTime = Math.floor(Date.now() / 1000) + 3600; // Future time

      const { commitmentPda, createdAt } = await helpers.createCommitment(
        newUser,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for initial indexing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Forfeit the commitment
      // Using dummy treasury addresses for testing
      const treasury = Keypair.generate().publicKey;
      const protocolTreasury = Keypair.generate().publicKey;
      await helpers.forfeitCommitment(newUser, authorityWallet, createdAt, unlockTime, treasury, protocolTreasury);

      // Wait for status update
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verify status updated
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment?.status).to.equal('forfeited');
    });
  });

  describe('Reconciliation', () => {
    it('should reconcile missed events', async () => {
      // Stop the indexer temporarily
      await indexer.stop();

      // Create commitment while indexer is stopped
      const amount = 2000000000;
      const unlockTime = Math.floor(Date.now() / 1000) + 7200;

      const { commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Restart indexer and run reconciliation
      await indexer.start();
      await indexer.reconcileCommitments();

      // Wait for reconciliation to complete
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Verify commitment was indexed
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment).to.not.be.null;
      expect(commitment?.amount.toString()).to.equal(amount.toString());
    });
  });
});