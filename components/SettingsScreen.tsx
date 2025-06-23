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
    <>
      {/* 초록색 상단바 */}
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>설정</Text>
      </View>

      <View style={styles.container}>
        {/* 프로필 영역 */}
        <View style={styles.header}>
          <Image source={require('../assets/profile.png')} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={styles.message}>[꾸준함 장인]</Text>
            <Text style={styles.nickname}>굽펭이</Text>
            <Text style={styles.description}>허리가 펴지는 그날까지...</Text>
          </View>
        </View>

        {/* 메뉴 목록 */}
        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image source={require('../assets/my.jpg')} style={styles.icon} />
            <View>
              <Text style={styles.menuTitle}>계정</Text>
              <Text style={styles.menuDesc}>개인정보, 프로필 관리</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AlarmList')}>
            <Image source={require('../assets/alarm.png')} style={styles.icon} />
            <View>
              <Text style={styles.menuTitle}>알림 설정</Text>
              <Text style={styles.menuDesc}>스트레칭 알람 시간 및 모임 설정</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('FriendList')}>
            <Image source={require('../assets/friend.png')} style={styles.icon} />
            <View>
              <Text style={styles.menuTitle}>친구목록</Text>
              <Text style={styles.menuDesc}>친구 추가, 삭제, 활동 확인</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Image source={require('../assets/help.png')} style={styles.icon} />
            <View>
              <Text style={styles.menuTitle}>도움</Text>
              <Text style={styles.menuDesc}>자주 묻는 질문, 문의하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    backgroundColor: '#dff5e1',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900', // 더 굵게
    color: '#111',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  profileText: {
    flexDirection: 'column',
    gap: 4,
  },
  message: {
    fontSize: 12,
    color: '#9b59b6',
  },
  nickname: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  menuWrapper: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 16,
    marginLeft: 25,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    paddingBottom: 40,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 11,
    color: '#444',
  },
});

