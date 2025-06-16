// AlarmEditScreen.tsx
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AlarmEditScreen() {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [label, setLabel] = useState('알람');
  const [snooze, setSnooze] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const saveAlarm = async () => {
    const newAlarm = {
      id: Date.now(),
      time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
      label,
      days: selectedDays,
      snooze,
      enabled: true,
    };

    try {
      const json = await AsyncStorage.getItem('alarms');
      const existing = json ? JSON.parse(json) : [];
      const updated = [...existing, newAlarm];
      await AsyncStorage.setItem('alarms', JSON.stringify(updated));
      navigation.goBack();
    } catch (e) {
      Alert.alert('저장 실패', '알람을 저장하지 못했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림 추가</Text>
        <TouchableOpacity onPress={saveAlarm}>
          <Text style={styles.save}>저장</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeBlock}>
        <Text style={styles.timeText}>
          {time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selected) => {
            setShowPicker(false);
            if (selected) setTime(selected);
          }}
        />
      )}

      <View style={styles.dayRow}>
        {weekdays.map(day => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDays.includes(day) && styles.daySelected]}
            onPress={() => toggleDay(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>라벨</Text>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="예: 아침 스트레칭"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>사운드</Text>
        <Text style={styles.input}>랜덤🔊</Text>
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>다시 알림</Text>
        <Switch value={snooze} onValueChange={setSnooze} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e2f6e8', padding: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  cancel: { fontSize: 16, color: '#666' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  save: { fontSize: 16, color: '#3ca664', fontWeight: 'bold' },
  timeBlock: {
    backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20,
  },
  timeText: { fontSize: 32, fontWeight: 'bold' },
  dayRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
  },
  dayButton: {
    padding: 10, borderRadius: 8, backgroundColor: '#fff',
  },
  daySelected: {
    backgroundColor: '#3ca664',
  },
  dayText: { color: '#000', fontWeight: 'bold' },
  inputRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#ccc',
  },
  inputLabel: { fontSize: 16, color: '#444' },
  input: { fontSize: 16, color: '#222', flex: 1, textAlign: 'right' },
});
