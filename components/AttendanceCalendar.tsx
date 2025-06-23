import React, { useEffect,useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AttendanceCalendarProps {
  characterType: 'penguin' | 'meerkat' | 'turtle';
}

const characterStamps = {
  penguin: require('../assets/stamp_penguin.png'),
  meerkat: require('../assets/stamp_meerkat.png'),
  turtle: require('../assets/stamp_turtle.png'),
};

export default function AttendanceCalendar({ characterType }: AttendanceCalendarProps) {

  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
  
  const today = new Date().toISOString().split('T')[0];
  
   useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    setMarkedDates((prev) => {
      if (prev[todayString]) return prev; // 이미 찍었으면 무시
      return {
        ...prev,
        [todayString]: { selected: true }
      };
    });
  }, []);

  // ✅ 이미 찍힌 날짜면 경고, 아니면 도장 찍기
  const handleDayPress = (day: { dateString: string }) => {
    if (markedDates[day.dateString]) {
      Alert.alert('이미 출석했어요!', '하루에 한 번만 도장을 찍을 수 있어요.');
      return;
    }

    const newMarked = {
      ...markedDates,
      [day.dateString]: { selected: true },
    };
    setMarkedDates(newMarked);
  };

  return (
    <Calendar
      markingType="custom"
      markedDates={markedDates}
      onDayPress={handleDayPress}
      style={{ borderRadius: 10, width: 380 }}

       theme={{
      'stylesheet.calendar.header': {
        // 요일줄(월~일) 바 전체
        week: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#d8ead8',   // 연녹색 배경
          paddingVertical: 4,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        // 모든 요일 기본 글자 스타일
        dayHeader: {
          fontWeight: '600',
          fontSize: 14,
          color: '#000',
        },
        // 특정 요일만 색 바꾸기 (0 = Sun, 6 = Sat)
        dayTextAtIndex0: { color: 'red' },   // 일요일
        dayTextAtIndex6: { color: 'red' },   // 토요일
      },
    }}
  
      dayComponent={({ date }) => {
        const stamp = markedDates[date.dateString] ? characterStamps[characterType] : null;
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {stamp ? (
              <Image source={stamp} style={{ width: 30, height: 30,opacity: 0.9}} resizeMode="contain" />
            ) : (
              <Text>{date.day}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
