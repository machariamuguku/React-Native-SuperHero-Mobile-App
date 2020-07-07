import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Sample} from '../sample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInputContainer: {
    flex: 3,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    height: 50,
  },
  searchButtonContainer: {
    flex: 1,
    marginRight: 10,
    height: 45,
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#900C3F',
    borderRadius: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  mainContainer: {
    flex: 5,
  },
});

export function Home({navigation}) {
  const [superHeroValue, setSuperHeroValue] = useState('Find Your SuperHero');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.TextInputContainer}>
          <TextInput
            onChangeText={text => setSuperHeroValue(text)}
            value={superHeroValue}
          />
        </View>

        <View style={styles.searchButtonContainer}>
          {/* Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              navigation.navigate('Profile', {
                hero: Sample,
              });
            }}>
            <Text style={styles.searchButtonText}>Q</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      {/* 2 */}
      <View style={styles.mainContainer} />
    </View>
  );
}
