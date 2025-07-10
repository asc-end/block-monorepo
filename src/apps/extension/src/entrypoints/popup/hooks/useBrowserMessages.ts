import { useEffect, useState, useCallback } from 'react';
import { browser } from 'wxt/browser';
import { useAuth } from '@blockit/ui';

interface AuthMessage {
  type: 'AUTH_TOKEN_RECEIVED';
  token: string;
}

interface OpenAuthWindowMessage {
  type: 'OPEN_AUTH_WINDOW';
  extensionWindowId: number;
}

type BrowserMessage = AuthMessage | OpenAuthWindowMessage;

export function useBrowserMessages() {
  const [isListening, setIsListening] = useState(false);
  const { setToken } = useAuth();

  const handleAuthTokenReceived = useCallback(async (token: string) => {
    try {
      await browser.storage.local.set({ authToken: token });
      setToken(token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  }, []);

  useEffect(() => {
    const handleMessage = (message: BrowserMessage) => {
      switch (message.type) {
        case 'AUTH_TOKEN_RECEIVED':
          if (message.token) {
            handleAuthTokenReceived(message.token);
          }
          break;
        default:
          console.warn('Unhandled message type:', message);
      }
    };

    // Add message listener
    browser.runtime.onMessage.addListener(handleMessage);
    setIsListening(true);

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
      setIsListening(false);
    };
  }, [handleAuthTokenReceived]);

  return {
    isListening,
  };
} 