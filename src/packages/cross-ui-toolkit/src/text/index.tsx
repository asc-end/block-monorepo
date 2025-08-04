import { BaseProps } from "../types";

// Text variant types
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';

// Text component props
export interface TextProps extends BaseProps {
  variant?: TextVariant;
}

export const textVariants = {
  // Headings - use currentColors for dynamic theming
  h1: 'text-6xl font-bold leading-tight',
  h2: 'text-2xl font-bold leading-tight',
  h3: 'text-xl font-bold leading-snug',
  h4: 'text-lg font-bold leading-snug',
  h5: 'text-base font-bold leading-normal',
  h6: 'text-sm font-bold leading-normal',
  
  // Body text
  body: 'text-base leading-normal',
  caption: 'text-sm leading-normal',
  label: 'text-sm font-medium leading-normal',
} as const;
