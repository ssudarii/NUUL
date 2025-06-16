import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // ✅ 추가

const joinableGroups = [
  '직장인들아\n5분만\n스트레칭\n하자',
  '거북이에서\n사람으로',
  '누워서\n유튜브 볼 때\n같이 5분!',
  '제발 스트레칭\n주말에 같이 해요!',
];

const joinedMembers = [
  { name: '삼겹팽이', avatar: require('../assets/penguin.png'), didStretch: true },
  { name: '완두통', avatar: require('../assets/meerkat.png'), didStretch: false },
  { name: '스트레칭왕', avatar: require('../assets/meerkat.png'), didStretch: true },
  { name: '이길펭', avatar: require('../assets/meerkat.png'), didStretch: false },
  { name: 'TY', avatar: require('../assets/penguin.png'), didStretch: true },
  { name: '시원펭', avatar: require('../assets/turtle.png'), didStretch: false },
  { name: '여의치박', avatar: require('../assets/turtle.png'), didStretch: true },
  { name: '난처행복권', avatar: require('../assets/turtle.png'), didStretch: true },
];

export default function CommunityHomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* 주파수 아이콘 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('NearbyUsers')}
        style={styles.geofenceIcon}
      >
        <Icon name="wifi" size={22} color="#222" />
      </TouchableOpacity>

      <Text style={styles.title}>모임 찾기</Text>
      <FlatList
        horizontal
        data={joinableGroups}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.groupList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupBox}
            onPress={() =>
              navigation.navigate('CommunityDetail' as never, { groupName: item } as never)
            }
          >
            <Text style={styles.groupText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ marginVertical: 12 }} />

      <Text style={styles.sectionTitle}>오늘의 스트레칭은 하셨나요?</Text>

      <View style={{ marginVertical: 12 }} />

      <View style={styles.highlightBox}>
        <Text style={styles.groupName}>📍 거북이에서 사람으로</Text>
      </View>

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
  container: { flex: 1, backgroundColor: '#eefdf5', padding: 16 },
  geofenceIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 0,
    backgroundColor: '#e0f4e3',
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  groupList: { paddingBottom: 8 },
  groupBox: {
    width: 90,
    height: 90,
    backgroundColor: '#bdf2d4',
    borderRadius: 12,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  groupText: {
    color: '#000',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 17,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 4 },
  highlightBox: {
    backgroundColor: '#d8f3dc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  groupName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1a452d',
    textAlign: 'center',
  },
  members: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  memberCard: { alignItems: 'center', width: 70 },
  avatar: { width: 80, height: 80, borderRadius: 25, marginBottom: 4 },
  name: { fontSize: 13, textAlign: 'center' },
});
