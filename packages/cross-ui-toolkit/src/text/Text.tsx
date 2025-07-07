import { TextProps, textVariants } from './index';
import { useTheme } from '../theme/context';

export function Text(props: TextProps) {
  const { children, variant = 'body', style, className, ...rest } = props;
  const { currentColors } = useTheme();
  const variantStyle = textVariants[variant];

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
    <p
      style={defaultStyle}
      className={`${variantStyle} ${className || ''}`}
      {...rest}
    >
      {children}
    </p>
  );
};