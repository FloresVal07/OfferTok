import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#0F62FE', // Primary action color
        tabBarInactiveTintColor: '#888888',
        tabBarStyle: { 
          backgroundColor: '#000000',     // Dark mode base
          borderTopWidth: 0,              // Removes the harsh top border
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ title: 'For You' }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ title: 'Post Item' }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: 'Storefront' }} 
      />
    </Tabs>
  );
}