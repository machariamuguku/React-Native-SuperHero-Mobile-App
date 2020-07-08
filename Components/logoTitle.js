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
    width: 42,
    height: 42,
    marginRight: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export function LogoTitle({children}) {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/app_logo.png')} />
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
