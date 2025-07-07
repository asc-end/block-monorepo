import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './routes'
import { PrivyProvider } from '@privy-io/react-auth'
import { Box, ThemeProvider } from '@blockit/cross-ui-toolkit'
import { darkColors } from '@blockit/ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivyProvider
      appId='cm1iz25fc00l51dg0jxrtd9sz'
      clientId='client-WY5bqDh4x6Vb9rATJs8qc3MofR9LA2x1QWMcobmsJjYKT'
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