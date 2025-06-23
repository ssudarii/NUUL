// components/Onboarding/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          email,
          nickname: '',
          character: null,
          survey: {},
        });

      navigation.navigate('StepOne');
    } catch (error: any) {
      Alert.alert('회원가입 오류', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('StepOne');
    } catch (error: any) {
      Alert.alert('로그인 오류', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 또는 회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="회원가입" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 24,
  },
  input: {
    width: '100%', backgroundColor: '#fff', borderColor: '#ccc', borderWidth: 1,
    borderRadius: 8, padding: 12, marginBottom: 12,
  },
});




