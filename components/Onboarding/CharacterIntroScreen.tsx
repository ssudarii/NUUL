// components/Onboarding/CharacterIntroScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type OnboardingStackParamList = {
  StepOne: undefined;
  StepTwo: undefined;
  CharacterIntro: undefined;
  Home: undefined;
};

const CharacterIntroScreen = () => {
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나만의 캐릭터가 만들어졌어요!</Text>
      <Image source={require('../../assets/penguin.png')} style={styles.character} />

      <TextInput
        value={nickname}
        onChangeText={setNickname}
        placeholder="닉네임을 입력하세요"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // 저장 후 메인화면으로 이동
          navigation.navigate('Main');
        }}
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>

      <Text style={styles.page}>3/3</Text>
    </View>
  );
};

export default CharacterIntroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 18, marginBottom: 16, textAlign: 'center' },
  character: { width: 160, height: 160, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00B894',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  page: { marginTop: 24, color: '#888' },
});
