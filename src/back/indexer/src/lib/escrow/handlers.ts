import { BN, IdlAccounts, EventParser, Program } from "@coral-xyz/anchor";
import { KeyedAccountInfo, Logs, PublicKey, Connection } from "@solana/web3.js";
import { Escrow } from "../../../../programs/target/types/escrow";
import { prisma } from "../prisma";

// Anchor event discriminators
const COMMITMENT_CREATED_DISCRIMINATOR = "commitmentCreatedEvent";
const COMMITMENT_CLAIMED_DISCRIMINATOR = "commitmentClaimedEvent";
const COMMITMENT_FORFEITED_DISCRIMINATOR = "commitmentForfeitedEvent";

export function createHandlers(program: Program<Escrow>, connection: Connection) {
  return {
    async handleLogs(logs: Logs) {
      try {
        // Parse Anchor events from logs
        const eventParser = new EventParser(program.programId, program.coder);
        const events = eventParser.parseLogs(logs.logs);
        
        for (const event of events) {
          await processEvent(event);
        }
      } catch (error) {
        console.error(`Error processing logs for ${logs.signature}:`, error);
      }
    },

    async handleAccountChange(account: KeyedAccountInfo) {
      try {
        const commitment = program.account.commitment.coder.accounts.decode('commitment', account.accountInfo.data);
        await indexCommitmentAccount(commitment);
      } catch (error) {
        console.error('Error decoding account:', error);
      }
    },

    processEvent
  };
}

// Helper function to index commitment accounts
export async function indexCommitmentAccount(commitment: IdlAccounts<Escrow>["commitment"]) {
    try {
      const userPubkey = commitment.user.toString();
      
      // Find the user by wallet address
      const user = await prisma.user.findUnique({
        where: { walletAddress: userPubkey }
      });

      if (!user) {
        console.error(`User not found for wallet address: ${userPubkey}`);
        return;
      }

      // Create or update the commitment with the correct userId
      await prisma.commitment.upsert({
        where: { id: commitment.id.toString() },
        create: {
          id: commitment.id.toString(),
          userId: user.id,
          userPubkey: userPubkey,
          amount: BigInt(commitment.amount.toString()),
          unlockTime: new Date(commitment.unlockTime.toNumber() * 1000),
          authorityPubkey: commitment.authority.toString(),
          createdAt: new Date(commitment.createdAt.toNumber() * 1000),
          status: 'active',
        },
        update: {
          amount: BigInt(commitment.amount.toString()),
          userPubkey: userPubkey,
          unlockTime: new Date(commitment.unlockTime.toNumber() * 1000),
          authorityPubkey: commitment.authority.toString(),
          createdAt: new Date(commitment.createdAt.toNumber() * 1000),
          status: 'active',
        }
      });
    } catch (error) {
      console.error('Error storing commitment:', error);
    }
  }
  
  // Helper function to process Anchor events
  export async function processEvent(event: any) {
    try {
      switch (event.name) {
        case COMMITMENT_CREATED_DISCRIMINATOR:
          await handleCommitmentCreated(event.data);
          break;
        case COMMITMENT_CLAIMED_DISCRIMINATOR:
          await handleCommitmentClaimed(event.data);
          break;
        case COMMITMENT_FORFEITED_DISCRIMINATOR:
          await handleCommitmentForfeited(event.data);
          break;
        default:
          console.log('Unknown event:', event.name);
      }
    } catch (error) {
      console.error('Error processing event:', error);
    }
  }

  async function handleCommitmentCreated(data: IdlAccounts<Escrow>["commitment"]) {
    try {
      await indexCommitmentAccount({
        user: data.user,
        id: data.id,
        amount: data.amount,
        unlockTime: data.unlockTime,
        authority: data.authority,
        createdAt: data.createdAt,
        bump: 0
      });
    } catch (error) {
      console.error('Error handling commitment created event:', error);
    }
  }

  async function handleCommitmentClaimed(data: any) {
    try {
      const commitmentId = data.commitment.toString();
      
      // Check if commitment exists
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentId }
      });

      if (!commitment) {
        console.warn(`Commitment not found for claim: ${commitmentId}`);
        return;
      }

      await prisma.commitment.update({
        where: { id: commitmentId },
        data: { 
          status: "claimed",
          claimedAt: new Date()
        }
      });
    } catch (error) {
      console.error('Error handling commitment claimed event:', error);
    }
  }

  async function handleCommitmentForfeited(data: any) {
    try {
      const commitmentId = data.commitment.toString();
      
      // Check if commitment exists
      const commitment = await prisma.commitment.findUnique({
        where: { id: commitmentId }
      });

      if (!commitment) {
        console.warn(`Commitment not found for forfeit: ${commitmentId}`);
        return;
      }

      await prisma.commitment.update({
        where: { id: commitmentId },
        data: { 
          status: "forfeited",
          forfeitedAt: new Date(),
          // Optionally store protocol fee and treasury amount
          // protocolFee: BigInt(data.protocolFee.toString()),
          // treasuryAmount: BigInt(data.treasuryAmount.toString())
        }
      });
    } catch (error) {
      console.error('Error handling commitment forfeited event:', error);
    }
  }