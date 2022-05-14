import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ListItem } from 'react-native-elements';

import { Logout } from 'Components';

import { CheckList } from 'Types/Checklist';

import { useMilks } from 'Providers/MilkProvider';

import { SafeArea, Container, ButtonStyled, Content, Title, Subtitle } from './styles';

export function MilksScreen() {
  const navigation = useNavigation();

  const { checkLists, closeRealm, createChecklists, deleteMilks, updateCheckListsFrontSide } =
    useMilks();

  const onClickMilk = (checklist: CheckList) => {
    checklist.had_supervision = !checklist.had_supervision;
    updateCheckListsFrontSide(checklist);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Log out',
      headerLeft: () => <Logout closeRealm={closeRealm} />,
    });
  }, [navigation]);

  return (
    <SafeArea>
      <Container>
        <ButtonStyled
          title="Get API!"
          onPress={createChecklists}
          buttonStyle={{ backgroundColor: 'green' }}
        />
        <ButtonStyled title="Remove All!" onPress={deleteMilks} />

        {checkLists.map((checkList, index) => (
          <ListItem.Swipeable
            bottomDivider
            key={index}
            rightContent={
              <ButtonStyled
                title={checkList.had_supervision ? 'Uncheck' : 'Check'}
                onPress={() => onClickMilk(checkList)}
                icon={{ name: 'delete', color: 'white' }}
                buttonStyle={{
                  minHeight: '100%',
                  backgroundColor: checkList.had_supervision ? 'red' : 'blue',
                }}
              />
            }>
            <Content backgroundList={index % 2 == 1}>
              <Title>{checkList.farmer.name}</Title>
              <Subtitle>Cows: {checkList.number_of_cows_head}</Subtitle>
              <Subtitle>Milks: {checkList.amount_of_milk_produced}</Subtitle>
              <Subtitle>Check: {checkList.had_supervision ? 'true' : 'false'}</Subtitle>
            </Content>

            <ListItem.Chevron tvParallaxProperties />
          </ListItem.Swipeable>
        ))}
      </Container>
    </SafeArea>
  );
}
