import { BaseProps } from '../types';

export function Box(props: BaseProps) {
  const { children, style, className, ...rest} = props;
  return (
    <div style={style} className={className} {...rest}>
      {children}
    </div>
  );
}

export default Box; 