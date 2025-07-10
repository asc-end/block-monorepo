import { useState, useCallback } from 'react';
import type { AlertButton } from './Alert';

interface AlertOptions {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

export function useAlert() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    title: '',
    message: '',
    buttons: []
  });

  const show = useCallback((alertOptions: AlertOptions) => {
    setOptions(alertOptions);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    options,
    show,
    hide
  };
} 