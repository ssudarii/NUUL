import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Character from './Character';
import AttendanceCalendar from './AttendanceCalendar';


export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>4일째 스트레칭 중! 연속 일주일 도전~</Text>
        <Character type="penguin" />
        <AttendanceCalendar characterType="penguin" />
     
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
