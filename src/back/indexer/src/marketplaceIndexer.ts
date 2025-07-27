import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet, Idl } from '@coral-xyz/anchor';
import * as dotenv from 'dotenv';
import marketplaceIdl from '../../programs/target/idl/data_marketplace.json';
import type { DataMarketplace } from '../../programs/target/types/data_marketplace';
import { prisma } from './lib/prisma';
import { ScheduleService } from './services/scheduleService';
import { MerkleService } from './services/merkleService';
import { createSquadsConfig } from './services/squadsService';
import { createHandlers } from './handlers/marketplace';
import { SurfpoolWebsocketClient } from './surfpoolWebsocket';

dotenv.config();

const NETWORK = process.env.NETWORK || 'localnet';
const RPC_URL = process.env.RPC_URL || (NETWORK === 'localnet' ? 'http://127.0.0.1:8899' : `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);
const WS_URL = process.env.WS_URL || (NETWORK === 'localnet' ? 'ws://127.0.0.1:8900' : `wss://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);

class MarketplaceIndexer {
  private connection: Connection;
  private program: Program<DataMarketplace>;
  private scheduleService: ScheduleService;
  private merkleService: MerkleService;
  private authorityKeypair?: Keypair;
  private subscriptionId: number | null = null;
  private logsSubscriptionId: number | null = null;
  private handlers: any;
  private surfpoolClient: SurfpoolWebsocketClient | null = null;

  constructor() {
    console.log(`[MarketplaceIndexer] Connecting to ${NETWORK} at ${RPC_URL}`);
    this.connection = new Connection(RPC_URL, {
      commitment: 'confirmed',
    });

    // Load authority keypair based on network
    if (NETWORK === 'mainnet-beta') {
      // Mainnet: No local keypair needed, will use Squads
      console.log('[MarketplaceIndexer] Mainnet mode - will use Squads for merkle updates');
    } else if (process.env.AUTHORITY_PRIVATE_KEY) {
      // Devnet/Localnet: Load keypair for direct execution
      try {
        const secretKey = JSON.parse(process.env.AUTHORITY_PRIVATE_KEY);
        this.authorityKeypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
        console.log(`[MarketplaceIndexer] Authority keypair loaded for ${NETWORK}`);
      } catch (error) {
        console.error('[MarketplaceIndexer] Failed to load authority keypair:', error);
        console.warn('[MarketplaceIndexer] Merkle root updates will not be executed on-chain');
      }
    } else if (NETWORK !== 'mainnet-beta') {
      console.warn(`[MarketplaceIndexer] No AUTHORITY_PRIVATE_KEY provided for ${NETWORK}`);
      console.warn('[MarketplaceIndexer] Merkle root updates will not be executed on-chain');
    }

    const wallet = new Wallet(this.authorityKeypair || Keypair.generate());
    const provider = new AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
    this.program = new Program(marketplaceIdl as Idl, provider) as Program<DataMarketplace>;

    // Initialize services
    this.merkleService = new MerkleService(prisma, this.connection, this.authorityKeypair);
    
    // Configure Squads for mainnet only
    let squadsConfig: ReturnType<typeof createSquadsConfig> | undefined;
    if (NETWORK === 'mainnet-beta' && process.env.SQUADS_MULTISIG_ADDRESS) {
      squadsConfig = createSquadsConfig(process.env.SQUADS_MULTISIG_ADDRESS);
      console.log('[MarketplaceIndexer] Using Squads multisig:', process.env.SQUADS_MULTISIG_ADDRESS);
    } else if (NETWORK === 'mainnet-beta' && !process.env.SQUADS_MULTISIG_ADDRESS) {
      console.error('[MarketplaceIndexer] ERROR: Mainnet requires SQUADS_MULTISIG_ADDRESS');
      throw new Error('SQUADS_MULTISIG_ADDRESS required for mainnet');
    }
    
    this.scheduleService = new ScheduleService(prisma, this.connection, this.authorityKeypair, squadsConfig);
    this.handlers = createHandlers(this.program, this.connection, this.merkleService);
  }

  async start() {
    console.log('[MarketplaceIndexer] Starting services...');
    
    if (NETWORK === 'localnet') {
      // Use Surfpool websocket client for localnet
      this.surfpoolClient = new SurfpoolWebsocketClient(WS_URL);
      await this.surfpoolClient.connect();
      
      // Subscribe to program account changes via Surfpool
      this.subscriptionId = await this.surfpoolClient.programSubscribe(
        this.program.programId,
        this.handlers.handleAccountChange,
        'confirmed'
      );
      
      // Subscribe to logs via Surfpool
      this.logsSubscriptionId = await this.surfpoolClient.logsSubscribe(
        { mentions: [this.program.programId.toBase58()] },
        this.handlers.handleLogs,
        'confirmed'
      );
    } else {
      // Use standard web3.js methods for mainnet/devnet
      this.subscriptionId = this.connection.onProgramAccountChange(
        this.program.programId,
        this.handlers.handleAccountChange,
        { 
          commitment: 'confirmed',
          encoding: 'base64'
        }
      );

      this.logsSubscriptionId = this.connection.onLogs(
        this.program.programId,
        this.handlers.handleLogs,
        'confirmed'
      );
    }
    
    // Start scheduled jobs
    this.scheduleService.start();
    
    // Do initial fetch of all accounts
    await this.fetchAllAccounts();
    
    console.log(`[MarketplaceIndexer] Started with subscriptions: account=${this.subscriptionId}, logs=${this.logsSubscriptionId}`);
  }

  async stop() {
    console.log('[MarketplaceIndexer] Stopping services...');
    
    if (NETWORK === 'localnet' && this.surfpoolClient) {
      if (this.subscriptionId !== null) {
        await this.surfpoolClient.unsubscribe(this.subscriptionId);
      }
      if (this.logsSubscriptionId !== null) {
        await this.surfpoolClient.unsubscribe(this.logsSubscriptionId);
      }
      await this.surfpoolClient.disconnect();
    } else {
      if (this.subscriptionId !== null) {
        await this.connection.removeProgramAccountChangeListener(this.subscriptionId);
      }
      if (this.logsSubscriptionId !== null) {
        await this.connection.removeOnLogsListener(this.logsSubscriptionId);
      }
    }
    
    // Stop scheduled jobs
    this.scheduleService.stop();
    
    console.log('[MarketplaceIndexer] Services stopped');
  }

  /**
   * Fetch all program accounts on startup
   */
  async fetchAllAccounts() {
    try {
      console.log('[MarketplaceIndexer] Fetching all program accounts...');
      
      // Fetch all program accounts
      const accounts = await this.connection.getProgramAccounts(this.program.programId, {
        commitment: 'confirmed',
      });
      
      console.log(`[MarketplaceIndexer] Found ${accounts.length} accounts to index`);
      
      // Process each account
      for (const { pubkey, account } of accounts) {
        await this.handlers.handleAccountChange({
          accountId: pubkey,
          accountInfo: account,
          slot: 0, // Not relevant for initial fetch
        });
      }
      
      console.log('[MarketplaceIndexer] Initial account fetch complete');
    } catch (error) {
      console.error('[MarketplaceIndexer] Error fetching initial accounts:', error);
    }
  }

  /**
   * Process a purchase manually (for testing or recovery)
   */
  async processPurchase(passId: string): Promise<void> {
    try {
      const periodId = ScheduleService.getCurrentPeriodId();
      const { totalAmount, sellerCount } = await this.merkleService.generateDistribution(periodId);
      
      console.log(`[MarketplaceIndexer] Generated distribution for pass ${passId}: ${sellerCount} sellers, ${totalAmount} lamports`);
    } catch (error) {
      console.error('[MarketplaceIndexer] Error processing purchase:', error);
    }
  }

  /**
   * Create a snapshot manually (for testing)
   */
  async createSnapshot(
    startDate: Date,
    endDate: Date,
    maxPricePerDay: string
  ): Promise<{ merkleRoot: number[], eligibleSellerCount: number }> {
    try {
      const { BN } = await import('@coral-xyz/anchor');
      
      const result = await this.merkleService.createListingsSnapshot(
        new BN(Math.floor(startDate.getTime() / 1000)),
        new BN(Math.floor(endDate.getTime() / 1000)),
        new BN(maxPricePerDay)
      );
      
      console.log(`[MarketplaceIndexer] Created snapshot with ${result.eligibleSellerCount} eligible sellers`);
      return result;
    } catch (error) {
      console.error('[MarketplaceIndexer] Error creating snapshot:', error);
      throw error;
    }
  }
}

// Main function to run the indexer
async function main() {
  const indexer = new MarketplaceIndexer();

  await indexer.start();

  process.on('SIGINT', async () => {
    console.log('\n[MarketplaceIndexer] Shutting down...');
    await indexer.stop();
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Start indexer if running directly
if (require.main === module) {
  main().catch(console.error);
}

export default MarketplaceIndexer;