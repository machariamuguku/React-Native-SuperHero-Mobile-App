import React from 'react';
import {View, Text, Button} from 'react-native';

export function Home({navigation}) {
  return (
    <View>
      <Text>This is home</Text>
      <Button
        title="Go to john's profile"
        onPress={() => {
          navigation.navigate('Profile', {
            data: {
              name: 'john',
            },
          });
        }}
      />
    </View>
  );
}
