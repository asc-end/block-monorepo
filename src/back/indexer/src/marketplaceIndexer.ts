import { Connection, PublicKey, Keypair, KeyedAccountInfo, Logs, Commitment } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet, Idl, BN, EventParser } from '@coral-xyz/anchor';
import * as dotenv from 'dotenv';
import marketplaceIdl from '../../programs/target/idl/data_marketplace.json';
import type { DataMarketplace } from '../../programs/target/types/data_marketplace';
import { prisma } from './lib/prisma';
import { ScheduleService } from './services/scheduleService';
import { MerkleService } from './services/merkleService';
import { createSquadsConfig } from './services/squadsService';
import { SurfpoolWebsocketClient } from './surfpoolWebsocket';
import { marketplacePDAs } from '@blockit/shared';
import { indexDataListingAccount, indexDataPassAccount, indexDataSellerAccount, indexMarketplaceConfigAccount, indexMerkleDistributorAccount } from './lib/marketplace/indexAccounts';
import { handleDataPassPurchased, handleListingCreated, handleListingRemoved, handleListingUpdated, handleRevenueClaimed } from './lib/marketplace/indexLogs';
import { determineAccountType } from './lib/marketplace/eventType';

dotenv.config();

const NETWORK = process.env.NETWORK || 'localnet';
const RPC_URL = process.env.RPC_URL || (NETWORK === 'localnet' ? 'http://127.0.0.1:8899' : `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);
const WS_URL = process.env.WS_URL || (NETWORK === 'localnet' ? 'ws://127.0.0.1:8900' : `wss://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);

// Anchor event discriminators
const LISTING_CREATED_DISCRIMINATOR = "ListingCreated";
const LISTING_UPDATED_DISCRIMINATOR = "ListingUpdated";
const LISTING_REMOVED_DISCRIMINATOR = "ListingRemoved";
const DATA_PASS_PURCHASED_DISCRIMINATOR = "DataPassPurchased";
const REVENUE_CLAIMED_DISCRIMINATOR = "RevenueClaimed";

class MarketplaceIndexer {
  private connection: Connection;
  private program: Program<DataMarketplace>;
  private scheduleService: ScheduleService;
  private authorityKeypair?: Keypair;
  private subscriptionId: number | null = null;
  private logsSubscriptionId: number | null = null;
  private surfpoolClient: SurfpoolWebsocketClient | null = null;

  constructor() {
    console.log(`[MarketplaceIndexer] Connecting to ${NETWORK} at ${RPC_URL}`);
    this.connection = new Connection(RPC_URL, { commitment: 'confirmed' });

    if (process.env.AUTHORITY_PRIVATE_KEY) {
      try {
        const secretKey = JSON.parse(process.env.AUTHORITY_PRIVATE_KEY);
        this.authorityKeypair = Keypair.fromSecretKey(new Uint8Array(secretKey));
      } catch (error) {
        throw new Error(error)
      }
    } else{
      // throw new Error('Please provide an AUTHORITY_PRIVATE_KEY');
    }


    const wallet = new Wallet(this.authorityKeypair || Keypair.generate());
    const provider = new AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
    this.program = new Program(marketplaceIdl as Idl, provider) as Program<DataMarketplace>;

    // Initialize services
    // this.merkleService = new MerkleService(prisma, this.connection, this.authorityKeypair);
    // this.scheduleService = new ScheduleService(prisma, this.connection, this.authorityKeypair, squadsConfig);

    if (NETWORK === 'mainnet-beta') {
      if (process.env.SQUADS_MULTISIG_ADDRESS) {
        // let squadsConfig: ReturnType<typeof createSquadsConfig> | undefined;
        //   squadsConfig = createSquadsConfig(process.env.SQUADS_MULTISIG_ADDRESS);
      }
      else throw new Error('SQUADS_MULTISIG_ADDRESS required for mainnet');
    }

  }

  async start() {
    console.log('[MarketplaceIndexer] Starting services...');

    if (NETWORK === 'localnet') {
      // Use Surfpool websocket client for localnet
      this.surfpoolClient = new SurfpoolWebsocketClient(WS_URL);
      await this.surfpoolClient.connect();

      // Subscribe to program account changes and logs via Surfpool
      this.subscriptionId = await this.surfpoolClient.programSubscribe(this.program.programId, this.handleAccountChange.bind(this), 'confirmed');
      this.logsSubscriptionId = await this.surfpoolClient.logsSubscribe({ mentions: [this.program.programId.toBase58()] }, this.handleLogs.bind(this), 'confirmed');
    } else {
      // Use standard web3.js methods for mainnet/devnet
      this.subscriptionId = this.connection.onProgramAccountChange( this.program.programId, this.handleAccountChange.bind(this), { commitment: 'confirmed', encoding: 'base64'});
      // this.logsSubscriptionId = this.connection.onLogs(this.program.programId, this.handleLogs.bind(this), 'confirmed');
    }

    // Start scheduled jobs
    // this.scheduleService.start();
    console.log(`[MarketplaceIndexer] Started with subscriptions: account=${this.subscriptionId}, logs=${this.logsSubscriptionId}`);
  }

  async handleLogs(logs: Logs) {
    try {
      // Parse Anchor events from logs
      const eventParser = new EventParser(this.program.programId, this.program.coder);
      const events = eventParser.parseLogs(logs.logs);
      console.log(events)
      for (const event of events) {
        try {
          switch (event.name) {
            case LISTING_CREATED_DISCRIMINATOR:
              await handleListingCreated(event.data);
              break;
            case LISTING_UPDATED_DISCRIMINATOR:
              await handleListingUpdated(event.data);
              break;
            case LISTING_REMOVED_DISCRIMINATOR:
              await handleListingRemoved(event.data);
              break;
            case DATA_PASS_PURCHASED_DISCRIMINATOR:
              await handleDataPassPurchased(event.data);
              break;
            case REVENUE_CLAIMED_DISCRIMINATOR:
              await handleRevenueClaimed(event.data);
              break;
            default:
              console.log('Unknown event:', event.name);
          }
        } catch (error) {
          console.error('Error processing event:', error);
        }
      }
    } catch (error) {
      console.error(`Error processing logs for ${logs.signature}:`, error);
    }
  }

  async handleAccountChange(account: KeyedAccountInfo) {
    console.log("RAW ACCOUNT", account)
    const accountType = determineAccountType(account.accountInfo.data);
    console.log("ACCOUNT TYPE", accountType)
    const data = this.program.account.marketplaceConfig.coder.accounts.decode(accountType, account.accountInfo.data);
console.log(data)
    try {
      switch (accountType) {
        case 'marketplaceConfig':
          await indexMarketplaceConfigAccount(data, account.accountId);
          break;
        case 'dataListing':
          await indexDataListingAccount(data, account.accountId);
          break;
        case 'dataPass':
          await indexDataPassAccount(data, account.accountId);
          break;
        case 'dataSeller':
          await indexDataSellerAccount(data, account.accountId, this.program.programId);
          break;
        case 'merkleDistributor':
          await indexMerkleDistributorAccount(data, account.accountId);
          break;
      }
    } catch (e) {
      console.log("Error on account change", e)
    }
  }

  async stop() {
    console.log('[MarketplaceIndexer] Stopping services...');

    if (NETWORK === 'localnet' && this.surfpoolClient) {
      if (this.subscriptionId !== null) await this.surfpoolClient.unsubscribe(this.subscriptionId);
      if (this.logsSubscriptionId !== null) await this.surfpoolClient.unsubscribe(this.logsSubscriptionId);
      await this.surfpoolClient.disconnect();
    } else {
      if (this.subscriptionId !== null) await this.connection.removeProgramAccountChangeListener(this.subscriptionId);
      if (this.logsSubscriptionId !== null) await this.connection.removeOnLogsListener(this.logsSubscriptionId);
    }

    // this.scheduleService.stop();
    console.log('[MarketplaceIndexer] Services stopped');
  }

  /**
   * Reconcile marketplace data between on-chain state and database
   */
  async reconcile() {
    console.log('[MarketplaceIndexer] Starting marketplace data reconciliation...');

    try {
      const [marketPlaceConfig] = marketplacePDAs.getMarketplaceConfig(this.program.programId);
      // 1. Reconcile marketplace config
      const configAccount = await this.connection.getAccountInfo(marketPlaceConfig);
      const config = this.program.account.marketplaceConfig.coder.accounts.decode('marketplaceConfig', configAccount.data);
      await indexMarketplaceConfigAccount(config, marketPlaceConfig)

      // 2. Reconcile data listings first (to satisfy foreign key constraints)
      // TODO remove datalisting when account close
      // TODO remove isActive from schema
      const dataListingAccounts = await this.program.account.dataListing.all()
      for (const { account, publicKey } of dataListingAccounts) {
        await indexDataListingAccount(account, publicKey)
      }

      // 3. Reconcile data sellers (can now reference existing listings)
      const dataSellerAccounts = await this.program.account.dataSeller.all()
      for (const { account, publicKey } of dataSellerAccounts) {
        // console.log(account)
        await indexDataSellerAccount(account, publicKey, this.program.programId)
      }

      // 4. Reconcile merkle distributors
      const merkleDistributors = await this.program.account.merkleDistributor.all()
      for (const { account, publicKey } of merkleDistributors) {
        await indexMerkleDistributorAccount(account, publicKey);
      }

      // 6 reconcile data passes
      const dataPasses = await this.program.account.dataPass.all()
      for (const { account, publicKey } of dataPasses) {
        await indexDataPassAccount(account, publicKey)
      }

      // TODO: claim revenue

    } catch (error) {
      console.error('[MarketplaceIndexer] Error during reconciliation:', error);
      throw error;
    }
  }
}

// Main function to run the indexer
async function main() {
  const indexer = new MarketplaceIndexer();
  await indexer.start();
  await indexer.reconcile();

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