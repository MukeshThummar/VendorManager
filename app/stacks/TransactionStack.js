import { createStackNavigator } from '@react-navigation/stack';
import NotFoundScreen from '../+not-found';
import TransactionPage from '../pages/TransactionPage';
import TransactionAddPage from '../pages/TransactionAddPage';

const Stack = createStackNavigator();

const TransactionStack = () => (
    <Stack.Navigator initialRouteName="Transaction">
        <Stack.Screen name="Transaction" component={TransactionPage} options={{ headerShown: false, title: "Transaction" }} />
        <Stack.Screen name="TransactionAdd" component={TransactionAddPage} options={{ headerShown: true, title: "Add Transaction" }} />
        <Stack.Screen name="+not-found" component={NotFoundScreen} />
    </Stack.Navigator>
);

export default TransactionStack;