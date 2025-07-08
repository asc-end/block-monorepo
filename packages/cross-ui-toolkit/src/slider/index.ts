
import { ThemeColors } from '../theme/context';

// Shared function to get slider colors based on theme
export const getSliderColors = (theme: ThemeColors) => {
  return {
    minTrackTintColor: theme.primary[300],
    maxTrackTintColor: theme.neutral[200],
    thumbTintColor: theme.primary[300],
  };
}; 