const globalColors = {
  primary: {
    '50': '#eef8ff',
    '100': '#d9efff',
    '200': '#bce4ff',
    '300': '#8ed5ff',
    '400': '#59bbff',
    '500': '#3aa0ff',
    '600': '#1b7df5',
    '700': '#1466e1',
    '800': '#1752b6',
    '900': '#19478f',
    '950': '#142c57',
  },
  secondary: {
    '50': '#f4f0ff',
    '100': '#ebe4ff',
    '200': '#d9cdff',
    '300': '#bfa6ff',
    '400': '#a173ff',
    '500': '#873bff',
    '600': '#7c14ff',
    '700': '#6a00f4',
    '800': '#5d01d6',
    '900': '#4e03af',
    '950': '#2e0077',
  },
  pop: {
    "yellow": "#FFB600",
    "magenta": "#E500A4",
    "purple": "#A500F2",
    "violet": "#6A00F4",
    "indigo": "#2D00F7",
    "red": "#F20061",
  },
} as const;

export const colors = {
  // Primary colors - Vibrant purple gradient

  ...globalColors,
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

  // Semantic colors - Bright and vibrant
  success: {
    light: '#E0FFF8',
    main: '#00E5CA',
    dark: '#00B8A3',
  },
  warning: {
    light: '#FFF5E0',
    main: '#FFB600', // Bright yellow
    dark: '#FF9500',
  },
  error: {
    light: '#FFE0E7',
    main: '#F20061', // Bright pink
    dark: '#CC0052',
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
  // Primary colors - Vibrant purple gradient for dark mode
  ...globalColors,

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

  // Semantic colors - Bright and vibrant for dark mode
  success: {
    light: '#00B8A3',
    main: '#00E5CA',
    dark: '#33FFE5',
  },
  warning: {
    light: '#FF9500',
    main: '#FFB600', // Bright yellow
    dark: '#FFCC33',
  },
  error: {
    light: '#CC0052',
    main: '#F20061', // Bright pink
    dark: '#FF3377',
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
// export type ThemeColors = ColorPalette | DarkColorPalette;

// Helper type for color keys
export type ColorKey = keyof ColorPalette;
export type ColorShade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type SemanticColorShade = 'light' | 'main' | 'dark';
export type TextColorShade = 'main' | 'soft' | 'verySoft';
export type SurfaceShade = 'card' | 'elevated';

// Type for accessing nested color values
export type ThemeColors = {
  primary: { [K in ColorShade]: string };
  secondary: { [K in ColorShade]: string };
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
