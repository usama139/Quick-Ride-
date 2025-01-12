import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavHeaderComp from '../../src/components/NavHeaderComp';

const transportOptions = [
  { type: 'Rakhshaw', image: require('../../assets/bookauto.png') },
  { type: 'Bike', image: require('../../assets/bookbike.png') },
  { type: 'Car', image: require('../../assets/bookcar.png') },
  { type: 'Taxi', image: require('../../assets/bookauto.png') },
];

const SelectTransportScreen = ({ route, navigation }) => {
  const { source, destination } = route.params; // Receive source and destination

  const handleSelectTransport = (transportType) => {
    navigation.navigate('RentRequestScreen', {
      transportType,
      source,
      destination,
    });
  };
 

  return (
    <View style={styles.container}>
      <NavHeaderComp navigation={navigation} />
      <Text style={styles.title1}>Select Transport</Text>
      <Text style={styles.title}>Select your transport</Text>
      <View style={styles.gridContainer}>
        {transportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleSelectTransport(option.type)}
          >
            <Image source={option.image} style={styles.icon} />
            <Text style={styles.cardText}>{option.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  title1: {
    fontSize: 24,
    color:'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    backgroundColor: '#d6f5d6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectTransportScreen;
