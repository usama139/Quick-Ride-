import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ThankYouScreen = ({ route, navigation }) => {
  const { driverName = 'Driver Name', vehicleNumber = 'Vehicle Number' } = route.params || {}; // Fallback values

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/thankyou.jpg')} // Add your checkmark image here
          style={styles.icon}
        />
        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.subtitle}>
          Your booking has been placed and sent to {driverName}
        </Text>
        <Text style={styles.subtitle}>Vehicle: {vehicleNumber}</Text>
      </View>
      <TouchableOpacity
  style={styles.confirmButton}
  onPress={() =>
    navigation.navigate('DriverDetailsScreen', {
      driverName: route.params.driverName, // Pass driver name
      vehicleNumber: route.params.vehicleNumber, // Pass vehicle number
      paymentMethod: route.params.paymentMethod, // Pass payment method
      fare: route.params.fare, // Pass fare
      source: route.params.source, // Pass source
      destination: route.params.destination, // Pass destination
    })
  }
>
  <Text style={styles.buttonText}>Done</Text>
</TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  confirmButton: {
    backgroundColor: '#20a103',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ThankYouScreen;
