import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const styles = StyleSheet.create({
  // switch header background color by alignment
  container: alignment => ({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: alignment === 'good' ? '#3498db' : '#900C3F',
  }),
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: '#F7F0EF',
    borderRadius: 15,
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
    borderRadius: 6,
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
  },
  Header: {
    display: 'flex',
    marginRight: 10,
  },
  Col: {
    flex: 1,
  },
  BTextHeader: {
    fontSize: 16,
  },
  BText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 2,
    // border
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
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
      {/* top container */}
      <View style={styles.topContainer}>
        {/* child 1 */}
        <View style={styles.horizontalContainerA}>
          {/* show placeholder if image is not present */}
          <Image
            source={
              hero.image.url
                ? {
                    uri: hero.image.url,
                  }
                : require('../assets/superhero.png')
            }
            style={styles.img}
          />
          <View style={styles.Right}>
            {/* show "unknown if name is not present" */}
            <Text style={styles.RightHeader}>
              {hero.biography['full-name']
                ? hero.biography['full-name']
                : 'Unknown'}
            </Text>

            {/* flex table */}
            <View style={styles.Holder}>
              <View style={styles.Header}>
                <Text style={styles.Col}>AKA</Text>
                <Text style={styles.Col}>Publisher</Text>
                <Text style={styles.Col}>Alignment</Text>
              </View>

              <View style={styles.Header}>
                <Text style={styles.Col}>:</Text>
                <Text style={styles.Col}>:</Text>
                <Text style={styles.Col}>:</Text>
              </View>

              <View style={styles.Header}>
                <Text style={styles.Col}>
                  {hero.name !== 'null' ? hero.name : '?'}
                </Text>
                <Text style={styles.Col}>
                  {hero.biography.publisher !== 'null'
                    ? hero.biography.publisher
                    : '?'}
                </Text>
                <Text style={styles.Col}>
                  {hero.biography.alignment !== 'null'
                    ? capitalizeFirstLetter(hero.biography.alignment)
                    : '?'}
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
                : '?'}
            </Text>
            <Text style={styles.BTextHeader}>Intelligence</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.strength !== 'null'
                ? hero.powerstats.strength
                : '?'}
            </Text>
            <Text style={styles.BTextHeader}>Strength</Text>
          </View>
          <View>
            <Text style={styles.BText}>
              {hero.powerstats.speed !== 'null' ? hero.powerstats.speed : '?'}
            </Text>
            <Text style={styles.BTextHeader}>Speed</Text>
          </View>
        </View>
      </View>
      {/* bottom container */}
      <View style={styles.bottomContainer}>
        <Text>This is bottom container</Text>
      </View>
    </View>
  );
}
