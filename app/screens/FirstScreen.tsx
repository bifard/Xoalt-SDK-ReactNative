import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { XoaltView } from '../XoaltSDK';

export const FirstScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>The Celestial Code</Text>
      <Text style={styles.author}>by Aria Solen</Text>

      <Image
        source={{
          uri: 'https://marketplace.canva.com/EAGUhHGuQOg/1/0/1003w/canva-orange-and-blue-anime-cartoon-illustrative-novel-story-book-cover-WZE2VIj5AVQ.jpg',
        }}
        style={styles.cover}
        resizeMode='cover'
      />

      <Text style={styles.heading}>Description</Text>
      <Text style={styles.paragraph}>
        The Celestial Code is a breathtaking journey through galaxies where ancient myths collide
        with futuristic science. Follow Lyra, a star-cartographer, who discovers that constellations
        are not just patterns in the sky but encrypted maps to hidden worlds. With each decoded
        star, she unlocks secrets that could reshape the destiny of humankind.
      </Text>

      <XoaltView
        width={300}
        height={250}
        prebidId={'33958'}
      />

      <Text style={styles.heading}>Highlights</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>🌌 Rich world-building with vivid star systems</Text>
        <Text style={styles.listItem}>🔮 Mystical fusion of mythology and quantum physics</Text>
        <Text style={styles.listItem}>🤝 Diverse cast of explorers bound by cosmic destiny</Text>
        <Text style={styles.listItem}>⚡ Thrilling pace mixing mystery, adventure, and wonder</Text>
      </View>

      <Text style={styles.quote}>
        "Every star is a story. Every constellation, a code. The universe is whispering—will you
        listen?"
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  cover: {
    width: 200,
    height: 300,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
  },
  list: {
    marginLeft: 10,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
