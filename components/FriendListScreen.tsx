import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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

export default function FriendListScreen() {
  const [myNickname, setMyNickname] = useState('');
  const [myCharacter, setMyCharacter] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMyNickname(data.nickname || '');
        setMyCharacter(data.character || 0);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 프로필</Text>
      <View style={styles.card}>
        <Image source={borderImages[0]} style={styles.border} />
        <Image source={animalImages[myCharacter]} style={styles.character} />
        <Text style={styles.nickname}>{myNickname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  character: { width: 100, height: 100, resizeMode: 'contain' },
  border: { width: 100, height: 100, resizeMode: 'contain', position: 'absolute' },
  nickname: { marginTop: 12, fontWeight: 'bold', fontSize: 16 },
});