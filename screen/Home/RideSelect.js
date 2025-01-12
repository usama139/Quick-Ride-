import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RideSelect = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select your transport</Text>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/bookcar.png')}
            resizeMode="contain" 
            style={styles.icon}
          />
          <Text style={styles.label}>Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/bookbike.png')}
            resizeMode="contain" 
            style={styles.icon}
          />
          <Text style={styles.label}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={require('../../assets/bookauto.png')}
            resizeMode="contain" 
            style={styles.icon}
          />
          <Text style={styles.label}>Cycle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{ uri: 'https://img.icons8.com/taxi' }} // Replace with the actual taxi icon URL or local file path
            style={styles.icon}
          />
          <Text style={styles.label}>Taxi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2b2b7d', // Custom color to match the text style in the image
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '40%',
    height: 120,
    backgroundColor: '#e0f7f7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#b2d8d8',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#444',
  },
});

export default RideSelect;
