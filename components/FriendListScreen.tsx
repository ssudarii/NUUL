import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const animalImages = [
  require('../assets/penguin.png'),
  require('../assets/turtle.png'),
  require('../assets/meerkat.png'),
];

const borderImages = [
  require('../assets/border1.png'),
  require('../assets/border2.png'),
  require('../assets/border3.png'),
];

const sampleTitles = ['꾸준함 장인', '스트레칭 요정', '근육몬'];

const sampleMessages = [
  '허리가 펴지는 그날까지...',
  '오늘도 화이팅!',
  '같이 해요!',
  '스트레칭 중🏃',
  '나는 스트레칭왕👑',
  '움직이면 살아있다!',
];

type Friend = {
  id: number;
  name: string;
  character: number;
  border: number;
  title: string;
  message: string;
  online: boolean;
};

export default function FriendListScreen() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchText, setSearchText] = useState('');
  const [newFriendName, setNewFriendName] = useState('');

  const myProfile: Friend = {
    id: 0,
    name: '곰팽이',
    character: 0,
    border: 0,
    title: '허리가 펴지는 그날까지...',
    message: '오늘도 화이팅!',
    online: true,
  };

  const addFriend = () => {
    if (!newFriendName.trim()) {
      Alert.alert('이름을 입력하세요');
      return;
    }

    const newFriend: Friend = {
      id: Date.now(),
      name: newFriendName.trim(),
      character: Math.floor(Math.random() * animalImages.length),
      border: Math.floor(Math.random() * borderImages.length),
      title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
      message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
      online: Math.random() < 0.5,
    };

    setFriends(prev => [...prev, newFriend]);
    setNewFriendName('');
  };

  const deleteFriend = (id: number) => {
    setFriends(prev => prev.filter(f => f.id !== id));
  };

  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFriend = ({ item }: { item: Friend }) => (
    <View style={styles.card}>
      <View style={styles.characterWrapper}>
        <Image source={borderImages[item.border]} style={styles.border} />
        <Image source={animalImages[item.character]} style={styles.character} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{item.name} [{item.title}]</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.statusWrapper}>
        {item.online && <View style={styles.dot} />}
        <TouchableOpacity onPress={() => deleteFriend(item.id)}>
          <Text style={styles.removeBtn}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 내 프로필 */}
      <View style={styles.card}>
        <View style={styles.characterWrapper}>
          <Image source={borderImages[myProfile.border]} style={styles.border} />
          <Image source={animalImages[myProfile.character]} style={styles.character} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>{myProfile.name}</Text>
          <Text style={styles.message}>{myProfile.title}</Text>
        </View>
      </View>

      {/* 이름 입력 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={newFriendName}
          onChangeText={setNewFriendName}
          placeholder="새 친구 이름"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addFriend}>
          <Text style={styles.addBtnText}>추가</Text>
        </TouchableOpacity>
      </View>

      {/* 친구 목록 */}
      <FlatList
        data={filteredFriends}
        renderItem={renderFriend}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fff7', padding: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  characterWrapper: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  border: {
    width: 60,
    height: 60,
    position: 'absolute',
    resizeMode: 'contain',
  },
  character: {
    width: 60,
    height: 60,
    position: 'absolute',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#555',
    fontSize: 13,
    marginTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginBottom: 6,
  },
  removeBtn: {
    fontSize: 12,
    color: 'red',
    textDecorationLine: 'underline',
  },
  statusWrapper: {
    alignItems: 'center',
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: '#3ca664',
    padding: 12,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
