# Blockit Blockchain Indexer

Service that monitors Solana blockchain events and synchronizes on-chain state with the database.

## Overview

The indexer provides:
- Real-time monitoring of Blockit program events
- Database synchronization for commitments and marketplace
- Merkle tree generation for revenue distribution
- Reconciliation for missed events
- Support for multiple environments (localnet, devnet, mainnet)

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Blockchain**: Solana Web3.js
- **Database**: PostgreSQL via Prisma
- **Scheduling**: Node-cron for periodic tasks
- **RPC**: Helius for mainnet, Surfpool WebSocket for localnet

## Architecture

### Core Components

- **Event Listeners**: Monitor program logs and account changes
- **Event Processors**: Decode and handle specific events
- **Reconciliation Service**: Catch missed events periodically
- **Merkle Service**: Generate proofs for marketplace revenue
- **Schedule Service**: Manage cron jobs

### Event Flow

1. Programs emit events on-chain
2. Indexer detects via log subscription or account monitoring
3. Events decoded and validated
4. Database updated with new state
5. Related services notified if needed

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL database access
- Solana RPC endpoint
- Programs deployed on target network

### Setup

```bash
# From indexer directory
cd src/back/indexer

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Set DATABASE_URL, RPC_URL, etc.

# Generate Prisma client
npx prisma generate
```

### Running the Indexer

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start

# Run tests
npm test
```

## Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Solana RPC
SOLANA_RPC_URL=https://api.devnet.solana.com
HELIUS_API_KEY=your-key-for-mainnet

# Program IDs
ESCROW_PROGRAM_ID=DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ
MARKETPLACE_PROGRAM_ID=5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj

# Environment
ENVIRONMENT=development # or production
```

### Network Configuration

The indexer automatically configures based on environment:

**Localnet**:
- Uses Surfpool WebSocket for real-time updates
- Connects to `ws://localhost:8900`

**Mainnet/Devnet**:
- Uses Helius RPC with enhanced APIs
- Supports geyser plugins for better performance

## Monitored Events

### Escrow Program Events

- **CommitmentCreated**: New commitment staked
- **CommitmentClaimed**: Successful completion
- **CommitmentForfeited**: Failed commitment

### Marketplace Events

- **ListingCreated**: New data listing
- **ListingUpdated**: Price/availability change
- **ListingRemoved**: Delisted data
- **DataPassPurchased**: New buyer
- **RevenueClaimedEvent**: Seller withdrawal

## Database Synchronization

### Commitment Tracking
```typescript
// On CommitmentCreated event
- Create Commitment record
- Link to User and Routine/FocusSession
- Set status to ACTIVE

// On CommitmentClaimed
- Update status to CLAIMED
- Record claim timestamp

// On CommitmentForfeited
- Update status to FORFEITED
- Record forfeit details
```

### Marketplace Tracking
```typescript
// On ListingCreated
- Create MarketplaceListing record
- Set initial price and duration

// On DataPassPurchased
- Create MarketplacePurchase record
- Link buyer to listing
- Update listing statistics
```

## Reconciliation

The indexer runs periodic reconciliation to catch missed events:

```typescript
// Daily reconciliation job
- Fetch all on-chain accounts
- Compare with database state
- Update any discrepancies
- Log reconciliation results
```

## Merkle Tree Generation

For marketplace revenue distribution:

1. Aggregate seller earnings periodically
2. Generate merkle tree of claims
3. Store root on-chain via marketplace program
4. Sellers use proofs to claim revenue

## Error Handling

### Retry Logic
- Automatic retry for RPC failures
- Exponential backoff for rate limits
- Dead letter queue for persistent failures

### Monitoring
- Health check endpoint: `/health`
- Metrics on processed events
- Error logging with context

## Performance Optimization

### Batch Processing
- Group database updates in transactions
- Bulk fetch accounts when possible
- Cache frequently accessed data

### Connection Management
- Connection pooling for RPC
- WebSocket reconnection handling
- Database connection limits

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
# Start local validator
surfpool

# Deploy test programs
anchor deploy

# Run integration tests
npm run test:integration
```

## Deployment

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npx prisma generate
CMD ["npm", "start"]
```

### Health Monitoring
- Check `/health` endpoint
- Monitor event processing lag
- Alert on reconciliation discrepancies

## Troubleshooting

### No Events Detected
- Verify program IDs are correct
- Check RPC connection
- Ensure programs are deployed
- Look for subscription errors

### Database Sync Issues
- Check database permissions
- Verify Prisma schema matches
- Look for transaction conflicts
- Review reconciliation logs

### Performance Issues
- Monitor RPC rate limits
- Check database query performance
- Review batch sizes
- Consider horizontal scaling

## Architecture Notes

- Stateless design for horizontal scaling
- Idempotent event processing
- At-least-once delivery guarantee
- Eventual consistency model