import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { App } from './App';
import { AuthProvider, darkColors, initializeConfig } from '@blockit/ui';
import { ThemeProvider } from '@blockit/cross-ui-toolkit';

type EnvVar = {
  key: string;
  displayName: string;
}

const requiredEnvVars: EnvVar[] = [
  { key: 'WXT_PUBLIC_API_URL', displayName: 'Backend URL' },
  { key: 'WXT_PUBLIC_WS_URL', displayName: 'WebSocket URL' },
  { key: 'WXT_PUBLIC_WEB_URL', displayName: 'Web URL for privy authentication' },
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
          min-height: 400px;
          background-color: #1a1a1a;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 1rem;
        ">
          <div style="
            background-color: #2a2a2a;
            border: 1px solid #ff4444;
            border-radius: 8px;
            padding: 1.5rem;
            max-width: 350px;
            width: 100%;
          ">
            <h1 style="
              color: #ff4444;
              margin-top: 0;
              margin-bottom: 0.75rem;
              font-size: 1.25rem;
            ">Environment Configuration Error</h1>
            <p style="margin-bottom: 0.75rem; font-size: 0.875rem;">The following environment variables are missing:</p>
            <pre style="
              background-color: #1a1a1a;
              padding: 0.75rem;
              border-radius: 4px;
              margin: 0.75rem 0;
              font-family: monospace;
              font-size: 0.75rem;
              line-height: 1.4;
            ">${errorDetails}</pre>
            <p style="
              color: #999;
              font-size: 0.75rem;
              margin-bottom: 0;
            ">Please ensure all required environment variables are set.</p>
          </div>
        </div>
      `;
    }
    
    console.error(errorMsg);
    throw new Error('Environment validation failed');
  }
}

validateEnvironment();

// Initialize config store with environment variables
const config = {
  apiUrl: import.meta.env.WXT_PUBLIC_API_URL,
  wsUrl: import.meta.env.WXT_PUBLIC_WS_URL,
  webUrl: import.meta.env.WXT_PUBLIC_WEB_URL,
  environment: import.meta.env.MODE as 'development' | 'staging' | 'production'
};

initializeConfig(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider value={{ currentColors: darkColors, isDarkMode: true }}>
        <div className='w-full flex-1 flex flex-col'>
          <App />
        </div>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
