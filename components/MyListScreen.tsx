import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

export default function MyListScreen() {
  const favoriteList = [
    {
      id: '1',
      title: '승모근 스트레칭',
      category: '목/어깨 스트레칭',
      image: require('../assets/thumb1.png'),
      url: 'https://youtu.be/I81IixZqFKY?si=TiemiXKlyMw6ZBGt',
    },
    {
      id: '2',
      title: '스트레칭 간단하게',
      category: '허리 스트레칭',
      image: require('../assets/thumb2.png'),
      url: 'https://youtu.be/jJJiR7nNeqQ?si=_GCvwRB10pHQj-JZ',
    },
  ];

  const likedList = [
    {
      id: '3',
      title: '스트레칭 시간입니다!',
      category: '전신 스트레칭',
      image: require('../assets/thumb3.png'),
      url: 'https://youtu.be/X2s3RZR8lPI?si=4zya5pP5YTe8f6-f',
    },
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>나만의 리스트</Text>

      <Text style={styles.sectionTitle}>⭐ 즐겨찾기</Text>
      {favoriteList.map((video) => (
        <TouchableOpacity key={video.id} style={styles.card} onPress={() => openLink(video.url)}>
          <Image source={video.image} style={styles.thumbnail} />
          <View style={styles.cardText}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoCategory}>{video.category}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>♡ 좋아요</Text>
      {likedList.map((video) => (
        <TouchableOpacity key={video.id} style={styles.card} onPress={() => openLink(video.url)}>
          <Image source={video.image} style={styles.thumbnail} />
          <View style={styles.cardText}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoCategory}>{video.category}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#eef5ff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  cardText: {
    padding: 10,
    justifyContent: 'center',
  },
  videoTitle: { fontSize: 16, fontWeight: 'bold' },
  videoCategory: { fontSize: 13, color: '#555' },
});
