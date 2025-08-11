# Blockit Mobile App

React Native application for iOS and Android that provides native app blocking and usage tracking as part of the Blockit digital wellness platform.

## Overview

The Blockit mobile app offers:
- Native app blocking on Android (iOS limitations apply)
- Real-time app usage tracking
- Focus sessions with automatic app restrictions
- Commitment management with SOL stakes
- Cross-platform sync with web and extension

## Tech Stack

- **Framework**: React Native with Expo SDK 53
- **UI**: React Native + NativeWind (Tailwind for RN)
- **Navigation**: Expo Router
- **State Management**: Zustand (shared from UI package)
- **Native Modules**: Custom Expo module for app blocking
- **Authentication**: Privy

## Development

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- Backend API running on `http://localhost:3001`

### Setup

```bash
# From mobile directory
cd src/apps/mobile

# Install dependencies (if not done at root)
npm install

# Create .env file
cp .env.example .env
# Configure EXPO_PUBLIC_BACKEND_URL and EXPO_PUBLIC_PRIVY_APP_ID
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on specific platform
npm run ios     # iOS Simulator
npm run android # Android Emulator
```

### Building Native Modules

The app includes a custom Expo module for native app blocking:

```bash
# Build the native module
npm run build:module
```

## Architecture

### Project Structure

```
mobile/
├── app/                  # Expo Router screens
├── components/           # Mobile-specific components
├── modules/             # Native module source
│   └── expo-app-blocker/
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
└── assets/              # Images, fonts, etc.
```

### Native Module: expo-app-blocker

The custom Expo module provides:
- **Android**: Full app blocking using AccessibilityService
- **iOS**: Stub implementation (platform limitations)

Key APIs:
```typescript
// Check if blocking is enabled
const isEnabled = await ExpoAppBlocker.isAccessibilityEnabled()

// Block/unblock apps
await ExpoAppBlocker.setBlockedApps(['com.facebook.katana', 'com.instagram.android'])

// Get app usage stats
const usage = await ExpoAppBlocker.getAppUsageStats(Date.now() - 86400000, Date.now())
```

### Screen Navigation

Using Expo Router for file-based routing:
- `app/(tabs)/` - Main tab navigation
- `app/auth/` - Authentication flow
- `app/settings/` - User settings
- `app/focus/` - Focus session management

## Features

### App Blocking (Android)
- Uses AccessibilityService to detect and block apps
- Shows overlay when blocked app is opened
- Customizable block messages
- Respects focus session rules

### Usage Tracking
- Tracks time spent in each app
- Aggregates data by day/week/month
- Syncs with backend for marketplace
- Privacy-first approach

### Focus Sessions
- Start/pause/stop sessions
- Select apps to block
- Real-time sync across devices
- Visual countdown timer

### Commitments
- Create SOL-backed commitments
- Track progress visually
- Automatic forfeit on failure
- Integration with Solana wallet

## Platform Differences

### Android
- Full app blocking support
- Detailed usage statistics
- Background tracking
- Accessibility service required

### iOS
- Limited by platform restrictions
- No native app blocking
- Basic usage tracking only
- Focus on timer and commitment features

## Configuration

### Environment Variables

```bash
EXPO_PUBLIC_BACKEND_URL=http://localhost:3001
EXPO_PUBLIC_PRIVY_APP_ID=your-privy-app-id
```

### App Configuration

Edit `app.json` for:
- App name and slug
- Version numbers
- Bundle identifiers
- Permissions

## Building for Production

### Development Build

```bash
# Create development build
npx expo run:ios     # iOS
npx expo run:android # Android
```

### Production Build

Using EAS Build:
```bash
# Configure EAS
eas build:configure

# Build for stores
eas build --platform ios
eas build --platform android
```

## Troubleshooting

### Module Not Found
- Ensure native module is built: `npm run build:module`
- Clear Metro cache: `npx expo start --clear`
- Rebuild the app

### Android Accessibility
- Guide users to enable accessibility service
- Check permissions in Android settings
- Provide clear onboarding

### iOS Limitations
- Explain platform restrictions to users
- Focus on available features
- Consider alternative approaches

### API Connection
- Update backend URL for device/emulator
- Check network permissions
- Verify CORS settings

## Development Tips

- Use React Native Debugger for state inspection
- Test on real devices for accurate behavior
- Profile performance with Flipper
- Use platform-specific file extensions (`.ios.tsx`, `.android.tsx`)

## Architecture Notes

- Shared business logic from UI package
- Platform detection for conditional features
- Native module handles system integration
- Expo managed workflow with custom modules