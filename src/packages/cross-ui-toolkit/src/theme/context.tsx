import { createContext, useContext } from 'react';

// Helper type for color keys
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type SemanticColorShade = 'light' | 'main' | 'dark';
export type TextColorShade = 'main' | 'soft' | 'verySoft';
export type SurfaceShade = 'card' | 'elevated';

// Type for accessing nested color values
export type ThemeColors = {
  primary: { [K in ColorShade]: string };
  pop: { 
    "yellow": string;
    "magenta": string;
    "purple": string;
    "violet": string;
    "indigo": string;
    "red": string;
  };
  surface: { [S in SurfaceShade]: string };
  text: { [T in TextColorShade]: string };
  success: { [S in SemanticColorShade]: string };
  warning: { [S in SemanticColorShade]: string };
  error: { [S in SemanticColorShade]: string };
  background: string;
  transparent: string;
  white: string;
  black: string;
  [key: string]: any; // fallback for other keys if needed
};


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