import { createStackNavigator } from '@react-navigation/stack';
import { MilkProvider } from 'Providers/MilkProvider';
import React from 'react';
import { MilksScreen } from 'Screens/milk/MilkScreen';

const Stack = createStackNavigator();

const AppAuthenticated = () => {
  return (
    <MilkProvider>
      <Stack.Navigator initialRouteName="Milks">
        <Stack.Screen name="Milks" component={MilksScreen} />
      </Stack.Navigator>
    </MilkProvider>
  );
};

export default AppAuthenticated;
