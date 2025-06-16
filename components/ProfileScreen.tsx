import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const borderImages = [
  require('../assets/border1.png'),
  require('../assets/border2.png'),
  require('../assets/border3.png'),
];

export default function ProfileScreen() {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>계정</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.borderWrapper}>
          {borderIndex !== null && (
            <Image source={borderImages[borderIndex]} style={styles.borderImage} />
          )}
          <Image source={require('../assets/penguin.png')} style={styles.avatar} />
        </View>
        <Text style={styles.rank}>[{badge}]</Text>
        <Text style={styles.nickname}>곰팽이</Text>
        <Text style={styles.description}>허리가 펴지는 그날까지..</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('Decorate')}>
        <Text style={styles.menuTitle}>개인정보 수정 ✏️</Text>
         </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MyList')}>
          <Text style={styles.menuTitle}>나만의 리스트 ✏️</Text>
          </TouchableOpacity>
       

        <Text style={styles.sectionTitle}>모임 관리</Text>
        <View style={styles.groupBox}>
          <Text style={styles.groupLabel}>직장인들아 하루 5분만 스트레칭하자</Text>
          <Text style={styles.leave}>모임 나가기</Text>
        </View>
        <View style={styles.groupBox}>
          <Text style={styles.groupLabel}>거북목탈각이 어려운 (14/50)</Text>
          <Text style={styles.leave}>모임 나가기</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#dff5e1',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  borderWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  borderImage: {
    position: 'absolute',
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rank: { color: '#5970f0', fontSize: 14, marginTop: 6 },
  nickname: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  description: { fontSize: 13, color: '#444', marginTop: 4 },

  menu: { paddingHorizontal: 20 },
  menuTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },

  groupBox: {
    backgroundColor: '#d8f3dc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  groupLabel: { fontSize: 14, color: '#1a452d', marginBottom: 4 },
  leave: { fontSize: 12, color: '#d11', textDecorationLine: 'underline' },
});
