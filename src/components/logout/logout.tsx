import React from 'react';
import { Button, Alert } from 'react-native';

import { useAuth } from 'Providers/AuthProvider';

export default function Logout({ closeRealm }) {
  const { signOut } = useAuth();

  return (
    <Button
      title="Logout"
      onPress={() => {
        Alert.alert('Log Out?', null, [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => {
              closeRealm();
              signOut();
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ]);
      }}
    />
  );
}
