import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const mockMembers = [
  { name: 'int P', avatar: require('../assets/penguin.png') },
  { name: '삼겹팽이', avatar: require('../assets/penguin.png') },
  { name: '여의치박', avatar: require('../assets/meerkat.png') },
  { name: '윌키', avatar: require('../assets/penguin.png') },
  { name: 'TY', avatar: require('../assets/turtle.png') },
  { name: '완두통', avatar: require('../assets/meerkat.png') },
  { name: '스트레칭왕', avatar: require('../assets/turtle.png') },
  { name: '이길펭', avatar: require('../assets/meerkat.png') },
  { name: '난처행복권', avatar: require('../assets/turtle.png') },
  { name: '시원펭', avatar: require('../assets/penguin.png') },
];

const mockPosts = [
  {
    id: 1,
    date: '2025-05-17',
    title: '허리 스트레칭',
    description: '점심 잘 드셨나요?\n오래 앉아 있었으니 허리도 풀어줘야죠!\n아래 링크로 가볍게 스트레칭 해봐요 :)',
    image: require('../assets/thumb2.png'),
  },
  {
    id: 2,
    date: '2025-05-16',
    title: '승모근 스트레칭',
    description: '오늘은 승모근을 풀어봅시다!\n아래의 스트레칭을 진행하세요 ;)',
    image: require('../assets/thumb1.png'),
  },
];

export default function CommunityScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { groupName } = (route.params ?? { groupName: '누워서\n유튜브 볼 때\n같이 5분!' }) as { groupName: string };

  const handleJoin = () => {
    navigation.navigate('GroupActivityScreen', {
      groupName,
      posts: mockPosts,
      activeMembers: mockMembers.slice(0, 5),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>모임 상세</Text>
      <Text style={styles.sub}>{groupName}</Text>

      <View style={styles.messageBox}>
        <Text style={styles.message}>유튜브 볼 때, 짧게라도 운동하자!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>멤버</Text>
        <View style={styles.grid}>
          {mockMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Image source={member.avatar} style={styles.avatar} />
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>참여하기!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f8f5', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  sub: { fontSize: 16, marginBottom: 16, color: '#000' },
  messageBox: {
    backgroundColor: '#e3fcd7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  message: { fontSize: 13, color: '#000' },
  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  memberCard: { width: '23%', alignItems: 'center', marginVertical: 8 },
  avatar: { width: 70, height: 70, borderRadius: 25, marginBottom: 4 },
  memberName: { fontSize: 13, textAlign: 'center' },
  button: {
    backgroundColor: '#b2eeb3',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: { fontWeight: 'bold', color: '#066608' },
});
