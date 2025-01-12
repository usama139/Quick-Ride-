import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MainApp() {
  return (
    <View style={styles.mainAppContainer}>
      <Text>Welcome to the Main App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainAppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
