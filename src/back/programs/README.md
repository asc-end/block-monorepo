# Simple Escrow Program

A minimal Solana smart contract for time-locked SOL commitments.

## Overview

Users lock SOL for a specified duration. Complete the commitment to get funds back, or forfeit early and lose funds to the protocol.

## Core Functions

### 1. Create Commitment
```rust
create_commitment(amount: u64, unlock_time: i64, authority: Pubkey)
```
- Locks SOL in escrow until unlock_time
- Sets authority who can forfeit the commitment
- Creates commitment PDA
- Transfers SOL immediately

### 2. Claim Commitment  
```rust
claim_commitment()
```
- Only callable after unlock_time
- Returns 100% of locked SOL
- Closes commitment account

### 3. Forfeit Commitment
```rust
forfeit_commitment()
```
- Only callable by the commitment's authority
- Only callable before unlock_time
- 10% goes to protocol treasury
- 90% goes to main treasury
- Closes commitment account

## Account Structure

```rust
Commitment {
    user: Pubkey,
    amount: u64,
    unlock_time: i64,
    authority: Pubkey,
    created_at: i64,
    bump: u8,
}
```

## Usage Example

```typescript
// Create 1 SOL commitment for 30 days with backend as authority
const unlockTime = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);
await program.methods
  .createCommitment(
    new BN(1_000_000_000), // 1 SOL
    new BN(unlockTime),
    backendPubkey // Authority who can forfeit
  )
  .accounts({
    commitment: commitmentPDA,
    user: wallet.publicKey,
  })
  .rpc();

// User can claim after duration
await program.methods.claimCommitment().accounts({...}).rpc();

// Backend can forfeit if user breaks commitment
await program.methods.forfeitCommitment()
  .accounts({
    commitment: commitmentPDA,
    authority: backendPubkey,
    user: userPubkey,
    treasury: treasuryPubkey,
    protocolTreasury: protocolTreasuryPubkey,
  })
  .signers([backendKeypair])
  .rpc();
```

## Key Features

- **Minimal complexity** - Only 3 functions
- **Time-locked** - Cannot claim early
- **Secure** - PDA-based account derivation
- **Fair** - Clear fee structure (10% protocol, 90% treasury)
- **Gas efficient** - Minimal account storage