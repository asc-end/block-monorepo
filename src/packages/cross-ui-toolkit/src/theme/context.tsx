import { createContext, useContext } from 'react';

// Define the shape of the theme that ui-base expects
// This matches the structure from @blockit/ui but doesn't import it
export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: {
    light: string;
    main: string;
    dark: string;
  };
  warning: {
    light: string;
    main: string;
    dark: string;
  };
  error: {
    light: string;
    main: string;
    dark: string;
  };
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