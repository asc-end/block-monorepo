import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface AnimatedViewProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
}

export const AnimatedView = motion.div;