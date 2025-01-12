import { createStackNavigator } from '@react-navigation/stack';
import NotFoundScreen from '../+not-found';
import VendorPage from '../pages/VendorPage';
import VendorAddPage from '../pages/VendorAddPage';

const Stack = createStackNavigator();

const VendorStack = () => (
    <Stack.Navigator initialRouteName="Vendor">
        <Stack.Screen name="Vendor" component={VendorPage} options={{ headerShown: true, title: "Vendors" }} />
        <Stack.Screen name="VendorAdd" component={VendorAddPage} options={{ headerShown: true, title:"Add Vendor" }} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
    </Stack.Navigator>
);

export default VendorStack;