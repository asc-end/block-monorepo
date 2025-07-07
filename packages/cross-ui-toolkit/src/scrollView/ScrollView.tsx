import { BaseProps } from '../types';

export interface ScrollViewProps extends BaseProps {
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onScroll?: (event: any) => void;
  scrollEnabled?: boolean;
  contentContainerStyle?: any;
  contentContainerClassName?: string;
}

export function ScrollView(props: ScrollViewProps) {
  const {
    children,
    style,
    className,
    horizontal = false,
    showsVerticalScrollIndicator = true,
    showsHorizontalScrollIndicator = true,
    onScroll,
    scrollEnabled = true,
    contentContainerStyle,
    contentContainerClassName,
    ...rest
  } = props;

  console.log(style)
  return (
    <div
      style={{
        overflow: horizontal ? 'auto' : 'auto',
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
        scrollbarWidth: 'thin',
        ...(showsVerticalScrollIndicator ? {} : { msOverflowStyle: 'none', scrollbarWidth: 'none' }),
        ...(showsHorizontalScrollIndicator ? {} : { msOverflowStyle: 'none', scrollbarWidth: 'none' }),
        ...style,
      }}
      className={className}
      onScroll={onScroll}
      {...rest}
    >
      <div style={contentContainerStyle} className={contentContainerClassName}>
        {children}
      </div>
    </div>
  );
}

export default ScrollView;
