import { useNavigation } from '@react-navigation/native';
import { useMilks } from 'Providers/MilkProvider';
import React, { useEffect } from 'react';
import { ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { CheckList } from 'Types/Checklist';

import { Logout } from 'Components';

export function MilksView() {
  const navigation = useNavigation();

  const { checkLists, closeRealm, createChecklists, deleteMilks, updateChecklist } = useMilks();

  const onClickMilk = (milk: CheckList) => {
    updateChecklist(milk);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Log out',
      headerLeft: () => <Logout closeRealm={closeRealm} />,
    });
  }, [navigation]);

  useEffect(() => {
    console.log(JSON.stringify(checkLists, null, 2));
  });

  return (
    <ScrollView>
      <Button
        title="Get API!"
        onPress={createChecklists}
        buttonStyle={{ backgroundColor: 'green' }}
      />
      <Button title="Remove All!" onPress={deleteMilks} buttonStyle={{ backgroundColor: 'red' }} />

      {checkLists.map((checkList, index) => (
        <ListItem.Swipeable
          bottomDivider
          key={index}
          rightContent={
            <Button
              title={checkList.had_supervision ? 'Uncheck' : 'Check'}
              onPress={() => onClickMilk(checkList)}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{
                minHeight: '100%',
                backgroundColor: checkList.had_supervision ? 'red' : 'blue',
              }}
            />
          }>
          <ListItem.Content>
            <ListItem.Title>{checkList.farmer.name}</ListItem.Title>
            <ListItem.Subtitle>Cows: {checkList.number_of_cows_head}</ListItem.Subtitle>
            <ListItem.Subtitle>Milks: {checkList.amount_of_milk_produced}</ListItem.Subtitle>
            <ListItem.Subtitle>
              Check: {checkList.had_supervision ? 'true' : 'false'}
            </ListItem.Subtitle>
          </ListItem.Content>

          <ListItem.Chevron tvParallaxProperties />
        </ListItem.Swipeable>
      ))}
    </ScrollView>
  );
}
