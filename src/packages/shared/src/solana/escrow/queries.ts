import { PublicKey } from "@solana/web3.js";
import { getCommitmentPda } from "./pdas";
import { BN } from "@coral-xyz/anchor";
import { EscrowProgram } from "./types";

export function getCommitment(program: EscrowProgram, user: PublicKey, id: BN) {
    const commitment = getCommitmentPda(program, user, id);
    return program.account.commitment.fetch(commitment);
}

export async function getAllCommitmentsByUser(program: EscrowProgram, user: PublicKey) {
    try {
        // Use a filter to get commitments for a specific user
        const commitments = await program.account.commitment.all([
            {
                memcmp: {
                    offset: 8, // Skip the 8-byte discriminator
                    bytes: user.toBase58(),
                },
            },
        ]);
        return commitments;
    } catch (e) {
        console.log("ERROR getting commitments:", e);
        return [];
    }
}

export async function getNextAvailableId(program: EscrowProgram, user: PublicKey): Promise<BN> {
    try {
        console.log("USERssss", user);
        const commitments = await getAllCommitmentsByUser(program, user);
        console.log("COMMITMENTSssss", commitments);
        if (commitments.length === 0) {
            return new BN(1);
        }
        
        // Get all used IDs and sort them
        const usedIds = commitments.map(c => c.account.id.toNumber()).sort((a, b) => a - b);
        
        // Find the first gap in the sequence
        for (let i = 0; i < usedIds.length; i++) {
            if (usedIds[i] !== i + 1) {
                return new BN(i + 1);
            }
        }
        
        console.log(usedIds);
        // If no gaps, return the next ID after the highest
        return new BN(usedIds.length);
    } catch (error) {
        console.log("Error in getNextAvailableId, falling back to timestamp-based ID:", error);
        // If there's an error (like Buffer issues in React Native), 
        // return a timestamp-based ID to ensure uniqueness
        const timestamp = Date.now();
        return new BN(timestamp % 1000000); // Use last 6 digits of timestamp
    }
}