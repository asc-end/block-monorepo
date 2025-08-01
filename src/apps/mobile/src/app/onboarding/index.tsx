import { useRouter } from 'expo-router';
import { StatusBar, ScrollView, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { 
  IntroScreen, 
  SlipScreen, 
  AverageScreen, 
  DaysScreen, 
  YearScreen, 
  ReclaimScreen
} from '@blockit/ui';
import { Text, useTheme } from '@blockit/cross-ui-toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsWrapper } from './PermissionsWrapper';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingFlow() {
  const router = useRouter();
  const { currentColors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  
  const socialMediaOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Check if we should show the text based on scroll position
    const shouldShow = scrollOffset >= screenWidth * 1.5 && scrollOffset <= screenWidth * 3.5;
    
    // Use runOnJS to ensure the value update happens outside of React's render phase
    const updateOpacity = () => {
      if (shouldShow && (currentPage === 2 || currentPage === 3)) {
        socialMediaOpacity.value = withTiming(1, { 
          duration: 600, 
          easing: Easing.out(Easing.exp) 
        });
      } else {
        socialMediaOpacity.value = 0; // Instant disappear
      }
    };
    
    // Defer the update to avoid the warning
    setTimeout(updateOpacity, 0);
  }, [currentPage, scrollOffset]);
  
  const socialMediaStyle = useAnimatedStyle(() => ({
    opacity: socialMediaOpacity.value
  }));

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('@hasCompletedOnboarding', 'true');
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      router.replace('/(tabs)/home');
    }
  };

  const goToNextPage = () => {
    if (currentPage < 6) {
      scrollViewRef.current?.scrollTo({ x: (currentPage + 1) * screenWidth, animated: true });
    }
  };
  
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(offsetX);
    const page = Math.round(offsetX / screenWidth);
    setCurrentPage(page);
  };


  return (
    <>
      <StatusBar barStyle={currentPage === 0 ? currentColors.black === "#000000" ? "light-content" : "dark-content" : "dark-content"} backgroundColor="transparent" translucent />
      <SafeAreaView 
        style={{ flex: 1, backgroundColor: currentColors.background }} 
        edges={['bottom', 'left', 'right']}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={{ width: screenWidth }}>
            <IntroScreen onGetStarted={goToNextPage} />
          </View>
          <View style={{ width: screenWidth }}>
            <SlipScreen onContinue={goToNextPage} />
          </View>
          <View style={{ width: screenWidth }}>
            <AverageScreen onContinue={goToNextPage} isVisible={currentPage === 2} />
          </View>
          <View style={{ width: screenWidth }}>
            <DaysScreen onContinue={goToNextPage} isVisible={currentPage === 3} />
          </View>
          <View style={{ width: screenWidth }}>
            <YearScreen onContinue={goToNextPage} isVisible={currentPage === 4} />
          </View>
          <View style={{ width: screenWidth }}>
            <ReclaimScreen onContinue={goToNextPage} />
          </View>
          <View style={{ width: screenWidth }}>
            <PermissionsWrapper onComplete={handleComplete} />
          </View>
        </ScrollView>
        
        {/* Fixed "on social media" text for screens 2 and 3 */}
        <Animated.View style={[{
          position: 'absolute',
          bottom: 66,
          left: 0,
          right: 0,
          alignItems: 'center',
          pointerEvents: 'none'
        }, socialMediaStyle]}>
          <Text style={{ 
            fontSize: 36, 
            lineHeight: 36, 
            fontFamily: "ClashDisplay", 
            textAlign: 'center'
          }}>
            on social media
          </Text>
        </Animated.View>
        
        {/* Page indicators */}
        <View style={{ 
          position: 'absolute', 
          bottom: 20, 
          left: 0, 
          right: 0, 
          flexDirection: 'row', 
          justifyContent: 'center' 
        }}>
          {[...Array(7)].map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentPage === index ? currentColors.primary[500] : currentColors.neutral[700],
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}