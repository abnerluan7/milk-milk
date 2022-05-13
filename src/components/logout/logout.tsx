import { useAuth } from 'Providers/AuthProvider';
import React from 'react';
import { Button, Alert } from 'react-native';

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
