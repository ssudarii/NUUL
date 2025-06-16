// components/Onboarding/StepOneScreen.tsx
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
const StepOneScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>당신은 하루에 보통 언제 걷는가요?</Text>

      <View style={styles.buttonGroup}>
        {['아침', '점심', '저녁', '야간', '수시로'].map((time) => (
          <TouchableOpacity
            key={time}
            style={styles.button}
            onPress={() => navigation.navigate('StepTwo')}
          >
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
  title: { fontSize: 18, textAlign: 'center', marginBottom: 32 },
  buttonGroup: { gap: 12 },
  button: {
    backgroundColor: '#64DE52',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: '#000000', fontWeight: 'bold' },
  page: { marginTop: 24, color: '#888' },
});
