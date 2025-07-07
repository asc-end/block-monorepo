import { BaseProps } from "../types";

// Image variant types
export type ImageVariant = 'default' | 'rounded' | 'circle' | 'thumbnail';

// Image component props
export interface ImageProps extends BaseProps {
  variant?: ImageVariant;
  src?: string;
  alt?: string;
}

export const imageStyles: Record<ImageVariant, React.CSSProperties> = {
  default: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  rounded: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 8,
  },
  circle: {
    display: 'block',
    width: 64,
    height: 64,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  thumbnail: {
    display: 'block',
    width: 120,
    height: 120,
    borderRadius: 4,
    objectFit: 'cover',
    border: '1px solid #E3EAFC',
  },
};
