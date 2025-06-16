// components/VideoPlayerScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const VideoPlayerScreen = () => {
  const route = useRoute();
  const { videoId } = route.params as { videoId: string };
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <View style={styles.container}>
      <WebView source={{ uri: embedUrl }} allowsFullscreenVideo />
      
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => setIsLiked((prev) => !prev)}>
          <FontAwesome
            name={isLiked ? 'heart' : 'heart-o'}
            size={24}
            color={isLiked ? 'red' : '#999'}
            style={styles.icon}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsBookmarked((prev) => !prev)}>
          <FontAwesome
            name={isBookmarked ? 'star' : 'star-o'}
            size={24}
            color={isBookmarked ? '#FFD700' : '#333'}
            style={styles.icon}
        />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 12,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 16,
  },
});

export default VideoPlayerScreen;
