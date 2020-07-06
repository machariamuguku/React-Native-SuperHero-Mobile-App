import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 2,
  },
  title: {
    fontSize: 20,
  },
});
export function LogoTitle({children}) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/512x512.png')} />
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
