import { Tabs, useRouter, useSegments } from 'expo-router';
import { useTheme } from '@blockit/cross-ui-toolkit';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { currentColors } = useTheme();
  const router = useRouter();
  const segments = useSegments();

  const handleTabPress = (tabName: string) => {
    // Get the current tab from segments
    const currentTab = segments[1]; // segments[0] is '(tabs)', segments[1] is the current tab
    
    // If switching to a different tab, navigate to its root
    if (currentTab !== tabName) {
      if(router.canDismiss()) {
        router.dismissAll()
      }
      router.push(`/(tabs)/${tabName}`);
    }
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: currentColors.primary[500],
        tabBarInactiveTintColor: currentColors.text.soft,
        tabBarStyle: {
          backgroundColor: currentColors.surface.card,
          borderTopWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarShowLabel: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: currentColors.surface.card,
        },

        headerTitleStyle: {
          color: currentColors.text.main,
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress('settings');
          },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress('home');
          },
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress('analytics');
          },
        }}
      />
    </Tabs>
  );
}