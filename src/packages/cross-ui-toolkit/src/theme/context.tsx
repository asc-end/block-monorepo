import { createContext, useContext } from 'react';

// Define the shape of the theme that ui-base expects
// This matches the structure from @blockit/ui but doesn't import it
export interface ThemeColors {
  primary: Record<string, string>;
  secondary: Record<string, string>;
  success: Record<string, string>;
  warning: Record<string, string>;
  error: Record<string, string>;
  neutral: Record<string, string>;
  text: {
    main: string;
    soft: string;
    [key: string]: string;
  };
  background: string;
  surface: {
    card: string;
    [key: string]: string;
  };
  white: string,
  black: string,
}

export interface ThemeContext {
  currentColors: ThemeColors;
  isDarkMode?: boolean;
}

// Create context without default implementation
const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};