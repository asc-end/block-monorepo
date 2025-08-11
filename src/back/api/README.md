# Blockit Backend API

Express.js REST API and WebSocket server that powers the Blockit digital wellness platform.


## Tech Stack

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Privy SDK
- **WebSocket**: ws library
- **Blockchain**: Solana Web3.js
- **Validation**: Zod schemas

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Railway)
- Solana RPC endpoint
- Privy application credentials

### Setup

```bash
# From API directory
cd src/back/api

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables:
# DATABASE_URL=postgresql://user:pass@host:port/db
# PRIVY_APP_ID=your-privy-app-id
# PRIVY_APP_SECRET=your-privy-app-secret
# SOLANA_RPC_URL=https://api.devnet.solana.com
# PORT=3001

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### Running the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```

## API Endpoints

### Authentication
All endpoints except `/users/create` require authentication via Bearer token:
```
Authorization: Bearer <privy-auth-token>
```

### User Management
- `POST /users/create` - Create/update user profile
- `GET /users/verify` - Verify authentication token
- `GET /users/me` - Get current user profile
- `PUT /users/profile` - Update user settings
- `GET /users/stats` - Get user statistics

### App Management
- `GET /apps` - Get all available apps (categorized)
- `POST /apps` - Create new app entry

### Routines
- `POST /routines` - Create new routine
- `GET /routines` - Get all user routines
- `GET /routines/current` - Get active routines only
- `GET /routines/:id` - Get specific routine
- `PUT /routines/:id/status` - Update routine status
- `DELETE /routines/:id` - Delete routine

### Focus Sessions
- `POST /focus-session` - Create focus session
- `GET /focus-session/current` - Get active session
- `PUT /focus-session/:id/status` - Update session status
- `GET /focus-session/history` - Get session history

### App Usage
- `POST /app-usage/sync` - Sync usage data from client
- `GET /app-usage/stats` - Get usage statistics
- `GET /app-usage/daily` - Get daily breakdown

### Commitments
- `POST /commitments` - Create blockchain commitment
- `GET /commitments` - Get user commitments
- `PUT /commitments/:id/claim` - Claim successful commitment
- `PUT /commitments/:id/forfeit` - Forfeit failed commitment

### Marketplace
- `GET /marketplace/stats` - Get marketplace statistics
- `GET /marketplace/sellers/listings` - Get active listings
- `GET /marketplace/sellers/:seller` - Get seller dashboard
- `POST /marketplace/listings` - Create data listing
- `PUT /marketplace/listings/:id` - Update listing
- `DELETE /marketplace/listings/:id` - Remove listing

### Todo Management
- `GET /todo` - Get all todos
- `POST /todo` - Create new todo
- `PUT /todo/:id` - Update todo
- `DELETE /todo/:id` - Delete todo

## WebSocket Connection

Connect to WebSocket server for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:3001?userId=<user-id>')

ws.on('message', (data) => {
  const message = JSON.parse(data)
  // Handle different message types
})
```

Message types:
- `focusSessionUpdate` - Focus session state changes
- `routineUpdate` - Routine status changes
- `taskUpdate` - Todo list updates

## Database Schema

The API uses Prisma with PostgreSQL. Key models include:

- **User** - User profiles and settings
- **Routine** - Recurring app blocking schedules
- **FocusSession** - Time-boxed blocking sessions
- **AppUsage** - App usage statistics
- **Commitment** - Blockchain-backed commitments
- **Marketplace** - Data listings and purchases

See `src/packages/database/prisma/schema.prisma` for full schema.

## Architecture

### Middleware Stack
1. CORS configuration
2. Body parsing (JSON)
3. Request logging
4. Privy authentication
5. Error handling

### Service Layer
- `UserService` - User management logic
- `RoutineService` - Routine lifecycle
- `FocusSessionService` - Session management
- `CommitmentService` - Blockchain integration
- `MarketplaceService` - Data marketplace

### WebSocket Manager
- Maintains user connections
- Broadcasts updates to relevant clients
- Handles connection lifecycle
- Implements heartbeat for connection health

## Error Handling

The API uses consistent error responses:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common error codes:
- `UNAUTHORIZED` - Invalid or missing auth token
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `BLOCKCHAIN_ERROR` - Solana transaction failed

## Development Tips

- Use Prisma Studio for database inspection: `npx prisma studio`
- Enable debug logs: `DEBUG=blockit:* npm run dev`
- Test WebSocket with wscat: `wscat -c ws://localhost:3001?userId=123`
- Use Postman/Insomnia for API testing

## Architecture Notes

- Stateless design for horizontal scaling
- WebSocket connections tracked in memory
- Blockchain operations are asynchronous
- Database transactions for data consistency