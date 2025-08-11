# Blockit - Digital Wellness Platform

Blockit helps users reclaim their digital lives through intelligent app blocking, focus sessions, and blockchain-backed commitments. Turn your screen time goals into reality.

## 🌟 Features

- **Smart App Blocking**: Block distracting apps during specific times or after daily limits
- **Focus Sessions**: Time-boxed work sessions with automatic app restrictions
- **Commitment Stakes**: Put SOL on the line - succeed and get it back, fail and forfeit
- **Data Marketplace**: Monetize your anonymized app usage data
- **Cross-Platform**: Works seamlessly across mobile, web, and browser extension

## 🏗 Architecture

Blockit is a monorepo containing multiple applications and services:

```
├── src/apps/
│   ├── extension/        # WXT browser extension
│   ├── mobile/           # Expo mobile app
│   └── web/              # Web application
├── src/back/
│   ├── api/              # Express.js REST API + WebSocket
│   ├── indexer/          # Blockchain event indexer
│   └── programs/         # Solana smart contracts (Anchor + Surfpool)
└── src/packages/
    ├── database/         # Prisma schema and client
    ├── shared/           # Common types and utilities
    ├── ui/               # Shared React components and stores
    ├── cross-ui-toolkit/ # Platform-agnostic components
    └── expo-app-blocker/ # Native app blocking module
```

### Backend Services
- **[API](./src/back/api/README.md)**
- **[Indexer](./src/back/indexer/README.md)**
- **[Programs](./src/back/programs/README.md)**

### Frontend Applications
- **[Extension](./src/apps/extension/README.md)**
- **[Mobile](./src/apps/mobile/README.md)**
- **[Web](./src/apps/web/README.md)**

### Shared Packages
- **[UI](./src/packages/ui/README.md)**: Business logic, components, and state management
- **Database**
- **Cross-UI Toolkit**
- **Expo App Blocker**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8.5+
- PostgreSQL (or use Railway cloud database)
- Solana CLI tools (for blockchain development)

### Installation

```bash
# Clone the repository
git clone https://github.com/blockit/blockit-monorepo.git
cd blockit-monorepo

# Install dependencies
pnpm install
```

## 🔧 Development

### Environment Setup

Each application requires its own `.env` file:

```bash
# Backend API
DATABASE_URL=postgresql://...
PRIVY_APP_ID=...
PRIVY_APP_SECRET=...
SOLANA_RPC_URL=...

# Frontend Apps
VITE_BACKEND_URL=http://localhost:3001
VITE_PRIVY_APP_ID=...
```

### Database

```bash
# Run migrations
cd src/back/api
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

### Blockchain Development

```bash
# Start local validator
cd src/back/programs
surfpool

# Build programs
anchor build

# Run tests
anchor test
```

## 🏛 Architecture Decisions

Blockit uses a monorepo architecture to:
- Share code efficiently across platforms
- Maintain consistent types and business logic
- Simplify dependency management
- Enable atomic commits across services

Key technologies:
- **pnpm workspaces** for monorepo management
- **Turborepo** for build orchestration
- **Privy** for unified authentication
- **Solana** for decentralized commitments

## 🤝 License

This project is proprietary and confidential. See [LICENSE](LICENSE) for details.