# Escrow Indexer Tests

This directory contains comprehensive tests for the Escrow Indexer, including tests for Surfpool localnet integration.

## Test Structure

```
tests/
├── e2e/                          # End-to-end tests
│   ├── escrowIndexer.e2e.test.ts      # Standard e2e tests
│   ├── escrowIndexer.surfpool.test.ts # Surfpool-specific tests
│   ├── escrowIndexer.litesvm.test.ts  # LiteSVM tests
│   └── escrowIndexer.devnet.test.ts   # Devnet tests
├── integration/                  # Integration tests
├── unit/                        # Unit tests
└── utils/                       # Test utilities
    ├── surfpoolConnection.ts    # Surfpool connection helper
    ├── testDatabase.ts          # Test database setup
    └── ...
```

## Running Tests

### Prerequisites

1. **Surfpool Localnet**: Ensure Surfpool localnet is running on port 8899
   ```bash
   # Start Surfpool localnet (check Surfpool docs for exact command)
   surfpool localnet
   ```

2. **Database**: Tests use a test database that's automatically created

3. **Environment**: Tests automatically configure the environment for localnet

### Available Test Commands

```bash
# Run all tests
npm test

# Run all e2e tests
npm run test:e2e

# Run Surfpool-specific tests
npm run test:e2e:surfpool

# Run with watch mode
npm run test:watch
```

## Surfpool Test Features

The Surfpool test suite (`escrowIndexer.surfpool.test.ts`) specifically tests:

1. **WebSocket Subscriptions**
   - Program account change subscriptions via `programSubscribe`
   - Log subscriptions via `logsSubscribe`
   - Real-time event processing

2. **Commitment Lifecycle**
   - Real-time indexing of commitment creation
   - Status updates for claims and forfeits
   - Proper database synchronization

3. **Concurrent Operations**
   - Multiple simultaneous commitment creations
   - Stress testing the indexer with parallel transactions

4. **Reconciliation**
   - Recovery from missed events during downtime
   - Historical transaction processing

5. **Error Handling**
   - WebSocket connection stability
   - Graceful handling of network issues

## Key Differences: Surfpool vs Standard Solana

While Surfpool implements standard Solana RPC websocket methods, the tests verify:

1. **Connection**: Uses existing Surfpool localnet instead of spawning a validator
2. **WebSocket Compatibility**: Confirms `onLogs` and `onProgramAccountChange` work correctly
3. **Event Delivery**: Tests real-time event delivery through Surfpool's websocket implementation

## Troubleshooting

1. **Connection Failed**: Ensure Surfpool localnet is running on port 8899
2. **WebSocket Issues**: Check that port 8900 is available for websocket connections
3. **Database Errors**: The test database is automatically cleaned between tests

## Writing New Tests

When adding new tests:

1. Use `SurfpoolConnection` for connecting to existing localnet
2. Always clean up resources in `after()` hooks
3. Use appropriate timeouts for async operations
4. Reset the database in `beforeEach()` for isolation