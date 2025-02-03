import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import VendorStack from './stacks/VendorStack';
import DemoStack from './stacks/DemoStack';
import TransactionStack from './stacks/TransactionStack';
import migrationScript from '../services/database';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    };
    // const loadMigration = async () => {
    //   try {
    //     //const ismigrate = await migrationScript();
    //   } catch (error) {
    //     console.error('Error on migrating data:', error);
    //   } finally {
    //     if (loaded)  {
    //       SplashScreen.hideAsync();
    //     }
    //   }
    // };
    // loadMigration();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  function setIcon(routeName: string, color: string, size: number) {
    let iconName;
    switch (routeName) {
      case 'Home':
        iconName = 'home-outline';
        break;
      case 'Demo':
        iconName = 'settings-outline';
        break;
      case 'Vendor':
        iconName = 'person-outline';
        break;
      case 'Trans':
        iconName = 'cash-outline';
        break
      default:
        iconName = 'home-outline';
        break;
    }
    return <Icon name={iconName} size={size} color={color} />;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return setIcon(route.name, color, size);
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Home" component={TransactionStack} options={{ headerShown: false }} />
        <Tab.Screen name="Trans" component={TransactionStack} options={{ headerShown: false }} />
        <Tab.Screen name="Vendor" component={VendorStack} options={{ headerShown: false }} />
        <Tab.Screen name="Demo" component={DemoStack} options={{ headerShown: false }} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
