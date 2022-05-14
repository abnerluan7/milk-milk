import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useAuth } from 'Providers/AuthProvider';

import { Container, InputContainer, SafeArea, Title, Button, Input, TextButton } from './styles';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    if (user != null) {
      navigation.navigate('Milks');
    }
  }, [user]);

  const onPressSignIn = async () => {
    console.log('Trying sign in with user: ' + email);
    try {
      await signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign in: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  const onPressSignUp = async () => {
    console.log('Trying Sign Up with user: ' + email);
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign up: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  return (
    <SafeArea>
      <Container>
        <Title>Sign In</Title>
        <InputContainer>
          <Input onChangeText={setEmail} value={email} placeholder="email" autoCapitalize="none" />
        </InputContainer>
        <InputContainer>
          <Input
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
            secureTextEntry
          />
        </InputContainer>
        <Button onPress={onPressSignIn}>
          <TextButton>Sign In</TextButton>
        </Button>
        <Button onPress={onPressSignUp} outline>
          <TextButton>Sign Up</TextButton>
        </Button>
      </Container>
    </SafeArea>
  );
}
