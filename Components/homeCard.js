import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  img: {
    width: '90%',
    height: '94%',
    borderRadius: 8,
    borderColor: '#000',
    alignSelf: 'center',
    marginTop: -20,
  },
  textHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 6,
  },
  heading: {
    fontSize: 15,
  },
  // change font color by alignment
  alignmentText: alignment => ({
    fontSize: 12,
    color: alignment === 'good' ? '#44BBFF' : '#900C3F',
  }),
});

export function HomeCard({SuperHero = {}, navigateToProfile = () => {}}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigateToProfile();
      }}>
      <Image
        source={
          SuperHero?.image?.url
            ? {
                uri: SuperHero.image.url,
              }
            : require('../assets/superhero.png')
        }
        style={styles.img}
      />
      <View style={styles.textHolder}>
        <Text style={styles.heading}>{SuperHero.name}</Text>
        <Text style={styles.alignmentText(SuperHero.biography.alignment)}>
          {SuperHero.biography.alignment}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
