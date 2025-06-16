import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 프로필 */}
      <View style={styles.header}>
        <Image source={require('../assets/penguin.png')} style={styles.avatar} />
        <View style={styles.profileText}>
          <Text style={styles.nickname}>곰팽이</Text>
          <Text style={styles.description}>허리가 펴지는 그날까지...</Text>
        </View>
      </View>

      {/* 메뉴 목록 */}
      <View style={styles.menuWrapper}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.menuTitle}>👤 계정</Text>
          <Text style={styles.menuDesc}>개인정보, 프로필 관리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <TouchableOpacity onPress={() => navigation.navigate('AlarmList')}>
          <Text style={styles.menuTitle}>⏰ 알림 설정</Text>
          <Text style={styles.menuDesc}>스트레칭 알람 시간 및 모임 설정</Text>
        </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <TouchableOpacity onPress={() => navigation.navigate('FriendList')}>
          <Text style={styles.menuTitle}>👥 친구 목록</Text>
          <Text style={styles.menuDesc}>친구 추가, 삭제, 활동 확인</Text>
          </TouchableOpacity>
          </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuTitle}>❓ 도움</Text>
          <Text style={styles.menuDesc}>자주 묻는 질문, 문의하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#dff5e1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
    
  },
  avatar: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  profileText: {
    flexDirection: 'column',
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  menuWrapper: {
    flex: 1,
    gap: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 80,
    paddingHorizontal: 70,
  },
  menuItem: {
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
});
