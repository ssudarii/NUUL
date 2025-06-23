// components/Onboarding/StepTwoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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

const StepTwoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const handleSelect = async (reason: string) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'survey.reason': reason,  // 설문 응답 저장
      });

      navigation.navigate('CharacterIntro');
    } catch (error) {
      Alert.alert('저장 오류', '설문 응답 저장에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 이유로 스트레칭을 하시나요?</Text>

      {['통증 완화', '자세 교정', '운동 전/후 준비', '뻐근함 완화'].map((goal) => (
        <TouchableOpacity
          key={goal}
          style={styles.button}
          onPress={() => handleSelect(goal)}
        >
          <Text style={styles.buttonText}>{goal}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.page}>2/3</Text>
    </View>
  );
};

export default StepTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#c7d9c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
  page: {
    textAlign: 'center',
    marginTop: 30,
    color: '#aaa',
  },
});

