import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const joinableGroups = [
  { name: '직장인들아!\n하루 5분만\n스트레칭하자', highlight: true },
  { name: '거북목타파같\n이해요', highlight: true, count: '14/50' },
  { name: '누워서 유튜\n브 보기 전에\n잠깐 5분!', highlight: true },
  { name: '재활 스트레\n칭\n주말에 해요!', highlight: true },
];

const joinedMembers = [
  { name: 'int P', avatar: require('../assets/turtle.png'), didStretch: true },
  { name: '삼겹팽이', avatar: require('../assets/penguin.png'), didStretch: true },
  { name: '여의치박', avatar: require('../assets/turtle.png'), didStretch: true },
  { name: '밀키', avatar: require('../assets/penguin.png'), didStretch: false },
  { name: 'TY', avatar: require('../assets/penguin.png'), didStretch: true },
  { name: '완두통', avatar: require('../assets/meerkat.png'), didStretch: false },
  { name: '스트레칭왕', avatar: require('../assets/meerkat.png'), didStretch: true },
  { name: '이길펭', avatar: require('../assets/meerkat.png'), didStretch: false },
  { name: '난처행복권', avatar: require('../assets/turtle.png'), didStretch: true },
  { name: '시원펭', avatar: require('../assets/turtle.png'), didStretch: false },
];

export default function CommunityHomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>커뮤니티</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('NearbyUsers')}
          style={styles.geofenceIcon}
        >
          <Icon name="wifi" size={20} color="#222" />
        </TouchableOpacity>
      </View>

      {/* 모임 찾기 */}
      <Text style={styles.subTitle}>모임 찾기</Text>
      <View style={styles.groupRow}>
        {joinableGroups.map((group, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.groupBox, group.highlight && styles.groupBoxDark]}
            onPress={() =>
              navigation.navigate('CommunityDetail' as never, { groupName: group.name } as never)
            }
          >
            <Text style={[styles.groupText, group.highlight && styles.groupTextDark]}>
              {group.name}
              {group.count ? `\u000A(${group.count})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.arrowrapper}>
        <TouchableOpacity style={styles.arrowBox}>
          <Icon name="arrow-forward" size={20} color="#c7d9c7" />
        </TouchableOpacity>
      </View>
      

      {/* 오늘의 스트레칭 */}
      <Text style={styles.sectionTitle}>오늘의 스트레칭은 하셨나요?</Text>
      <View style={styles.highlightBox}>
        <Text style={styles.groupName}>직장인들아! 하루 5분만 스트레칭하자</Text>
      </View>

      {/* 캐릭터 리스트 */}
      <View style={styles.members}>
        {joinedMembers.map((m, i) => (
          <View key={i} style={styles.memberCard}>
            <Image
              source={m.avatar}
              style={[styles.avatar, { opacity: m.didStretch ? 1 : 0.4 }]}
            />
            <Text style={styles.name}>{m.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  geofenceIcon: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#eef2ef',
    padding: 6,
    borderRadius: 8,
  },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#111' },
  groupRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    alignItems: 'center',
  },
  groupBox: {
    backgroundColor: '#e3f9e5',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  groupBoxDark: {
    backgroundColor: '#d8ead8',
  },
  groupText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#222',
    fontWeight: 'bold',
  },
  groupTextDark: {
    color: '#000',
    fontWeight: 'bold',
  },
  arrowBox: {
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  arrowWrapper: {
  alignItems: 'flex-end',
  marginTop: 12,
  marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 10,
    color: '#111',

  },
  highlightBox: {
    backgroundColor: '#d8ead8',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 25,
  },
  groupName: {
    fontSize: 11,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  members: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  memberCard: { alignItems: 'center', width: 70 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginBottom: 4 },
  name: { fontSize: 11, fontWeight: 'bold', textAlign: 'center', color: '#333' },
});





