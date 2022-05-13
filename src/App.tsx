import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAllCheckLists } from 'Services/checklist';

import { Button } from 'Components';

const App = () => {
  const getCheckLists = async () => {
    const { data: checklists } = await getAllCheckLists();
    console.log(checklists);
  };
  useEffect(() => {
    getCheckLists();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! {process.env.REALM_APP_ID}</Text>
      <Button />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default registerRootComponent(App);
