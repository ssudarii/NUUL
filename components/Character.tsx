// components/Character.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface CharacterProps {
  type: 'penguin' | 'meerkat' | 'turtle';
}

export default function Character({ type }: CharacterProps) {
  const characterImages = {
    penguin: require('../assets/penguin.png'),
    meerkat: require('../assets/meerkat.png'),
    turtle: require('../assets/turtle.png'),
  };

  return (
    <View style={styles.container}>
      <Image source={characterImages[type]} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 500,
    height: 500,
  },
});
