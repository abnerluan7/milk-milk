import { useNavigation } from '@react-navigation/native';
import { useMilks } from 'Providers/MilkProvider';
import React, { useEffect } from 'react';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { Logout } from 'Components';

export function MilksView() {
  const navigation = useNavigation();

  const { milks, closeRealm } = useMilks();

  const onClickLink = (milk) => {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Log out',
      headerLeft: () => <Logout closeRealm={closeRealm} />,
    });
  }, [navigation]);

  useEffect(() => {
    console.log(JSON.stringify(milks, null, 2));
  });

  return (
    <ScrollView>
      {milks.map((milk, index) => (
        <ListItem.Swipeable onPress={() => onClickLink(milk)} bottomDivider key={index}>
          <ListItem.Content>
            <ListItem.Title>{milk.amount_of_milk_produced}</ListItem.Title>
            <ListItem.Subtitle>{milk.number_of_cows_head}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
}
