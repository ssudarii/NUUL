import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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

export default function HomeScreen() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={borderImages[profile.border || 0]}
        style={styles.border}
      />
      <Image
        source={animalImages[profile.character || 0]}
        style={styles.character}
      />
      <Text style={styles.nickname}>{profile.nickname || '이름 없음'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  border: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    position: 'absolute',
  },
  character: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  nickname: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

