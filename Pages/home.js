import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {useQuery} from 'react-query';

import {HomeCard} from '../Components/homeCard';

// utility functions to query API
import {generateSixRandom, searchHero} from '../utils/fetchApi';

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
  },
  cardHolderContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    marginTop: 15,
  },
  cardHolder: {
    flexBasis: '46%',
    height: '25%',
  },
});

export function Home({navigation}) {
  const [superHeroName, setSuperHeroName] = useState('Find Your SuperHero');
  const [superHeroData, setSuperHeroData] = useState([]);
  const [superHeroFetchError, setSuperHeroFetchError] = useState('');

  const [isReFetching, setIsReFetching] = useState(false);

  // fetch 6 random superheroes to populate the landing page
  const {
    status: superHeroesStatus,
    data: superHeroesData,
    isFetching: isFetchingSuperHeroes,
    refetch,
  } = useQuery('superHeroes', async () => {
    const fetchData = await generateSixRandom();
    return fetchData;
  });

  // refetch on pull down
  const invalidateAndRefetch = () => {
    setIsReFetching(true);
    setSuperHeroData([]);
    setSuperHeroFetchError('');
    refetch().then(() => setIsReFetching(false));
  };

  // search one hero by name
  async function searchByName(name) {
    setIsReFetching(true);
    await searchHero(name).then(fetchData => {
      if (fetchData.response === 'success') {
        setSuperHeroFetchError('');
        if (fetchData.results.length > 6) {
          let trimmedData = fetchData.results.filter(
            (_, index) => !(index > 5),
          );
          createButtonAlert();
          setSuperHeroData(trimmedData);
          setIsReFetching(false);
          // dismiss keyboard
          Keyboard.dismiss();
          return;
        }
        setSuperHeroData(fetchData.results);
        setIsReFetching(false);
        // dismiss keyboard
        Keyboard.dismiss();
        return;
      }
      setSuperHeroFetchError(fetchData.error);
      setIsReFetching(false);
      return;
    });
    setIsReFetching(false);
    return;
  }

  // programmatically toggle-able alert
  const createButtonAlert = () =>
    Alert.alert(
      'Warning!',
      'The result set for this query is too large. Please enter a narrowed down search term. Showing only the first 6',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  // programmatically navigate to profile page
  const navigateToProfile = superHero =>
    navigation.navigate('Profile', {
      hero: superHero,
    });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                searchByName(superHeroName);
              }}>
              <Text style={styles.searchButtonText}>Q</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* 2 */}
        <View style={styles.mainContainer}>
          <View style={styles.cardHolderContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              // handle page refresh (refetch on pull down)
              refreshControl={
                <RefreshControl
                  refreshing={isReFetching}
                  onRefresh={invalidateAndRefetch}
                />
              }>
              {!isFetchingSuperHeroes ? (
                // there was an error fetching
                superHeroFetchError ? (
                  <Text>{superHeroFetchError}</Text>
                ) : superHeroData.length > 0 ? (
                  // map found superheroes
                  superHeroData.map((aSuperHero, cardIndex) => (
                    //  card
                    <View style={styles.cardHolder} key={cardIndex}>
                      <HomeCard
                        SuperHero={aSuperHero}
                        navigateToProfile={() => navigateToProfile(aSuperHero)}
                      />
                    </View>
                  ))
                ) : superHeroesStatus === 'success' ? (
                  // map random superheroes
                  superHeroesData.map((aSuperHero, cardIndex) => (
                    //  card
                    <View style={styles.cardHolder} key={cardIndex}>
                      <HomeCard
                        SuperHero={aSuperHero}
                        navigateToProfile={() => navigateToProfile(aSuperHero)}
                      />
                    </View>
                  ))
                ) : (
                  <Text>There was an error fetching. Pull down to refresh</Text>
                )
              ) : (
                !isReFetching && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
