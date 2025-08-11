# Blockit Blockchain Programs

Solana smart contracts powering the commitment and marketplace features of the Blockit platform.

## Overview

Blockit uses two main on-chain programs:
- **Escrow Program**: Manages time-locked SOL commitments for accountability
- **Data Marketplace**: Enables users to monetize their app usage data

## Tech Stack

- **Framework**: Anchor (Solana framework)
- **Language**: Rust
- **Testing**: Anchor test suite with TypeScript
- **Development**: Surfpool for local validator

## Programs

### Escrow Program
**Program ID**: `DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ`

Handles commitment lifecycle:
- Users lock SOL for a specified duration
- Authority (Blockit backend) can forfeit if user fails
- Users can claim back SOL after successful completion
- 10% protocol fee on forfeitures

### Data Marketplace Program
**Program ID**: `5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj`

Manages data marketplace:
- Sellers list anonymized app usage data
- Buyers purchase time-limited access
- Revenue distributed via merkle proofs
- Decentralized data ownership

## Development

### Prerequisites

- Rust and Cargo
- Solana CLI tools
- Anchor CLI (`npm i -g @coral-xyz/anchor-cli`)
- Node.js for testing

### Setup

```bash
# From programs directory
cd src/back/programs

# Install dependencies
npm install

# Verify Anchor installation
anchor --version

# Start local validator with Surfpool
surfpool
```

### Building Programs

```bash
# Build all programs
anchor build

# Build specific program
anchor build --program-name escrow
anchor build --program-name marketplace
```

### Running Tests

```bash
# Run all tests
anchor test

# Run tests on local validator
anchor test --skip-local-validator

# Run specific test file
anchor test tests/escrow.ts
```

### Init Marketplace
```bash
surfpool run runbooks/initialize-marketplace.tx --input '{"rpc_api_url": "https://api.devnet.solana.com", "network_id": "devnet"}'
```

## Program Architecture

### Escrow Program

#### Accounts
- `Commitment` - Stores locked funds and metadata
- `ProtocolState` - Global protocol configuration

#### Instructions
- `create_commitment` - Lock SOL with time duration
- `claim_commitment` - Reclaim SOL after unlock time
- `forfeit_commitment` - Authority forfeits failed commitment
- `initialize_protocol` - One-time setup

#### Key Features
- Time-based unlocking
- Authority-based forfeit mechanism
- Protocol fee collection
- Treasury management

### Marketplace Program

#### Accounts
- `Marketplace` - Global marketplace state
- `Listing` - Individual data listing
- `DataPass` - Buyer's access pass
- `SellerAccount` - Seller revenue tracking

#### Instructions
- `initialize_marketplace` - One-time setup
- `create_listing` - List data for sale
- `update_listing` - Modify price/availability
- `remove_listing` - Delist data
- `purchase_data_pass` - Buy data access
- `claim_revenue` - Withdraw earnings
- `update_merkle_root` - Update revenue distribution

#### Key Features
- Time-limited data access
- Flexible pricing models
- Merkle tree revenue distribution
- Decentralized data control

## IDL Management

Program IDLs are automatically generated during build:
- `target/idl/escrow.json`
- `target/idl/marketplace.json`

Copy IDLs to shared package after updates:
```bash
cp target/idl/*.json ../../packages/shared/src/idl/
```

## Deployment

### Local Development
```bash
surfpool start
```

### Devnet Deployment
```bash
surfpool run deployment --env devnet
```

### Mainnet Deployment
```bash
surfpool run deployment --env mainnet
```

## Security Considerations

### Escrow Program
- Only designated authority can forfeit
- Time checks prevent early claims
- Funds isolated per commitment
- Protocol fees capped at 10%

### Marketplace Program
- Sellers control their listings
- Buyers get guaranteed access duration
- Revenue claims require merkle proofs
- Admin functions limited to merkle updates

## Integration

### TypeScript SDK
```typescript
import { Program, AnchorProvider } from "@coral-xyz/anchor"
import { Escrow, Marketplace } from "@blockit/shared"

// Initialize provider
const provider = new AnchorProvider(...)

// Load programs
const escrowProgram = new Program(Escrow.IDL, Escrow.PROGRAM_ID, provider)
const marketplaceProgram = new Program(Marketplace.IDL, Marketplace.PROGRAM_ID, provider)
```

### Transaction Builders
The shared package provides transaction builders:
```typescript
import { createCommitmentTx, claimCommitmentTx } from "@blockit/shared"

const tx = await createCommitmentTx(program, amount, duration, authority)
```

## Architecture Notes

- Programs are stateless and deterministic
- Events emitted for indexer consumption
- Designed for upgradeability