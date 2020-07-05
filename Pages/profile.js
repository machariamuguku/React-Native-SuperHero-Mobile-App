import React from 'react';
import {View, Text} from 'react-native';

export function Profile({route}) {
  const {data} = route.params;
  return (
    <View>
      <Text>This is {data.name} profile page</Text>
    </View>
  );
}
