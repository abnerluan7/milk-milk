import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from 'Providers/AuthProvider';
import { MilkProvider } from 'Providers/MilkProvider';
import React from 'react';
import { LoginScreen } from 'Screens/login/login';
import { MilksScreen } from 'Screens/milk/MilkScreen';

import { navigationRef } from './RootNavigation';
import { Routes } from './routes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
