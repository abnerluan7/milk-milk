import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from 'Providers/AuthProvider';
import { MilkProvider } from 'Providers/MilkProvider';
import { LoginScreen } from 'Screens/login/login';
import { MilksView } from 'Screens/milk/milk';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Milk Milk' }} />
          <Stack.Screen name="Milks">
            {() => {
              return (
                <MilkProvider>
                  <MilksView />
                </MilkProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
