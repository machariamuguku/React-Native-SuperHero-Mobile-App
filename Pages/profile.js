import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  // switch header background color by character alignment
  container: alignment => ({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: alignment === 'good' ? '#44BBFF' : '#900C3F',
  }),
  topContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    top: 50,
    left: 10,
    right: 10,
    height: 155,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  horizontalContainerA: {
    flex: 2,
    flexDirection: 'row',
  },
  horizontalContainerB: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: -25,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
  Right: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  RightHeader: {
    fontSize: 25,
  },
  Holder: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  Header: {
    display: 'flex',
    marginRight: 5,
  },
  Content: {
    maxWidth: 220,
  },
  BTextHeader: {
    fontSize: 16,
  },
  BText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    marginTop: 110,
    zIndex: -1,
    backgroundColor: '#e2e2e2',
  },
  bottomChild: {
    marginTop: 115,
    backgroundColor: '#ecf0f1',
    marginHorizontal: 10,
    borderRadius: 7,
    flex: 1,
  },
  bottomScrollView: {
    flex: 1,
    marginBottom: 10,
  },
  bottomCard: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  bottomHeader: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomCardHolder: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export function Profile({route}) {
  // de-structure hero
  const {hero} = route.params;

  // returns sentence case
  const capitalizeFirstLetter = sentence =>
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  return (
    // switch header color by alignment
    <View style={styles.container(hero.biography.alignment)}>
      <View style={styles.topContainer}>
        <View style={styles.horizontalContainerA}>
          {/* show placeholder if image is not present */}
          <Image
            source={
              hero?.image?.url
                ? {
                    uri: hero.image.url,
                  }
                : require('../assets/superhero.png')
            }
            style={styles.img}
          />
          <View style={styles.Right}>
            {/* show "unknown if name is not given" */}
            <Text style={styles.RightHeader}>
              {hero.biography['full-name'] ? hero.biography['full-name'] : '-'}
            </Text>

            {/* flex table */}
            <View style={styles.Holder}>
              <View style={styles.Header}>
                <Text>Name</Text>
                <Text>Publisher</Text>
                <Text>Alignment</Text>
              </View>

              <View style={styles.Header}>
                <Text>:</Text>
                <Text>:</Text>
                <Text>:</Text>
              </View>

              <View style={styles.Header}>
                <Text>{hero.name !== 'null' ? hero.name : '-'}</Text>
                <Text>
                  {hero.biography.publisher !== 'null'
                    ? hero.biography.publisher
                    : '-'}
                </Text>
                <Text>
                  {hero.biography.alignment !== 'null'
                    ? capitalizeFirstLetter(hero.biography.alignment)
                    : '-'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* child 2 */}
        {/* show ? if subsequent detail is not present */}
        <View style={styles.horizontalContainerB}>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.intelligence !== 'null'
                ? hero.powerstats.intelligence
                : '-'}
            </Text>
            <Text style={styles.BTextHeader}>Intelligence</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.strength !== 'null'
                ? hero.powerstats.strength
                : '-'}
            </Text>
            <Text style={styles.BTextHeader}>Strength</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.speed !== 'null' ? hero.powerstats.speed : '-'}
            </Text>
            <Text style={styles.BTextHeader}>Speed</Text>
          </View>
        </View>
      </View>
      {/* bottom container */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomChild}>
          <ScrollView style={styles.bottomScrollView}>
            {/* card */}
            {Object.keys(hero).map((heroObjectKey, index) => {
              // copy hero object to avoid mutating origin
              let newHeroObject = {...hero};

              // re-assign the 'name' object key to an object
              // to map object rather than string later
              if (heroObjectKey === 'name') {
                newHeroObject[heroObjectKey] = {
                  name: newHeroObject[heroObjectKey],
                };
              }
              return (
                // don't map the 'response', and 'id' object keys
                // they are not needed and are strings not objects
                heroObjectKey !== 'response' &&
                heroObjectKey !== 'id' && (
                  <View style={styles.bottomCard} key={index}>
                    {/* card header */}
                    <Text style={styles.bottomHeader}>
                      {capitalizeFirstLetter(heroObjectKey)}
                    </Text>

                    {/* get key-value pairs from nested hero objects */}
                    {Object.entries(newHeroObject[heroObjectKey]).map(
                      ([key, entryValue], entriesIndex) => (
                        // flex table
                        <View
                          style={styles.bottomCardHolder}
                          key={entriesIndex}>
                          {/* left side */}
                          <View style={styles.Header}>
                            <Text>{`${capitalizeFirstLetter(key)}:`}</Text>
                          </View>

                          {/* right side */}
                          <View style={styles.Content}>
                            <Text>
                              {/* if the value is an array, map and separate */}
                              {entryValue && typeof entryValue === 'object'
                                ? entryValue.map(
                                    (values, entryValueIndex) =>
                                      `${values}${
                                        entryValueIndex < entryValue.length - 1
                                          ? ' / '
                                          : ''
                                      }`,
                                  )
                                : entryValue !== 'null'
                                ? entryValue
                                : '-'}
                            </Text>
                          </View>
                        </View>
                      ),
                    )}
                  </View>
                )
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
