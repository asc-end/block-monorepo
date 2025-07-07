import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { App } from './App';
import { AuthProvider, darkColors } from '@blockit/ui';
import { ThemeProvider } from '@blockit/cross-ui-toolkit';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider value={{ currentColors: darkColors, isDarkMode: true }}>
        <div className='w-full flex-1 flex flex-col' style={{ backgroundColor: darkColors.background, height: '700px' }}>
          <App />
        </div>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
);
