// components/Onboarding/StepTwoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type OnboardingStackParamList = {
  StepOne: undefined;
  StepTwo: undefined;
  CharacterIntro: undefined;
  Home: undefined;
};


const StepTwoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 목표로 걷고 싶으신가요?</Text>

      {['건강', '다이어트', '습관', '통근', '자연산책'].map((goal) => (
        <TouchableOpacity
          key={goal}
          style={styles.button}
          onPress={() => navigation.navigate('CharacterIntro')}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#a4d4ae',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
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
