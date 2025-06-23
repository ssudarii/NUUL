import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth, db } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

type OnboardingStackParamList = {
  StepOne: undefined;
  StepTwo: undefined;
  CharacterIntro: undefined;
  Home: undefined;
};

const CharacterIntroScreen = () => {
  const [nickname, setNickname] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const saveProfileAndNavigate = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        nickname: nickname.trim(),
        character: 0, // 현재는 펭귄(0)으로 고정
      });

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('저장 실패', error.message);
    }
  };

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

      <TouchableOpacity style={styles.button} onPress={saveProfileAndNavigate}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>

      <Text style={styles.page}>3/3</Text>
    </View>
  );
};

export default CharacterIntroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 18, marginBottom: 16, textAlign: 'center', fontWeight: 'bold' },
  character: { width: 320, height: 320, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c7d9c7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: '#454545', fontWeight: 'bold' },
  page: { marginTop: 24, color: '#888' },
});


