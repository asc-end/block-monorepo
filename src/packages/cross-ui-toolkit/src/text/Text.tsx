import { TextProps, textVariants } from './index';
import { useTheme } from '../theme/context';

export function Text(props: TextProps) {
  const { children, variant = 'body', style, className, ...rest } = props;
  const { currentColors } = useTheme();
  const variantStyle = textVariants[variant];

  if (style)
    style.lineHeight = null
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

  // If className is provided, use it instead of variant styles
  // This allows full override of text styles with Tailwind classes
  const combinedClassName = className || variantStyle;

  return (
    <p
      style={defaultStyle}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </p>
  );
};