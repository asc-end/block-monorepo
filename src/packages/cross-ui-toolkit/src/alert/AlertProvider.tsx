import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert } from './Alert';
import type { AlertButton } from './Alert';

interface AlertOptions {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    title: '',
    message: '',
    buttons: []
  });

  const showAlert = useCallback((alertOptions: AlertOptions) => {
    setOptions(alertOptions);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        visible={visible}
        title={options.title}
        message={options.message}
        buttons={options.buttons}
        onDismiss={hideAlert}
      />
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within AlertProvider');
  }
  return context;
}

// Global reference to show alerts imperatively
let globalShowAlert: ((options: AlertOptions) => void) | null = null;

export function setGlobalAlert(showAlert: (options: AlertOptions) => void) {
  globalShowAlert = showAlert;
}

// Imperative API that mimics React Native's Alert.alert()
export const AlertUI = {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: { cancelable?: boolean }
  ) => {
    if (!globalShowAlert) {
      console.warn('AlertProvider not mounted. Falling back to native alert.');
      // Fallback to native alert if provider not mounted
      if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${title}\n${message || ''}`);
      }
      return;
    }
    
    globalShowAlert({
      title,
      message: message || '',
      buttons: buttons || [{ text: 'OK', style: 'default' }]
    });
  }
};