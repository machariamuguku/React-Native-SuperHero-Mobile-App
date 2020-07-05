import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import {Sample} from '../sample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Profile', {
            hero: Sample,
          });
        }}
      />
    </View>
  );
}
