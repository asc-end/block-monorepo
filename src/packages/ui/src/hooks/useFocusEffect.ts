import { useEffect, useRef } from 'react';

/**
 * Cross-platform hook that runs an effect when the screen comes into focus
 * Works with both React Router (web/extension) and Expo Router (mobile)
 */
export function useFocusEffect(callback: () => void | (() => void)) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    // Check if we're in a React Native environment
    const isReactNative = typeof window !== 'undefined' && 
      window.navigator && 
      window.navigator.product === 'ReactNative';

    if (isReactNative) {
      // In React Native, just call the callback on mount
      // Navigation will handle re-mounting when navigating back
      callbackRef.current();
      return;
    }

    // Web environment
    // Initial call
    const cleanup = callbackRef.current();

    // For web: Listen to visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        callbackRef.current();
      }
    };

    // For web: Listen to window focus
    const handleFocus = () => {
      callbackRef.current();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    // Also listen for popstate events (browser back button)
    window.addEventListener('popstate', handleFocus);

    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('popstate', handleFocus);
    };
  }, []);
}