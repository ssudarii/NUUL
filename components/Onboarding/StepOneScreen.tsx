import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type OnboardingStackParamList = {
  StepOne: undefined;
  StepTwo: undefined;
  CharacterIntro: undefined;
  Home: undefined;
};

const StepOneScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const db = firestore();

  const handleSelect = async (time: string) => {
    const user = auth().currentUser;
    if (!user) {
      console.warn('로그인 필요');
      return;
    }

    await db.collection('users').doc(user.uid).update({
      survey: {
        timeOfStretch: time,
      },
    });

    navigation.navigate('StepTwo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>하루 중 언제 스트레칭을 하시나요?</Text>

      <View style={styles.buttonGroup}>
        {['아침', '점심', '저녁', '자기 전', '스트레칭 하지 않음'].map((time) => (
          <TouchableOpacity key={time} style={styles.button} onPress={() => handleSelect(time)}>
            <Text style={styles.buttonText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.page}>1/3</Text>
    </View>
  );
};

export default StepOneScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  buttonGroup: { gap: 12 },
  button: {
    backgroundColor: '#c7d9c7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: '#000000', fontWeight: 'bold', textAlign: 'center' },
  page: { marginTop: 24, color: '#888' },
});

