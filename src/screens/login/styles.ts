import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

type Props = {
  outline?: boolean;
};

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  padding: 0px 0px;
`;
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 24px;
`;

export const Button = styled.TouchableOpacity`
  margin: 8px;
  background-color: ${(p: Props) => (p.outline ? '#fff' : '#eee000')};
  width: 260px;
  height: 54px;
  justify-content: center;
  align-items: center;
  border-color: #eee000;
  border-width: 1px;
  border-radius: 2px;
`;

export const TextButton = styled.Text``;

export const InputContainer = styled.View`
  padding: 5px;
`;

export const Input = styled.TextInput`
  border-color: #000;
  border-width: 1px;
  padding: 10px;
  border-radius: 2px;
  width: 260px;
  height: 54px;
`;
