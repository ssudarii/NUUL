// GroupActivityScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const animalImages = [
  require('../assets/penguin.png'),
  require('../assets/turtle.png'),
  require('../assets/meerkat.png'),
];

export default function GroupActivityScreen() {
  const route = useRoute();
  const { groupName, posts, activeMembers } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{groupName}</Text>
      <Text style={styles.subtitle}>오늘의 스트레칭은 하셨나요?</Text>

      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          <Image source={post.image} style={styles.postImage} />
        </View>
      ))}

      <Text style={styles.memberTitle}>활동 중 ..</Text>
      <FlatList
        data={activeMembers}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.memberGrid}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Image
              source={item.avatar || animalImages[0]}
              style={styles.memberAvatar}
            />
            <Text style={styles.memberName}>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0fff5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 16 },
  postCard: {
    backgroundColor: '#dff0e0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  date: { fontSize: 12, color: '#333', marginBottom: 4 },
  postTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  postDescription: { fontSize: 14, marginBottom: 8 },
  postImage: { width: '100%', height: 140, resizeMode: 'contain' },
  memberTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 12 },
  memberGrid: { alignItems: 'center' },
  memberItem: { alignItems: 'center', margin: 8 },
  memberAvatar: { width: 60, height: 60, resizeMode: 'contain' },
  memberName: { fontSize: 13, marginTop: 4 },
});
