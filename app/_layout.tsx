import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import NotFoundScreen from './+not-found';
import VendorPage from './pages/VendorPage';
import VendorAddPage from './pages/VendorAddPage';
import Demo from './pages/Demo';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Vendor">
        <Stack.Screen name="Vendor" component={VendorPage} options={{ headerShown: false }} />
        <Stack.Screen name="VendorAdd" component={VendorAddPage} options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
        <Stack.Screen name="Demo" component={Demo} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
