import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DecorateScreen() {
  const [selectedBorder, setSelectedBorder] = useState<number | null>(0);
  const [selectedBadge, setSelectedBadge] = useState<string>('꾸준함 장인');

  const borders = [
    require('../assets/border1.png'),
    require('../assets/border2.png'),
    require('../assets/border3.png'),
  ];

  const badges = ['꾸준함 장인', '야행성 스트레쳐', '스트레칭 새싹'];

  // 저장 함수
  const saveBorder = async (index: number) => {
    try {
      await AsyncStorage.setItem('selectedBorderIndex', index.toString());
      setSelectedBorder(index);
    } catch (e) {
      console.error('테두리 저장 실패:', e);
    }
  };

  const saveBadge = async (badge: string) => {
    try {
      await AsyncStorage.setItem('selectedBadge', badge);
      setSelectedBadge(badge);
    } catch (e) {
      console.error('칭호 저장 실패:', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>계정</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={require('../assets/penguin.png')} style={styles.avatar} />
        <Text style={styles.rank}>[{selectedBadge}]</Text>
        <Text style={styles.nickname}>곰팽이</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>테두리 ✏️</Text>
        <View style={styles.borderList}>
          {borders.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => saveBorder(index)}>
              <View style={styles.borderWrapper}>
                <Image
                  source={img}
                  style={[
                    styles.border,
                    selectedBorder === index && styles.selectedBorder,
                  ]}
                />
                {selectedBorder === index && (
                  <View style={styles.checkOverlay}>
                    <Text style={styles.checkText}>✅</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>칭호 ✏️</Text>
        <View style={styles.badgeList}>
          {badges.map((badge) => (
            <TouchableOpacity key={badge} onPress={() => saveBadge(badge)}>
              <Text
                style={[
                  styles.badge,
                  selectedBadge === badge && styles.selectedBadge,
                ]}
              >
                {badge}
              </Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 20,
  },
  avatar: { width: 120, height: 120, resizeMode: 'contain' },
  rank: { color: '#5970f0', fontSize: 14, marginTop: 6 },
  nickname: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  section: { marginTop: 30, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  borderList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  borderWrapper: {
    position: 'relative',
    marginHorizontal: 5,
  },
  border: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  selectedBorder: {
    borderWidth: 3,
    borderColor: '#78c2ad',
    borderRadius: 10,
  },
  checkOverlay: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 2,
  },
  checkText: {
    fontSize: 16,
  },

  badgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#e6e8ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 13,
    marginBottom: 8,
    marginRight: 8,
  },
  selectedBadge: {
    backgroundColor: '#a9bfff',
    fontWeight: 'bold',
  },
});
