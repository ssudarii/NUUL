import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const borderImages = [
  require('../assets/border1.png'),
  require('../assets/border2.png'),
  require('../assets/border3.png'),
];


export default function AccountScreen() {
  const navigation = useNavigation();
  const [borderIndex, setBorderIndex] = useState<number | null>(null);
  const [badge, setBadge] = useState<string>('꾸준함 장인');

  useEffect(() => {
    const loadData = async () => {
      const index = await AsyncStorage.getItem('selectedBorderIndex');
      const badgeText = await AsyncStorage.getItem('selectedBadge');
      if (index !== null) setBorderIndex(parseInt(index));
      if (badgeText) setBadge(badgeText);
    };
    loadData();
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* 초록색 헤더 */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>계정</Text>
      </View>

      <View style={styles.container}>
        {/* 프로필 */}
        <View style={styles.profileBox}>
          <Image source={require('../assets/profile.png')} style={styles.avatar} />
          <Text style={styles.label}>[꾸준함 장인]</Text>
          <Text style={styles.name}>굽펭이</Text>
          <Text style={styles.subtitle}>허리가 펴지는 그날까지...</Text>
        </View>

        {/* 수정 메뉴 */}
        <View style={styles.infoRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Decorate')}>
          <Text style={styles.editItem}>개인정보 수정 ✏️</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <TouchableOpacity onPress={() => navigation.navigate('MyList')}>
          <Text style={styles.editItem}>나만의 리스트 ✏️</Text>
          </TouchableOpacity>
        </View>

        {/* 모임 관리 */}
        <Text style={styles.sectionTitle}>모임 관리</Text>
        <View style={styles.groupRow}>
          <View style={styles.groupItem}>
            <View style={styles.groupBox}>
              <Text style={styles.groupText}>직장인들아! 하루 5분만 스트레칭하자</Text>
            </View>
            <Text style={styles.exitText}>모임 나가기</Text>
          </View>

          <View style={styles.groupItem}>
            <View style={styles.groupBox}>
              <Text style={styles.groupText}>거북목타파같이해요 (14/50)</Text>
            </View>
            <Text style={styles.exitText}>모임 나가기</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#dff5e1',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 1,
  },
  label: {
    fontSize: 12,
    color: '#9b59b6',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
    paddingHorizontal: 8,
  },
  editItem: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 12,
    color: '#111',
  },
  groupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  groupItem: {
    flex: 1,
    alignItems: 'center',
  },
  groupBox: {
    backgroundColor: '#dff5e1',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    minHeight: 60,
    justifyContent: 'center',
  },
  groupText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitText: {
    fontSize: 11,
    color: '#d14c4c',
    marginTop: 4,
  },
});
