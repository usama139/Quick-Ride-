import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavHeaderComp from '../../src/components/NavHeaderComp';
const FavouriteScreen = ({navigation}) => {
  const [favourites, setFavourites] = useState([
    { id: 1, type: 'Office', address: '2972 Westheimer Rd, Santa Ana, IL 85486' },
    { id: 2, type: 'Home', address: '123 Main St, Springfield, IL 62704' },
    { id: 3, type: 'House', address: '789 Elm St, Chicago, IL 60614' },
    { id: 4, type: 'Office', address: '2972 Westheimer Rd, Santa Ana, IL 85486' },
    { id: 5, type: 'Home', address: '456 Pine St, Naperville, IL 60540' },
  ]);

  const handleDelete = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <NavHeaderComp navigation={navigation} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {favourites.map((favourite) => (
          <View key={favourite.id} style={styles.listItem}>
            <View style={styles.details}>
              <Text style={styles.type}>{favourite.type}</Text>
              <Text style={styles.address}>{favourite.address}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(favourite.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9f4',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b5e20',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  details: {
    flex: 1,
    marginRight: 10,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  address: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default FavouriteScreen;
