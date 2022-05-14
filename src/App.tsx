import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthProvider } from 'Providers/AuthProvider';

import { navigationRef } from './RootNavigation';
import { Routes } from './routes';

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
