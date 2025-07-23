import { Connection, PublicKey, Keypair, Logs, AccountInfo, KeyedAccountInfo } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet, IdlAccounts, BN, Idl } from '@coral-xyz/anchor';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import escrowIdl from '../../../../target/idl/escrow.json';
import { Escrow } from '../../../../target/types/escrow';

dotenv.config();


const RECONCILIATION_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

const prisma = new PrismaClient();

// Helper function to index commitment accounts
async function indexCommitmentAccount(commitment: IdlAccounts<Escrow>["commitment"], accountId: PublicKey) {
  try {
    await prisma.commitment.upsert({
      where: { id: accountId.toString() },
      create: {
        id: accountId.toString(),
        userId: commitment.user.toString(),
        amount: BigInt(commitment.amount.toString()),
        unlockTime: new Date(commitment.unlockTime.toNumber() * 1000),
        authorityPubkey: commitment.authority.toString(),
        userPubkey: commitment.user.toString(),
        createdAt: new Date(commitment.createdAt.toNumber() * 1000),
        status: 'active',
      },
      update: {}
    });
  } catch (error) {
    console.error('Error storing commitment:', error);
  }
}

// Helper function to process claim/forfeit events
async function processLogs(logs: string[]) {
  if (!logs) return;

  for (const log of logs) {
    try {
      if (log.includes(COMMITMENT_CREATED_LOG_MESSAGE)) {
        const match = log.match(/account=(\w+), user=(\w+), amount=(\d+), unlock_time=(\d+), authority=(\w+), created_at=(\d+)/);
        if (!match) continue;

        const [_, account, user, amount, unlockTime, authority, createdAt] = match;
        if (!account || !user || !amount || !unlockTime || !authority || !createdAt) continue;

        await indexCommitmentAccount({
          user: new PublicKey(user),
          amount: new BN(amount),
          unlockTime: new BN(unlockTime),
          authority: new PublicKey(authority),
          createdAt: new BN(createdAt),
          bump: 0
        }, new PublicKey(account));
      }
      else if (log.includes(COMMITMENT_CLAIMED_LOG_MESSAGE) || log.includes(COMMITMENT_FORFEITED_LOG_MESSAGE)) {
        const match = log.match(/account=(\w+), user=(\w+)/);
        if (!match) continue;

        const [_, account, user] = match;
        if (!account || !user) continue;

        // Update the specific commitment account
        await prisma.commitment.update({
          where: { id: account },
          data: { status: log.includes(COMMITMENT_CLAIMED_LOG_MESSAGE) ? "claimed" : "forfeited" }
        });
      }
    } catch (error) {
      console.error('Error processing log:', error);
    }
  }
}

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

class EscrowIndexer {
  private connection: Connection;
  private program: Program<Escrow>;
  private subscriptionId: number | null = null;
  private logsSubscriptionId: number | null = null;

  constructor() {
    this.connection = new Connection(RPC_URL, {
      commitment: 'confirmed',
      wsEndpoint: `wss://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
    });

    const wallet = new Wallet(Keypair.generate());
    const provider = new AnchorProvider(this.connection, wallet, { commitment: 'confirmed' });
    this.program = new Program(escrowIdl as Idl, provider) as Program<Escrow>;
  }

  private async handleLogs(logs: Logs) {
    try {
      //check if the logs are for a commitment creation or claim/forfeit to prevent fetching the tx for nothing
      const isClaimOrForfeit = logs.logs.some(log => log.includes(COMMITMENT_CLAIMED_LOG_MESSAGE) || log.includes(COMMITMENT_FORFEITED_LOG_MESSAGE));
      if (!isClaimOrForfeit) return;

      const tx = await this.connection.getTransaction(logs.signature, { maxSupportedTransactionVersion: 0 });
      const txLogs = tx?.meta?.logMessages;
      if (!txLogs) return;

      await processLogs(txLogs);
    } catch (error) {
      console.error(`Error processing logs for ${logs.signature}:`, error);
    }
  }

  private async handleAccountChange(account: KeyedAccountInfo) {
    try {
      const commitment = this.program.account.commitment.coder.accounts.decode('commitment', account.accountInfo.data);
      await indexCommitmentAccount(commitment, account.accountId);
    } catch (error) {
      console.error('Error decoding account:', error);
    }
  }

  async start() {
    this.subscriptionId = this.connection.onProgramAccountChange(
      this.program.programId,
      this.handleAccountChange,
      { commitment: 'confirmed' }
    );

    this.logsSubscriptionId = this.connection.onLogs(
      this.program.programId,
      this.handleLogs,
      'confirmed'
    );
  }

  async stop() {
    if (this.subscriptionId !== null) {
      await this.connection.removeProgramAccountChangeListener(this.subscriptionId);
    }
    if (this.logsSubscriptionId !== null) {
      await this.connection.removeOnLogsListener(this.logsSubscriptionId);
    }
  }

  // Daily reconciliation to check for missed events
  async reconcileCommitments() {
    try {
      const signatures = await this.connection.getSignaturesForAddress(this.program.programId, { limit: 1000 });

      for (const sigInfo of signatures) {
        try {
          const tx = await this.connection.getTransaction(sigInfo.signature, { maxSupportedTransactionVersion: 0 });

          const logs = tx?.meta?.logMessages
          if (!logs) continue;

          await processLogs(logs);
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
if (require.main === module) {
  main().catch(console.error);
}

export default EscrowIndexer;