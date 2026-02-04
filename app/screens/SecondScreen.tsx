import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { XoaltView } from '../XoaltSDK';

export function SecondScreen() {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? dark : light;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentInsetAdjustmentBehavior='automatic'
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093',
          }}
          style={styles.cover}
          resizeMode='cover'
          accessible
          accessibilityLabel='Book cover for Whispers of the Forgotten Realm'
        />

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            Whispers of the Forgotten Realm
          </Text>
          <Text style={[styles.meta, { color: colors.muted }]}>
            by <Text style={[styles.metaStrong, { color: colors.text }]}>Elara Nightwind</Text> ·
            Fantasy / Adventure · 2024
          </Text>

          <XoaltView
            width={728}
            height={90}
            prebidId={'33962'}
          />

          <Text style={[styles.sectionHeader, { color: colors.text }]}>Short Description</Text>
          <Text style={[styles.paragraph, { color: colors.text }]}>
            In a land where dreams shape reality,{' '}
            <Text style={styles.italic}>Whispers of the Forgotten Realm</Text> follows Kael, a
            wandering bard who discovers he can weave songs into magic. As forgotten gods awaken and
            shadows rise, Kael must master melodies powerful enough to heal—or destroy—the world
            itself.
          </Text>

          <Text style={[styles.sectionHeader, { color: colors.text }]}>Highlights</Text>
          <View style={styles.list}>
            {[
              '🎶 Music-based magic system never seen before',
              '🗺️ Vast realms filled with shifting landscapes',
              '⚔️ Epic clashes between gods and mortals',
              '❤️ A journey balancing sacrifice, hope, and love',
            ].map((item, i) => (
              <Text
                key={i}
                style={[styles.listItem, { color: colors.text }]}
              >
                • {item}
              </Text>
            ))}
          </View>

          <Text style={[styles.quote, { color: colors.text }]}>
            “Every note you sing carries the power to mend—or to shatter—the soul of a world long
            asleep.”
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const light = {
  bg: '#FFFFFF',
  card: '#F8F9FB',
  border: '#E6E8EB',
  text: '#0B1221',
  muted: '#5A667A',
};

const dark = {
  bg: '#0B1221',
  card: '#121a2b',
  border: '#233049',
  text: '#EAF0FF',
  muted: '#94A3B8',
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: light.border,
    backgroundColor: light.card,
    overflow: 'hidden',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cover: { width: '100%', height: 260 },
  content: { padding: 0 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  meta: { fontSize: 13, marginBottom: 12 },
  metaStrong: { fontWeight: '600' },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  paragraph: { fontSize: 15, lineHeight: 22 },
  list: { marginTop: 4, marginBottom: 12 },
  listItem: { fontSize: 15, lineHeight: 22, marginVertical: 2 },
  italic: { fontStyle: 'italic' },
  quote: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
