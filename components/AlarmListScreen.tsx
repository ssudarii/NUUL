// AlarmListScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface Alarm {
  id: number;
  time: string;
  label: string;
  days: string[];
  snooze: boolean;
  enabled: boolean;
}

export default function AlarmListScreen() {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const loadAlarms = async () => {
    const json = await AsyncStorage.getItem('alarms');
    if (json) setAlarms(JSON.parse(json));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAlarms();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>알람 설정</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AlarmEdit')}>
          <Text style={styles.add}>＋</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {alarms.map(alarm => (
          <View key={alarm.id} style={styles.card}>
            <View>
              <Text style={styles.time}>{alarm.time}</Text>
              <Text style={styles.label}>{alarm.label}</Text>
              <Text style={styles.days}>{alarm.days.join(' ')}</Text>
            </View>
            <Switch value={alarm.enabled} disabled />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#dff5e1',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  add: { fontSize: 26, fontWeight: 'bold', color: '#3ca664' },

  card: {
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    padding: 16,
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: { fontSize: 24, fontWeight: 'bold' },
  label: { fontSize: 14, color: '#444', marginTop: 4 },
  days: { fontSize: 12, color: '#999', marginTop: 2 },
});
