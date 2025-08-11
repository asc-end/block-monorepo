# Blockit Browser Extension

Chrome extension for blocking distracting websites and tracking browser usage as part of the Blockit digital wellness platform.

## Overview

The Blockit extension provides:
- Website blocking during focus sessions
- Browser usage tracking
- Quick access to start/stop focus sessions
- Integration with the Blockit ecosystem

## Tech Stack

- **Framework**: [WXT](https://wxt.dev/) - Next-gen Web Extension Framework
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (shared from UI package)
- **Authentication**: Privy

## Development

### Prerequisites

- Node.js 18+
- Chrome or Chromium-based browser
- Backend API running on `http://localhost:3001`

### Setup

```bash
# From extension directory
cd src/apps/extension

# Install dependencies (if not done at root)
npm install

# Create .env file
cp .env.example .env
# Configure VITE_BACKEND_URL and VITE_PRIVY_APP_ID
```

### Running in Development

```bash
npm run dev
```

This will:
1. Build the extension in development mode
2. Open Chrome with the extension loaded
3. Enable hot module replacement for rapid development

### Manual Installation

1. Build the extension:
   ```bash
   npm run build
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (top right)

4. Click "Load unpacked" and select the `.output/chrome-mv3` directory

## Architecture

### Key Components

- **Popup** (`/entrypoints/popup/`): Main UI when clicking extension icon
- **Background** (`/entrypoints/background.ts`): Service worker for persistent logic
- **Content Scripts** (`/entrypoints/content.ts`): Injected into web pages
- **Options** (`/entrypoints/options/`): Extension settings page

### State Management

The extension uses the shared apiStore and authStore from the UI package:
- Authentication state synced via `chrome.storage.local`
- API calls handled through the shared api client
- WebSocket connections managed in background script

### Website Blocking

Blocking is implemented using:
- Chrome's `declarativeNetRequest` API for efficient blocking
- Dynamic rules updated based on active focus sessions
- Fallback content script for additional control

## Features

### Focus Sessions
- Start/pause/stop focus sessions from popup
- Real-time sync with other Blockit apps
- Visual indicator of active session status

### Website Tracking
- Tracks time spent on different domains
- Aggregates data for the marketplace
- Respects user privacy settings

### Quick Actions
- One-click session start
- View current session stats
- Access full dashboard

## Configuration

### Manifest

The extension uses Manifest V3 with the following permissions:
- `storage`: Store user preferences and auth tokens
- `declarativeNetRequest`: Block websites efficiently
- `tabs`: Track active tab for usage statistics
- `alarms`: Schedule periodic tasks

### Environment Variables

```bash
VITE_BACKEND_URL=http://localhost:3001
VITE_PRIVY_APP_ID=your-privy-app-id
```

## Building for Production

```bash
npm run build
```

The production build will be output to `.output/chrome-mv3/` ready for distribution.

## Troubleshooting

### Extension Not Loading
- Ensure you're in developer mode
- Check for errors in `chrome://extensions/`
- Verify the build output exists

### API Connection Issues
- Confirm backend is running on correct port
- Check CORS settings in backend
- Verify auth token is valid

### Hot Reload Not Working
- WXT dev server must be running
- Check browser console for errors
- Try manually reloading the extension

## Architecture Notes

- Uses WXT's auto-imports (no need to import `defineBackground`)
- Shared UI components from monorepo packages
- Type-safe API calls via generated Prisma types
- Platform detection for extension-specific features