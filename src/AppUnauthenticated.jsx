import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'Screens/login/login';

const Stack = createStackNavigator();

const AppUnauthenticated = () => {
  return (
    <Stack.Navigator initialRouteName="Milks">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Milk Milk' }} />
    </Stack.Navigator>
  );
};

export default AppUnauthenticated;
