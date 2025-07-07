import { Text as RNText } from 'react-native';
import { TextProps, textVariants } from './index';
import { useTheme } from '../theme/context';

export function Text(props: TextProps) {
  const { children, variant = 'body', style, className, ...rest } = props;
  const { currentColors } = useTheme();

  // Get default text color based on variant
  const getDefaultTextColor = () => {
    switch (variant) {
      case 'caption':
        return currentColors.text.soft;
      default:
        return currentColors.text.main;
    }
  };

  const defaultStyle = {
    color: getDefaultTextColor(),
    ...style,
  };

  return (
    <RNText
      style={defaultStyle}
      className={className}
      {...rest}
    >
      {children}
    </RNText>
  );
}; 