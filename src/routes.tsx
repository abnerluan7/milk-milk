import { useAuth } from 'Providers/AuthProvider';
import React from 'react';

import AppAuthenticated from './AppAuthenticated';
import AppUnauthenticated from './AppUnauthenticated';

export const Routes = () => {
  const { user, signUp, signIn } = useAuth();
  return user ? <AppAuthenticated /> : <AppUnauthenticated />;
};
