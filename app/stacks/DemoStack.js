import { createStackNavigator } from '@react-navigation/stack';
import NotFoundScreen from '../+not-found';
import Demo from '../pages/Demo';

const Stack = createStackNavigator();

const DemoStack = () => (
    <Stack.Navigator initialRouteName="Demo">
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
    </Stack.Navigator>
);

export default DemoStack;