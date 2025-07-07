# Blockit Monorepo

A fullstack monorepo for the Blockit application including web, mobile, and browser extension.

## Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database
- Brave/Chrome browser (for extension)
- iOS/Android simulator or device (for mobile)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
   - Copy `.env.example` files in each app to `.env`
   - Update with your local configuration

## Running Locally

### Backend API

```bash
cd apps/backend
pnpm dev
```

The backend will run on `http://localhost:3001`

### Web App

```bash
cd apps/web
pnpm dev
```

The web app will run on `http://localhost:5173`

### Browser Extension

1. Build the extension:
```bash
cd apps/extension
pnpm zip
```

2. Load in Brave/Chrome:
   - Open `brave://extensions/` or `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `apps/extension/output/chrome-mv3` directory

3. Make sure the web app and backend are running

### Mobile App

1. Start the backend:
```bash
cd apps/backend
pnpm dev
```

2. Start the mobile app:
```bash
cd apps/mobile
pnpm start
```

3. Press `i` for iOS or `a` for Android

## Development Workflow

### Full Stack Development

To run the complete stack locally:

1. **Terminal 1** - Backend:
```bash
cd apps/backend && pnpm dev
```

2. **Terminal 2** - Web app:
```bash
cd apps/web && pnpm dev
```

3. **Terminal 3** - Extension (if needed):
```bash
cd apps/extension && pnpm dev
```

4. **Terminal 4** - Mobile (if needed):
```bash
cd apps/mobile && pnpm start
```

## Project Structure

```
blockit-monorepo/
├── apps/
│   ├── backend/      # Node.js/Express API with Prisma
│   ├── extension/    # Browser extension (WXT framework)
│   ├── mobile/       # React Native/Expo app
│   └── web/          # React web app
├── packages/
│   ├── shared/       # Shared utilities and types
│   ├── ui/          # Shared UI components and stores
│   └── cross-ui-toolkit/ # Cross-platform UI components
└── docs/            # Documentation
```

## Common Commands

### Database

```bash
# Run migrations
cd apps/backend
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm --filter @blockit/backend test
```

### Building

```bash
# Build all packages
pnpm build

# Build specific app
pnpm --filter @blockit/web build
```

## Troubleshooting

### Extension Issues

- Make sure to run `pnpm zip` after making changes
- Check that the extension ID in the web app matches your loaded extension
- Ensure web app and backend are running

### Mobile Issues

- Clear Metro cache: `npx expo start --clear`
- Reset simulators if needed
- Check that backend URL in mobile app matches your local IP

### General Issues

- Clear node_modules: `pnpm clean && pnpm install`
- Check all environment variables are set correctly
- Ensure PostgreSQL is running