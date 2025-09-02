import { useColorScheme } from '@/presentation/theme/hooks/useColorScheme';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function RootLayout() {

  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  });
 
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('../assets/fonts/Kanit-Bold.ttf'),
    KanitThin: require('../assets/fonts/Kanit-Thin.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: backgroundColor, flex: 1 }} >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false}}></Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </View>
  );
}
