import { BaseProps } from '../types';
import { ScrollView as RNScrollView, View } from 'react-native';

export interface ScrollViewProps extends BaseProps {
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  onScroll?: (event: any) => void;
  scrollEnabled?: boolean;
  contentContainerStyle?: any;
  // contentContainerClassName?: string;
  scrollEventThrottle?: number;
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
    // contentContainerClassName,
    ...rest
  } = props;

  // Extract layout styles from style prop and move them to contentContainerStyle
  const { 
    justifyContent, 
    alignItems, 
    alignContent,
    flexDirection,
    flexWrap,
    flexGrow,
    flexShrink,
    ...remainingStyle 
  } = style || {};
  
  const mergedContentContainerStyle = {
    justifyContent,
    alignItems,
    alignContent,
    flexDirection,
    flexWrap,
    flexGrow,
    flexShrink,
    ...contentContainerStyle,
  };

  return (
    <RNScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      onScroll={onScroll}
      scrollEnabled={scrollEnabled}
      style={remainingStyle}
      contentContainerStyle={mergedContentContainerStyle}
      className={className}
      {...rest}
    >
      {children}
    </RNScrollView>
  );
}

export default ScrollView;
