import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getDistance } from 'geolib';
import NavHeaderComp from '../../src/components/NavHeaderComp';

const RentRequestScreen = ({ route, navigation }) => {
  const { transportType, source, destination } = route.params; // Receive params
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    if (source && destination) {
      const calculatedDistance = getDistance(source, destination); // Calculate distance
      setDistance(calculatedDistance);

      // Calculate price based on distance
      if (calculatedDistance <= 500) setPrice(100);
      else if (calculatedDistance <= 1000) setPrice(200);
      else setPrice(300 + (calculatedDistance - 1000) * 0.1); // Add extra charges for longer distances
    }
  }, [source, destination]);

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NavHeaderComp navigation={navigation} />
        <Text style={styles.header}>Request for Rent</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.value}>
            {source ? `${source.latitude}, ${source.longitude}` : 'N/A'}
          </Text>
          <Text style={styles.label}>Destination</Text>
          <Text style={styles.value}>
            {destination ? `${destination.latitude}, ${destination.longitude}` : 'N/A'}
          </Text>
          <Text style={styles.distance}>
            Distance: {(distance / 1000).toFixed(2)} km
          </Text>
        </View>

        <View style={styles.transportContainer}>
          <Text style={styles.label}>{transportType}</Text>
          <Image
            source={
              transportType === 'Bike'
                ? require('../../assets/bookbike.png')
                : transportType === 'Car'
                ? require('../../assets/bookcar.png')
                : require('../../assets/bookauto.png')
            }
            style={styles.transportImage}
          />
          <Text style={styles.price}>Price: Rs {price.toFixed(2)}</Text>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.label}>Select Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'Cash' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelection('Cash')}
          >
            <Image
              source={require('../../assets/cash.jpg')}
              style={styles.paymentIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Cash</Text>
              <Text style={styles.paymentSubtitle}>Pay with cash</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'EasyPaisa' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelection('EasyPaisa')}
          >
            <Image
              source={require('../../assets/easypaisa.png')}
              style={styles.paymentIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>EasyPaisa</Text>
              <Text style={styles.paymentSubtitle}>1234 **** **** 5678</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'JazzCash' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelection('JazzCash')}
          >
            <Image
              source={require('../../assets/jazz.png')}
              style={styles.paymentIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>JazzCash</Text>
              <Text style={styles.paymentSubtitle}>user@jazzcash.com</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'Bank Card' && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelection('Bank Card')}
          >
            <Image
              source={require('../../assets/bank.jpg')}
              style={styles.paymentIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Visa</Text>
              <Text style={styles.paymentSubtitle}>1234 **** **** 5678</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            Alert.alert(
              'Ride Confirmed',
              `You chose ${transportType} with payment method: ${selectedPaymentMethod}`
            )
          }
        >
          <Text style={styles.confirmText}>Confirm Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  distance: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  transportContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  transportImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentContainer: {
    marginVertical: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  confirmButton: {
    backgroundColor: '#20a103',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RentRequestScreen;