import { BaseProps } from "../types";

// Text variant types
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';

// Text component props
export interface TextProps extends BaseProps {
  variant?: TextVariant;
}

export const textVariants = {
  // Headings - use currentColors for dynamic theming
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-lg font-bold',
  h5: 'text-base font-bold',
  h6: 'text-sm font-bold',
  
  // Body text
  body: 'text-base',
  caption: 'text-sm',
  label: 'text-sm font-medium',
} as const;
