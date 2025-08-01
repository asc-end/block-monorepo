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
      await prisma.commitment.upsert({
        where: { id: commitment.id.toString() },
        create: {
          id: commitment.id.toString(),
          userId: commitment.user.toString(),
          userPubkey: commitment.user.toString(),
          amount: BigInt(commitment.amount.toString()),
          unlockTime: new Date(commitment.unlockTime.toNumber() * 1000),
          authorityPubkey: commitment.authority.toString(),
          createdAt: new Date(commitment.createdAt.toNumber() * 1000),
          status: 'active',
        },
        update: {
          amount: BigInt(commitment.amount.toString()),
          userPubkey: commitment.user.toString(),
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
      await prisma.commitment.update({
        where: { id: data.commitment.toString() },
        data: { status: "claimed" }
      });
    } catch (error) {
      console.error('Error handling commitment claimed event:', error);
    }
  }

  async function handleCommitmentForfeited(data: any) {
    try {
      await prisma.commitment.update({
        where: { id: data.commitment.toString() },
        data: { 
          status: "forfeited",
          // Optionally store protocol fee and treasury amount
          // protocolFee: BigInt(data.protocolFee.toString()),
          // treasuryAmount: BigInt(data.treasuryAmount.toString())
        }
      });
    } catch (error) {
      console.error('Error handling commitment forfeited event:', error);
    }
  }