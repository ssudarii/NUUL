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
    image: require('../assets/thumb1.png'),
    videoId: 'abiyAQu-Pf0',
  },

  {
    id: '2',
    image: require('../assets/thumb2.png'),
    videoId: 'zKJ7915100c',
  },

  {
    id: '3',
    image: require('../assets/thumb3.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '4',
    image: require('../assets/thumb4.png'),
    videoId: '5fnEEzi_ev0',
  },

  {
    id: '5',
    image: require('../assets/thumb5.png'),
    videoId: 'CkSLkHSdJjA3',
  },

  {
    id: '6',
    image: require('../assets/thumb6.png'),
    videoId: 'fCkSLkHSdJjA',
  },

  {
    id: '7',
    image: require('../assets/thumb7.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '8',
    image: require('../assets/thumb8.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '9',
    image: require('../assets/thumb9.png'),
    videoId: 'CkSLkHSdJjA',
  },

  {
    id: '10',
    image: require('../assets/thumb10.png'),
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
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});