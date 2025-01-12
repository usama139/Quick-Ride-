import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavHeaderComp from '../../src/components/NavHeaderComp';
const OfferScreen = ({navigation}) => {
  const [offers, setOffers] = useState([
    { discount: '15%', description: 'Black Friday', collected: false },
    { discount: '5%', description: 'Christmas', collected: false },
    { discount: '15%', description: 'Happy New Year', collected: false },
    { discount: '10%', description: 'Summer Sale', collected: false },
    { discount: '20%', description: 'Festive Offer', collected: false },
  ]);

  const handleCollect = (index) => {
    const updatedOffers = [...offers];
    updatedOffers[index].collected = true;
    setOffers(updatedOffers);
  };

  return (
    <View style={styles.container}>
      <NavHeaderComp navigation={navigation} />
      <Text style={styles.header}>Exclusive Offers</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {offers.map((offer, index) => (
          <View key={index} style={styles.offerItem}>
            <View style={styles.offerDetails}>
              <Text style={styles.discount}>{offer.discount}</Text>
              <Text style={styles.description}>{offer.description}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.collectButton,
                offer.collected ? styles.collectedButton : null,
              ]}
              onPress={() => handleCollect(index)}
              disabled={offer.collected}
            >
              <Text
                style={[
                  styles.collectButtonText,
                  offer.collected ? styles.collectedText : null,
                ]}
              >
                {offer.collected ? 'Collected' : 'Collect'}
              </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b5e20',
    textAlign: 'center',
    marginBottom: 20,
  },
  offerItem: {
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
  offerDetails: {
    flex: 1,
  },
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  description: {
    fontSize: 16,
    color: '#4caf50',
    marginTop: 5,
  },
  collectButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#388e3c',
    borderRadius: 8,
  },
  collectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  collectedButton: {
    backgroundColor: '#e0e0e0',
  },
  collectedText: {
    color: '#9e9e9e',
  },
});

export default OfferScreen;
