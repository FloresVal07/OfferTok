import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Auth Stack (Onboarding) */}
      <Stack.Screen name="(auth)" />
      
      {/* The Main App Stack (Tabs) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}