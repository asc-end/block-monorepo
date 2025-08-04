import React, { useEffect } from 'react';
import { useAlertContext, setGlobalAlert } from './AlertProvider';

/**
 * Component that connects the AlertProvider context to the global imperative API
 * This should be rendered once at the root of your app inside AlertProvider
 */
export function AlertManager() {
  const { showAlert } = useAlertContext();
  
  useEffect(() => {
    // Connect the context's showAlert to the global imperative API
    setGlobalAlert(showAlert);
    
    // Cleanup on unmount
    return () => {
      setGlobalAlert(null as any);
    };
  }, [showAlert]);
  
  return null;
}