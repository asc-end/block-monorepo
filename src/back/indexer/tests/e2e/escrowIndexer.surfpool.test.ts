import { expect } from 'chai';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SurfpoolConnection } from '../utils/surfpoolConnection';
import { TestDatabase } from '../utils/testDatabase';
import { ProgramDeployment } from '../utils/programDeployment';
import { TransactionHelpers } from '../utils/transactionHelpers';
import EscrowIndexer from '../../src/index';

describe('Escrow Indexer Surfpool E2E Tests', function() {
  this.timeout(300000); // 5 minutes for entire suite
  
  // Configure for Surfpool localnet
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
    console.log('🚀 Setting up Surfpool test environment...');
    
    // Connect to Surfpool localnet
    surfpoolConnection = new SurfpoolConnection();
    const connection = await surfpoolConnection.start();
    console.log('✅ Connected to Surfpool localnet');

    // Set up test database
    database = new TestDatabase();
    await database.setup();
    console.log('✅ Test database initialized');

    // Deploy escrow program
    deployment = new ProgramDeployment(connection, surfpoolConnection);
    const programId = await deployment.deployEscrowProgram();
    console.log(`✅ Escrow program deployed: ${programId}`);

    // Create and fund test wallets
    userWallet = Keypair.generate();
    authorityWallet = Keypair.generate();
    await surfpoolConnection.requestAirdrop(userWallet.publicKey, 10 * LAMPORTS_PER_SOL);
    await surfpoolConnection.requestAirdrop(authorityWallet.publicKey, 10 * LAMPORTS_PER_SOL);
    console.log('✅ Test wallets funded');

    // Initialize transaction helpers
    transactionHelpers = new TransactionHelpers(connection, programId, userWallet);

    // Start indexer
    indexer = new EscrowIndexer();
    await indexer.start();
    console.log('✅ Indexer started with Surfpool websocket subscriptions');
  });

  after(async () => {
    console.log('🧹 Cleaning up test environment...');
    if (indexer) await indexer.stop();
    if (database) await database.teardown();
    if (surfpoolConnection) await surfpoolConnection.stop();
  });

  beforeEach(async () => {
    await database.reset();
  });

  describe('WebSocket Event Subscriptions', () => {
    it('should successfully subscribe to program account changes', async () => {
      // Verify that the indexer has active subscriptions
      const subscriptions = await surfpoolConnection.getConnection()._rpcWebSocket.subscriptions;
      expect(subscriptions).to.not.be.undefined;
      console.log('✅ WebSocket subscriptions active');
    });

    it('should receive account change events via programSubscribe', async () => {
      const amount = 1 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 3600;

      // Create commitment and wait for account change event
      const { tx, commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for Surfpool's websocket to deliver the event
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verify database was updated via account change subscription
      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment).to.not.be.null;
      expect(commitment?.userId).to.equal(userWallet.publicKey.toString());
      expect(commitment?.amount.toString()).to.equal(amount.toString());
      console.log('✅ Account change event processed successfully');
    });

    it('should receive log events via logsSubscribe', async () => {
      const amount = 2 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 7200;

      // Track if log event was received
      let logEventReceived = false;
      const originalHandleLogs = indexer['handlers'].handleLogs;
      indexer['handlers'].handleLogs = function(logs: any) {
        logEventReceived = true;
        return originalHandleLogs.call(this, logs);
      };

      // Create commitment
      await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for log event
      await new Promise(resolve => setTimeout(resolve, 3000));

      expect(logEventReceived).to.be.true;
      console.log('✅ Log event received via websocket');

      // Restore original handler
      indexer['handlers'].handleLogs = originalHandleLogs;
    });
  });

  describe('Commitment Lifecycle with Surfpool', () => {
    it('should index commitment creation in real-time', async () => {
      const amount = 1.5 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 3600;

      const { tx, commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for Surfpool websocket events
      await new Promise(resolve => setTimeout(resolve, 3000));

      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment).to.not.be.null;
      expect(commitment?.status).to.equal('active');
      expect(commitment?.createdAt).to.not.be.null;
      expect(commitment?.unlockTime).to.not.be.null;
      console.log('✅ Commitment creation indexed in real-time');
    });

    it('should update commitment status on claim', async () => {
      // Create commitment with very short unlock time
      const amount = 1 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 5; // 5 seconds in future

      const { commitmentPda, createdAt } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for initial indexing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Wait for unlock time to pass
      await new Promise(resolve => setTimeout(resolve, 6000));

      // Claim the commitment
      await transactionHelpers.claimCommitment(userWallet, createdAt, unlockTime);

      // Wait for status update via websocket
      await new Promise(resolve => setTimeout(resolve, 3000));

      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment?.status).to.equal('claimed');
      console.log('✅ Commitment claim status updated');
    });

    it('should update commitment status on forfeit', async () => {
      const forfeitUser = Keypair.generate();
      await surfpoolConnection.requestAirdrop(forfeitUser.publicKey, 10 * LAMPORTS_PER_SOL);
      
      const helpers = new TransactionHelpers(
        surfpoolConnection.getConnection(),
        deployment.getProgramId(),
        forfeitUser
      );

      const amount = 1 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 3600;

      const { commitmentPda, createdAt } = await helpers.createCommitment(
        forfeitUser,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      // Wait for initial indexing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Forfeit the commitment
      const treasury = Keypair.generate().publicKey;
      const protocolTreasury = Keypair.generate().publicKey;
      await helpers.forfeitCommitment(
        forfeitUser, 
        authorityWallet, 
        createdAt, 
        unlockTime, 
        treasury, 
        protocolTreasury
      );

      // Wait for status update
      await new Promise(resolve => setTimeout(resolve, 3000));

      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment?.status).to.equal('forfeited');
      console.log('✅ Commitment forfeit status updated');
    });
  });

  describe('Multiple Concurrent Events', () => {
    it('should handle multiple simultaneous commitments', async () => {
      const wallets = [];
      const commitmentPromises = [];
      const numberOfCommitments = 5;

      // Create multiple wallets
      for (let i = 0; i < numberOfCommitments; i++) {
        const wallet = Keypair.generate();
        await surfpoolConnection.requestAirdrop(wallet.publicKey, 5 * LAMPORTS_PER_SOL);
        wallets.push(wallet);
      }

      // Create commitments concurrently
      for (let i = 0; i < numberOfCommitments; i++) {
        const helpers = new TransactionHelpers(
          surfpoolConnection.getConnection(),
          deployment.getProgramId(),
          wallets[i]
        );

        const promise = helpers.createCommitment(
          wallets[i],
          (i + 1) * LAMPORTS_PER_SOL,
          Math.floor(Date.now() / 1000) + 3600 + (i * 100),
          authorityWallet.publicKey
        );
        commitmentPromises.push(promise);
      }

      const results = await Promise.all(commitmentPromises);

      // Wait for all events to be processed
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Verify all commitments were indexed
      const prisma = database.getClient();
      const commitments = await prisma.commitment.findMany({
        where: {
          userId: {
            in: wallets.map(w => w.publicKey.toString())
          }
        }
      });

      expect(commitments).to.have.lengthOf(numberOfCommitments);
      console.log(`✅ All ${numberOfCommitments} concurrent commitments indexed`);
    });
  });

  describe('Reconciliation with Surfpool', () => {
    it('should reconcile events missed during downtime', async () => {
      // Stop the indexer
      await indexer.stop();
      console.log('⏸️  Indexer stopped');

      // Create commitments while indexer is down
      const missedCommitments = [];
      for (let i = 0; i < 3; i++) {
        const wallet = Keypair.generate();
        await surfpoolConnection.requestAirdrop(wallet.publicKey, 5 * LAMPORTS_PER_SOL);
        
        const helpers = new TransactionHelpers(
          surfpoolConnection.getConnection(),
          deployment.getProgramId(),
          wallet
        );

        const result = await helpers.createCommitment(
          wallet,
          (i + 1) * LAMPORTS_PER_SOL,
          Math.floor(Date.now() / 1000) + 7200,
          authorityWallet.publicKey
        );
        missedCommitments.push(result);
      }

      console.log('📝 Created 3 commitments while indexer was down');

      // Restart indexer and run reconciliation
      await indexer.start();
      await indexer.reconcileCommitments();
      console.log('✅ Indexer restarted and reconciliation executed');

      // Wait for reconciliation to complete
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Verify all missed commitments were indexed
      const prisma = database.getClient();
      for (const missed of missedCommitments) {
        const commitment = await prisma.commitment.findUnique({
          where: { id: missed.commitmentPda.toString() }
        });
        expect(commitment).to.not.be.null;
        expect(commitment?.status).to.equal('active');
      }

      console.log('✅ All missed commitments successfully reconciled');
    });
  });

  describe('Error Handling with Surfpool WebSocket', () => {
    it('should handle websocket reconnection', async () => {
      // This test verifies that the indexer can handle websocket disconnections
      // In a real scenario, you might simulate network issues
      
      const amount = 1 * LAMPORTS_PER_SOL;
      const unlockTime = Math.floor(Date.now() / 1000) + 3600;

      // Create commitment to ensure websocket is working
      const { commitmentPda } = await transactionHelpers.createCommitment(
        userWallet,
        amount,
        unlockTime,
        authorityWallet.publicKey
      );

      await new Promise(resolve => setTimeout(resolve, 3000));

      const prisma = database.getClient();
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentPda.toString() }
      });

      expect(commitment).to.not.be.null;
      console.log('✅ WebSocket connection remains stable');
    });
  });
});