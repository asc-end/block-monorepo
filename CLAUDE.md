# CLAUDE.md - AI Assistant Context

This document provides comprehensive context for AI assistants working on the Blockit codebase.

## Project Overview

Blockit is a digital wellness application that helps users manage screen time and digital habits through:
- **App Blocking**: Block distracting apps during specific time periods
- **Focus Sessions**: Time-boxed work sessions with app restrictions
- **Commitment System**: Stake SOL on your goals - get it back on success, forfeit on failure
- **Data Marketplace**: Sell anonymized app usage data to researchers

## Architecture Overview

### Monorepo Structure
```
blockit-monorepo/
├── src/
│   ├── apps/           # Frontend applications
│   │   ├── extension/  # Chrome browser extension (WXT)
│   │   ├── mobile/     # React Native app (Expo)
│   │   └── web/        # Web application (Vite)
│   ├── back/           # Backend services
│   │   ├── api/        # Express.js REST API + WebSocket
│   │   ├── indexer/    # Blockchain event indexer
│   │   └── programs/   # Solana smart contracts (Anchor)
│   └── packages/       # Shared packages
│       ├── database/   # Prisma schema and client
│       ├── shared/     # Common types and utilities
│       ├── ui/         # Shared React components
│       ├── cross-ui-toolkit/     # Cross-platform UI components
│       └── expo-app-blocker/     # Native app blocking module
```

### Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Mobile**: React Native, Expo SDK 53, NativeWind
- **Backend**: Node.js, Express, PostgreSQL, Prisma
- **Blockchain**: Solana, Anchor framework
- **Authentication**: Privy
- **Package Manager**: pnpm workspaces
- **Build System**: Turborepo

## Development Commands

### Backend API
```bash
cd src/back/api
npm run dev                    # Start development server (port 3001)
npm run build                  # Build for production
npx prisma migrate dev         # Run database migrations
npx prisma generate            # Generate Prisma client
npx prisma studio              # Open database GUI
```

### Browser Extension
```bash
cd src/apps/extension
npm run dev                    # Start development mode
npm run build                  # Build for production
```

### Mobile App
```bash
cd src/apps/mobile
npm start                      # Start Expo development server
npm run ios                    # Run on iOS simulator
npm run android                # Run on Android emulator
npm run build:module           # Build native modules
```

### Blockchain Programs
```bash
cd src/back/programs
surfpool                       # Start local Solana validator
anchor build                   # Build programs
anchor test                    # Run tests
```

### Indexer Service
```bash
cd src/back/indexer
npm run dev                    # Start indexer in development
npm run test                   # Run tests
```

## Key Implementation Details

### Authentication Flow
1. User authenticates via Privy on any platform
2. JWT token stored in:
   - Browser extension: `chrome.storage.local`
   - Mobile: `AsyncStorage`
   - Web: `localStorage`
3. Backend validates tokens using Privy SDK middleware
4. All API requests require `Authorization: Bearer <token>` header

### API Usage Pattern
Always use the `api` object from apiStore:
```typescript
// CORRECT
import { api } from '../../../stores/apiStore';
const response = await api.get('/apps');

// INCORRECT - Don't use fetch directly
const response = await fetch(`${BACKEND_URL}/apps`, {...});
```

### Database Schema Location
- Schema: `src/packages/database/prisma/schema.prisma`
- Generated client: `src/generated/prisma`
- Custom generation path set in schema

### WebSocket Connection
- URL: `ws://localhost:3001?userId=<userId>`
- Used for real-time updates (focus sessions, tasks)
- Automatic reconnection handled by WebSocketManager

### Cross-Platform Code Sharing
Platform-specific files use naming convention:
- Web/Extension: `Component.tsx`
- React Native: `Component.native.tsx`
- Shared logic: Use platform detection utilities

### Blockchain Programs

#### Escrow Program (DYuG4KZ6S1A19aXzDwFhsCDiEHB99t4WgjF5xgbbxtRZ)
- Creates time-locked SOL commitments
- Authority can forfeit before unlock time
- 10% protocol fee on forfeitures

#### Marketplace Program (5CkSqkGqrHKRzVWVRJGa1odNcaXo4bJnt9Sq2Npqpxpj)
- Lists and sells app usage data
- Merkle tree-based revenue distribution
- Buyers purchase time-limited data access

### Environment Variables
Each app has its own `.env` file:
```bash
# Backend (.env)
DATABASE_URL=postgresql://...
PRIVY_APP_ID=...
PRIVY_APP_SECRET=...
SOLANA_RPC_URL=...

# Frontend apps (.env)
VITE_BACKEND_URL=http://localhost:3001
VITE_PRIVY_APP_ID=...
```

## Common Tasks

### Adding a New API Endpoint
1. Add route in `src/back/api/src/routes/`
2. Add middleware for auth if needed
3. Update OpenAPI documentation
4. Add corresponding API call in `apiStore`

### Creating Cross-Platform Components
1. Create base component in `src/packages/ui/components/`
2. Add `.native.tsx` version if platform-specific
3. Export from package index
4. Import in apps as needed

### Working with App Usage Data
- Mobile sends usage data via `/app-usage` endpoints
- Extension tracks browser usage similarly
- Data aggregated for marketplace sales
- See `/docs/APP_USAGE_TRACKING.md` for details

### Modifying Blockchain Programs
1. Edit program in `src/back/programs/programs/`
2. Run `anchor build` to compile
3. Update IDLs in shared package
4. Restart indexer to pick up changes

## Troubleshooting

### Extension Issues
- Extension uses global `defineBackground` without imports
- Check manifest.json for permissions
- Use Chrome DevTools for debugging

### Mobile App Blocking
- Android: Full implementation via native module
- iOS: Currently stubbed (platform limitations)
- Test on real devices for accurate behavior

### Database Connection
- Ensure Railway database is accessible
- Check VPN/firewall settings
- Verify DATABASE_URL in .env

### WebSocket Disconnections
- Check userId is valid
- Verify backend is running
- Look for CORS issues in browser

## Code Patterns and Conventions

### State Management
- Use Zustand stores for global state
- Keep stores in `src/packages/ui/stores/`
- Separate concerns (auth, api, settings)

### Error Handling
- API returns standardized error format
- Use try-catch in async operations
- Show user-friendly error messages

### TypeScript
- Strict mode enabled
- Avoid `any` types
- Use generated Prisma types

### Component Structure
```typescript
// Standard component pattern
export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks first
  // State declarations
  // Effects
  // Handlers
  // Render
}
```

## Testing Approach
- Unit tests for utilities
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual testing for native features

## Performance Considerations
- Lazy load routes in web apps
- Optimize bundle sizes
- Use React.memo for expensive components
- Batch API requests when possible

## Security Notes
- Never commit sensitive keys
- Validate all user inputs
- Use Privy for auth (no custom implementation)
- Sanitize data before blockchain storage

## Deployment
- Backend: Railway platform
- Frontend: Platform-specific builds
- Programs: Deployed to Solana mainnet
- Database: PostgreSQL on Railway

## Known Limitations
- iOS app blocking not available
- Extension limited to Chrome/Chromium
- Marketplace data aggregation in progress
- Some timezone edge cases

## Useful Resources
- Privy Docs: https://docs.privy.io
- Anchor Book: https://book.anchor-lang.com
- WXT Framework: https://wxt.dev
- Expo Modules: https://docs.expo.dev/modules