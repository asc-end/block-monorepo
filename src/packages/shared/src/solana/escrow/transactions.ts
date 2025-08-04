import { Program } from "@coral-xyz/anchor";
import { EscrowProgram } from "./types";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getCommitmentPda } from "./pdas";
import { getNextAvailableId } from "./queries";
import { timeToUnix, unixToTime } from "..";
import { AUTHORITY_PUBKEY } from "./constants";
import idl from "../../../../../back/programs/target/idl/escrow.json" with { type: "json" };
import BN from "bn.js"

// Lazy initialization to prevent loading in React Native
let program: EscrowProgram | null = null;

function getProgram(): EscrowProgram {
    if (!program) {
        const connection = new Connection("https://api.devnet.solana.com");
        program = new Program(idl, {connection});
    }
    return program;
}
program = getProgram();

export async function claimCommitmentIx(user: PublicKey, id: any) {
    const commitment = getCommitmentPda(program!, user, id);

    return await program!.methods
        .claimCommitment()
        .accountsPartial({
            commitment,
            user,
            program: program!.programId,
        })
        .instruction();
}

export async function claimCommitmentTx(user: PublicKey, id: any) {
    const ix = await claimCommitmentIx(user, id);
    const tx = new Transaction();
    tx.add(ix);
    return tx;
}

export async function createCommitmentTx(user: PublicKey | string, amount: any, unlockTime: any, id?: any, authority?: PublicKey) {
    if(typeof user === 'string') {
        user = new PublicKey(user);
    }
    if(typeof amount === 'number') {
        amount = new BN(amount * 1e9); // Convert SOL to lamports
    }
    if(typeof unlockTime === 'string') {
        unlockTime = unixToTime(new Date(unlockTime));
    }
    if(unlockTime instanceof Date) {
        unlockTime = unixToTime(unlockTime);
    }

    try {
    console.log("USER", user, id, program!.programId);
    id = !!id ? id :  await getNextAvailableId(program!, user as PublicKey);
    authority = !!authority ? authority: AUTHORITY_PUBKEY;
    const commitment = getCommitmentPda(program!, user as PublicKey, id);
    console.log("COMMITMENT", id);
    return await program!.methods
        .createCommitment(id, amount, unlockTime, authority)
        .accountsPartial({
            commitment,
            user: user as PublicKey,
            systemProgram: SystemProgram.programId,
            program: program!.programId,
        })
        .transaction();
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

// Wrapper function that retries with different IDs if needed
export async function createCommitmentWithRetry(
    user: PublicKey | string, 
    amount: any, 
    unlockTime: any, 
    maxRetries: number = 3,
    authority?: PublicKey
) {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            console.log("USER", user, amount, unlockTime, authority);
            console.log("createCommitmentWithRetry", attempt, maxRetries);
            // Generate a new ID for each attempt
            const id = new BN(Date.now() + attempt); // Use timestamp + attempt for subsequent tries
            
            console.log("ID", id);
            console.log(`Attempt ${attempt + 1} with ID:`, id.toString());
            
            const tx = await createCommitmentTx(user, amount, unlockTime, id, authority);
            return { tx, id }; // Return both transaction and the successful ID
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${attempt + 1} failed:`, error);
            
            if (attempt < maxRetries - 1) {
                // Wait a bit before retrying
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }
    
    throw new Error(`Failed to create commitment after ${maxRetries} attempts. Last error: ${lastError}`);
}

export async function forfeitCommitmentTx(user: PublicKey, id: any, authority: PublicKey, treasury: PublicKey) {
    const commitment = getCommitmentPda(program!, user, id);
    
    return await program!.methods
        .forfeitCommitment()
        .accountsPartial({
            commitment,
            authority,
            user,
            treasury,
            program: program!.programId,
        })
        .transaction();
}