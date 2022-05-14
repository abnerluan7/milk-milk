import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

type Props = {
  backgroundList: boolean;
};

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  padding: 0px 0px;
`;
export const Container = styled(ScrollView)`
  flex: 1;
`;

export const ButtonStyled = styled(Button)``;

export const Content = styled.View`
  flex: 1;
  background-color: ${(p: Props) => (p.backgroundList ? '#fff' : '#eee')};
  padding: 12px;
`;

export const Title = styled.Text`
  font-weight: bold;
`;

export const Subtitle = styled.Text``;
