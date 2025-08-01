import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './routes'
import { PrivyProvider } from '@privy-io/react-auth'
import { Box, ThemeProvider } from '@blockit/cross-ui-toolkit'
import { darkColors, initializeConfig } from '@blockit/ui'

type EnvVar = {
  key: string;
  displayName: string;
  defaultValue?: string;
}

const requiredEnvVars: EnvVar[] = [
  { key: 'VITE_API_URL', displayName: 'API URL' },
  { key: 'VITE_WS_URL', displayName: 'WebSocket URL' },
  { key: 'VITE_PRIVY_APP_ID', displayName: 'Privy App ID' },
  { key: 'VITE_PRIVY_CLIENT_ID', displayName: 'Privy Client ID' }
];

function validateEnvironment(): void {
  const missingVars = requiredEnvVars.filter(
    v => !import.meta.env[v.key]
  );

  if (missingVars.length > 0) {
    const errorDetails = missingVars.map(v => `• ${v.displayName} (${v.key})`).join('\n');
    const errorMsg = `Missing required environment variables:\n${errorDetails}`;
    
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #1a1a1a;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 2rem;
        ">
          <div style="
            background-color: #2a2a2a;
            border: 1px solid #ff4444;
            border-radius: 8px;
            padding: 2rem;
            max-width: 600px;
            width: 100%;
          ">
            <h1 style="
              color: #ff4444;
              margin-top: 0;
              margin-bottom: 1rem;
              font-size: 1.5rem;
            ">Environment Configuration Error</h1>
            <p style="margin-bottom: 1rem;">The following environment variables are missing:</p>
            <pre style="
              background-color: #1a1a1a;
              padding: 1rem;
              border-radius: 4px;
              margin: 1rem 0;
              font-family: monospace;
              font-size: 0.875rem;
              line-height: 1.5;
            ">${errorDetails}</pre>
            <p style="
              color: #999;
              font-size: 0.875rem;
              margin-bottom: 0;
            ">Please ensure all required environment variables are set in your .env file.</p>
          </div>
        </div>
      `;
    }
    
    console.error(errorMsg);
    throw new Error('Environment validation failed');
  }
}

validateEnvironment();

const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  privyAppId: import.meta.env.VITE_PRIVY_APP_ID,
  privyClientId: import.meta.env.VITE_PRIVY_CLIENT_ID,
  environment: import.meta.env.MODE as 'development' | 'staging' | 'production'
}

initializeConfig(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={config.privyAppId}
      clientId={config.privyClientId}
      config={{
        loginMethods: ["wallet"],
        appearance: {
          showWalletLoginFirst: true,
        },
        captchaEnabled: false,
      }}
    >
      <ThemeProvider value={{ currentColors: darkColors, isDarkMode: true }}>
        <Box className="min-h-screen w-full flex items-center justify-center " style={{ backgroundColor: darkColors.background }}>
          <App />
        </Box>
      </ThemeProvider>
    </PrivyProvider>
  </React.StrictMode>,
)