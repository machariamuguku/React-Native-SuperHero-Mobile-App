import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Sample} from '../sample';
import {HomeCard} from '../Components/homeCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  TextInputContainer: {
    flex: 4,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    height: 40,
    backgroundColor: '#e2e2e2',
  },
  searchButtonContainer: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
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
  mainContainer: {
    flex: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  cardHolderContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    marginTop: 20,
  },
  cardHolder: {
    width: '46%',
    height: '26%',
  },
});

export function Home({navigation}) {
  const [superHeroes, setSuperHeroes] = useState([
    Sample,
    Sample,
    Sample,
    Sample,
    Sample,
    Sample,
  ]);
  const [superHeroName, setSuperHeroName] = useState('Find Your SuperHero');

  const navigateToProfile = superHero =>
    navigation.navigate('Profile', {
      hero: superHero,
    });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.TextInputContainer}>
          <TextInput
            onChangeText={text => setSuperHeroName(text)}
            value={superHeroName}
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
      {/* 2 */}
      <View style={styles.mainContainer}>
        <View style={styles.cardHolderContainer}>
          {/* map superheroes */}
          {superHeroes.map((aSuperHero, cardIndex) => (
            //  card
            <View style={styles.cardHolder} key={cardIndex}>
              <HomeCard
                SuperHero={aSuperHero}
                navigateToProfile={() => navigateToProfile(aSuperHero)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
