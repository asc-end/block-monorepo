# Blockit UI Package

Shared React components, business logic, and state management for all Blockit frontend applications.

## Overview

The UI package provides:
- Reusable React components
- Cross-platform business logic
- Zustand stores for state management
- Platform-specific implementations
- Shared hooks and utilities

## Architecture

### Directory Structure

```
ui/
├── components/          # Shared React components
├── stores/             # Zustand state management
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
├── types/              # TypeScript definitions
└── index.ts            # Package exports
```

### Platform-Specific Code

Components can have platform-specific implementations:
- `Component.tsx` - Web/Extension implementation
- `Component.native.tsx` - React Native implementation

The build system automatically selects the correct file based on the platform.

## Usage

### Installation

The UI package is linked via pnpm workspaces:

```json
{
  "dependencies": {
    "@blockit/ui": "workspace:*"
  }
}
```

### Importing Components

```typescript
import { 
  FocusSessionCard, 
  AppSelector, 
  useAuth,
  authStore 
} from '@blockit/ui'

function MyComponent() {
  const { user, isAuthenticated } = useAuth()
  
  return (
    <FocusSessionCard 
      session={currentSession}
      onStop={handleStop}
    />
  )
}
```

## Component Guidelines

### Creating New Components

1. **Cross-Platform First**: Design for all platforms
2. **Platform-Specific**: Use `.native.tsx` if needed, but prefere using platform specific components from the cross-ui-toolkit
3. **Typed Props**: Always define TypeScript interfaces
4. **Accessibility**: Include ARIA labels and roles
5. **Theming**: Use theme variables for colors

### Styling

Use tailwind css styling + current color theme 

## Key Components

### Authentication
- `AuthProvider` - Privy authentication wrapper
- `LoginButton` - Cross-platform login UI
- `useAuth` - Authentication hook

### Focus Sessions
- `FocusSessionCard` - Display session info
- `FocusSessionTimer` - Countdown timer
- `StartSessionModal` - Session configuration

### App Management
- `AppSelector` - Multi-select app picker
- `AppUsageChart` - Usage visualization
- `BlockedAppsList` - Currently blocked apps

### Commitments
- `CommitmentCard` - Display commitment status
- `CreateCommitmentForm` - Stake SOL on goals
- `CommitmentProgress` - Visual progress tracker

### Marketplace
- `ListingCard` - Data listing display
- `PurchaseModal` - Buy data access
- `SellerDashboard` - Revenue analytics

## State Management

### Stores

#### authStore
```typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}
```

#### apiStore
```typescript
interface ApiStore {
  api: {
    get: <T>(path: string) => Promise<T>
    post: <T>(path: string, data?: any) => Promise<T>
    put: <T>(path: string, data?: any) => Promise<T>
    delete: (path: string) => Promise<void>
  }
}
```

#### focusSessionStore
```typescript
interface FocusSessionStore {
  currentSession: FocusSession | null
  startSession: (duration: number, blockedApps: string[]) => Promise<void>
  pauseSession: () => Promise<void>
  stopSession: () => Promise<void>
}
```

#### settingsStore
```typescript
interface SettingsStore {
  theme: 'light' | 'dark' | 'system'
  timezone: string
  notifications: boolean
  updateSettings: (settings: Partial<Settings>) => void
}
```

## Architecture Notes

- Designed for maximum code reuse
- Platform differences abstracted
- Business logic separated from UI
- Type-safe throughout