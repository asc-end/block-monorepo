import { Connection, PublicKey, Keypair, Logs, AccountInfo, KeyedAccountInfo } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider, Wallet, IdlAccounts, BN, Idl } from '@coral-xyz/anchor';
import * as dotenv from 'dotenv';
import escrowIdl from '../../programs/target/idl/escrow.json' with { type: 'json' };
import type { Escrow } from '../../programs/target/types/escrow';
import { createHandlers } from './lib/escrow/handlers';
import { prisma } from './lib/prisma';
import { SurfpoolWebsocketClient } from './surfpoolWebsocket';

dotenv.config();

const RECONCILIATION_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Support both localnet and mainnet configurations
const NETWORK = process.env.NETWORK || 'localnet';
const RPC_URL = process.env.RPC_URL || (NETWORK === 'localnet' ? 'http://127.0.0.1:8899' : `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);
const WS_URL = process.env.WS_URL || (NETWORK === 'localnet' ? 'ws://127.0.0.1:8900' : `wss://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`);

class EscrowIndexer {
  private connection: Connection;
  private program: Program<Escrow>;
  private subscriptionId: number | null = null;
  private logsSubscriptionId: number | null = null;
  private handlers: any;
  private surfpoolClient: SurfpoolWebsocketClient | null = null;

  constructor() {
    console.log(`Connecting to ${NETWORK} at ${RPC_URL}`);
    this.connection = new Connection(RPC_URL, {
      commitment: 'confirmed',
      wsEndpoint: WS_URL
    });

    const wallet = new Wallet(Keypair.generate());
    const provider = new AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
    this.program = new Program(escrowIdl as Idl, provider) as Program<Escrow>;
    this.handlers = createHandlers(this.program, this.connection);
  }

  async start() {
    if (NETWORK === 'localnet') {
      // Use Surfpool websocket client for localnet
      this.surfpoolClient = new SurfpoolWebsocketClient(WS_URL);
      await this.surfpoolClient.connect();

      // Comment out program account subscription for now
      // this.subscriptionId = await this.surfpoolClient.programSubscribe(
      //   this.program.programId,
      //   this.handlers.handleAccountChange,
      //   'confirmed'
      // );

      // Subscribe to logs via Surfpool only
      this.logsSubscriptionId = await this.surfpoolClient.logsSubscribe(
        { mentions: [this.program.programId.toBase58()] },
        this.handlers.handleLogs,
        'confirmed'
      );
    } else {
      // Use standard web3.js methods for mainnet/Helius
      this.subscriptionId = this.connection.onProgramAccountChange(
        this.program.programId,
        this.handlers.handleAccountChange,
        { commitment: 'confirmed' }
      );

      this.logsSubscriptionId = this.connection.onLogs(
        this.program.programId,
        this.handlers.handleLogs,
        'confirmed'
      );
    }

    console.log(`Indexer started with subscriptions: account=${this.subscriptionId}, logs=${this.logsSubscriptionId}`);
  }

  async stop() {
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
  }

  // Daily reconciliation to check for missed events
  async reconcileCommitments() {
    try {
      const signatures = await this.connection.getSignaturesForAddress(this.program.programId, { limit: 1000 });

      console.log(`Processing ${signatures.length} signatures`);
      for (const sigInfo of signatures) {
        try {
          const tx = await this.connection.getTransaction(sigInfo.signature, { maxSupportedTransactionVersion: 0, commitment: 'confirmed' });

          console.log(`Processing transaction ${sigInfo.signature}`);
          if (tx.meta.innerInstructions && tx.meta.innerInstructions.length > 0) {
            console.log(tx.meta.logMessages);
            // const eventIx = tx.meta.innerInstructions[0].instructions[0];

            for (const innerInstruction of tx.meta.innerInstructions[0].instructions) {
              const eventIx = innerInstruction;
              const rawData = anchor.utils.bytes.bs58.decode(eventIx.data);
              const base64Data = anchor.utils.bytes.base64.encode(rawData.subarray(8));
              const event = this.program.coder.events.decode(base64Data)

              if (event)
                await this.handlers.processEvent(event);

            }

          }

        } catch (error) {
          console.error(`Error processing signature ${sigInfo.signature}:`, error);
        }
      }

      console.log('Reconciliation completed');
    } catch (error) {
      console.error('Reconciliation error:', error);
    }
  }
}

// Main function to run the indexer
async function main() {
  const indexer = new EscrowIndexer();

  await indexer.start();
  await indexer.reconcileCommitments();

  setInterval(async () => await indexer.reconcileCommitments(), RECONCILIATION_INTERVAL_MS);

  process.on('SIGINT', async () => {
    console.log('\nShutting down...');
    await indexer.stop();
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Start indexer if running directly
import { fileURLToPath } from 'url';
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default EscrowIndexer;