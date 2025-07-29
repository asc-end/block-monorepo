import { BaseProps } from "../types";

// Gradient types
export type GradientType = 'linear' | 'radial';
export type GradientDirection = 'to-right' | 'to-left' | 'to-top' | 'to-bottom' | 'to-top-right' | 'to-top-left' | 'to-bottom-right' | 'to-bottom-left';

// Color stop for gradients
export interface ColorStop {
  color: string;
  offset?: number; // 0 to 1
}

// Gradient component props
export interface GradientProps extends BaseProps {
  type?: GradientType;
  direction?: GradientDirection;
  colors?: string[] | ColorStop[];
  angle?: number; // For custom angle (overrides direction)
  startPoint?: { x: number; y: number }; // For React Native
  endPoint?: { x: number; y: number }; // For React Native
  locations?: number[]; // For React Native (same as offsets)
  borderRadius?: number | string;
  children?: React.ReactNode;
}

// Helper to convert direction to angle
export const directionToAngle: Record<GradientDirection, number> = {
  'to-right': 90,
  'to-left': 270,
  'to-top': 0,
  'to-bottom': 180,
  'to-top-right': 45,
  'to-top-left': 315,
  'to-bottom-right': 135,
  'to-bottom-left': 225,
};

// Helper to convert direction to React Native start/end points
export const directionToPoints: Record<GradientDirection, { start: { x: number; y: number }; end: { x: number; y: number } }> = {
  'to-right': { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  'to-left': { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } },
  'to-top': { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } },
  'to-bottom': { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  'to-top-right': { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
  'to-top-left': { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
  'to-bottom-right': { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  'to-bottom-left': { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};

// Helper to normalize colors
export const normalizeColors = (colors: string[] | ColorStop[]): { colors: string[]; offsets?: number[] } => {
  if (!colors || colors.length === 0) {
    return { colors: ['#000000', '#FFFFFF'] };
  }

  if (typeof colors[0] === 'string') {
    return { colors: colors as string[] };
  }

  const colorStops = colors as ColorStop[];
  return {
    colors: colorStops.map(stop => stop.color),
    offsets: colorStops.map(stop => stop.offset ?? 0),
  };
};