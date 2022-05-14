import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from 'Providers/AuthProvider';
import { MilkProvider } from 'Providers/MilkProvider';
import { LoginScreen } from 'Screens/login/login';
import { MilksView } from 'Screens/milk/MilkScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <MilkProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Milks">
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Milk Milk' }} />
            <Stack.Screen name="Milks" component={MilksView} />
          </Stack.Navigator>
        </NavigationContainer>
      </MilkProvider>
    </AuthProvider>
  );
};

export default App;
