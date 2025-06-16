// components/ExploreScreen.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ExploreStackParamList = {
  ExploreHome: undefined;
  VideoPlayer: { videoId: string };
};

const windowWidth = Dimensions.get('window').width;
const CARD_SIZE = (windowWidth - 24) / 2; // padding: 8 + 간격: 8 기준

const items = [
   {
    id: '1',
    title: '허리통증 완화',
    image: require('../assets/thumb1.png'),
    videoId: 'abiyAQu-Pf0',
  },

  {
    id: '2',
    title: '거북목 스트레칭',
    image: require('../assets/thumb2.png'),
    videoId: 'zKJ7915100c',
  },

  {
    id: '3',
    title: '어깨 통증 풀기',
    image: require('../assets/thumb3.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '4',
    title: '앉아서 하는 스트레칭',
    image: require('../assets/thumb4.png'),
    videoId: '5fnEEzi_ev0',
  },

  {
    id: '5',
    title: '손목 이완 스트레칭',
    image: require('../assets/thumb2.png'),
    videoId: 'CkSLkHSdJjA3',
  },

  {
    id: '6',
    title: '전신 스트레칭 루틴',
    image: require('../assets/thumb3.png'),
    videoId: 'fCkSLkHSdJjA',
  },

  {
    id: '7',
    title: '골반 교정 스트레칭',
    image: require('../assets/thumb1.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '8',
    title: '아침 기상 스트레칭',
    image: require('../assets/thumb5.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '9',
    title: '장시간 앉은 자세 해소',
    image: require('../assets/thumb4.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '10',
    title: '수면 전 릴렉스 루틴',
    image: require('../assets/thumb2.png'),
    videoId: 'CkSLkHSdJjA',
  },

];

export default function ExploreScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<ExploreStackParamList>>();

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card]}
            onPress={() => navigation.navigate('VideoPlayer', { videoId: item.videoId })}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={styles.overlay}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});