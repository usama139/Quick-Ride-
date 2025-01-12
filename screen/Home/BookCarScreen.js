import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BookCarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.skip} onPress={() => navigation.navigate('LoginPage')}>Skip</Text>
      <Image source={require('../../assets/book.png')} style={styles.image} />
      <Text style={styles.title}>Book your car</Text>
      <Text style={styles.description}>
        Sell houses easily with the help of Listenoryx and to make this line big I am writing more.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  skip: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default BookCarScreen;
