import { createStackNavigator } from '@react-navigation/stack';
import NotFoundScreen from '../+not-found';
import Demo from '../pages/Demo';
import DemoDet from '../pages/DemoDet';
import DemoCalander from '../pages/DemoCalander';
const Stack = createStackNavigator();

const DemoStack = () => (
    <Stack.Navigator initialRouteName="Demo">
        <Stack.Screen name="Demo" component={DemoCalander} options={{ headerShown: false }} />
        <Stack.Screen name="DemoDet" component={DemoDet} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
    </Stack.Navigator>
);

export default DemoStack;