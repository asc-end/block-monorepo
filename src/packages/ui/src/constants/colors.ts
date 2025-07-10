export const colors = {
  // Primary colors
  primary: {
    50: '#F8F3FF',
    100: '#EDE0FF',
    200: '#DCC2FF',
    300: '#C29CFF', // Main primary color
    400: '#B185FF',
    500: '#9F6EFF',
    600: '#8E57FF',
    700: '#7C40FF',
    800: '#6B29FF',
    900: '#5A12FF',
  },

  secondary: {
    50: '#F0FDFF',
    100: '#E0FAFF',
    200: '#BAF2FF',
    300: '#7EE4F7', // Main secondary color
    400: '#47D4ED',
    500: '#22C3E6',
    600: '#0EA5E9',
    700: '#0284C7',
    800: '#0369A1',
    900: '#0C4A6E',
  },

  // Neutral colors (based on background and card colors)
  neutral: {
    50: '#FAFAFB',
    100: '#F5F6F9',
    200: '#F0F1FC', // Background color
    300: '#E8EAFC',
    400: '#E3EAFC', // Card color 1
    500: '#D6E2FF', // Card color 2
    600: '#C5D3F5',
    700: '#A8B8E8',
    800: '#8A9ADB',
    900: '#6C7BCE',
  },

  // Semantic colors
  success: {
    light: '#E8FDF2',
    main: '#98F6C9',
    dark: '#6EE7A7',
  },
  warning: {
    light: '#FFFBE5',
    main: '#FFE580',
    dark: '#E6CF73',
  },
  error: {
    light: '#FFE5EC',
    main: '#FF6A94',
    dark: '#E5457A',
  },

  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Background and surface colors
  background: '#F0F1FC',
  surface: {
    card: '#E3EAFC',
    elevated: '#D6E2FF',
  },

  // Custom text colors
  text: {
    main: '#312E81',
    soft: '#8471B8',
    verySoft: '#B0B3C1',
  },
} as const;

// Dark theme colors
export const darkColors = {
  // Primary colors (brighter and more vibrant for dark mode)
  primary: {
    50: '#4A2B7A',
    100: '#5A3B8A',
    200: '#6A4B9A',
    300: '#8B5FE6', // Main primary color - much brighter
    400: '#9B6FF6',
    500: '#AB7FFF',
    600: '#BB8FFF',
    700: '#CB9FFF',
    800: '#DBAFFF',
    900: '#EBBFFF',
  },

  secondary: {
    50: '#0F5A8A',
    100: '#1570A6',
    200: '#1B86C2',
    300: '#22A8E6', // Main secondary color - brighter cyan
    400: '#3BB8F0',
    500: '#54C8FA',
    600: '#6DD8FF',
    700: '#86E8FF',
    800: '#9FF8FF',
    900: '#B8FFFF',
  },

  // Neutral colors for dark mode (blue-toned like light mode)
  neutral: {
    50: '#0A0C15',
    100: '#0D111D',
    200: '#111525', // Background color - blue-toned
    300: '#15192D',
    400: '#191D35', // Card color 1 - blue-toned
    500: '#1D213D', // Card color 2 - blue-toned
    600: '#212545',
    700: '#25294D',
    800: '#292D55',
    900: '#2D315D',
  },

  // Semantic colors (brighter and more vibrant)
  success: {
    light: '#2A5540',
    main: '#4AE084',
    dark: '#6AFF9A',
  },
  warning: {
    light: '#5C5A2A',
    main: '#FFD84A',
    dark: '#FFEA6A',
  },
  error: {
    light: '#5C2A3A',
    main: '#FF6A8A',
    dark: '#FF8AAA',
  },

  // Common colors
  white: '#000000',
  black: '#FFFFFF',
  transparent: 'transparent',

  // Background and surface colors (blue-toned like light mode)
  background: '#0A0C15',
  surface: {
    card: '#0D111D',
    elevated: '#111525',
  },

  // Custom text colors (brighter for better readability)
  text: {
    main: '#F0F0F0',
    soft: '#C0C0C0',
    verySoft: '#909090',
  },
} as const;

// Type for the color palette
export type ColorPalette = typeof colors;
export type DarkColorPalette = typeof darkColors;

// Union type that allows both light and dark themes
export type ThemeColors = ColorPalette | DarkColorPalette;

// Helper type for color keys
export type ColorKey = keyof ColorPalette;
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type SemanticColorShade = 'light' | 'main' | 'dark';
export type TextColorShade = 'main' | 'soft';
export type SurfaceShade = 'card' | 'elevated';

// Type for accessing nested color values
export type NestedColorValue = {
  [K in ColorKey]: K extends 'surface' 
    ? { [S in SurfaceShade]: string }
    : K extends 'text'
    ? { [T in TextColorShade]: string }
    : K extends 'success' | 'warning' | 'error'
    ? { [S in SemanticColorShade]: string }
    : { [S in ColorShade]: string }
};