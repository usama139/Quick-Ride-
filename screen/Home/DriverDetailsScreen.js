import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import EvilIcons from 'react-native-vector-icons/EvilIcons'; // Import EvilIcons

const DriverDetailsScreen = ({ route, navigation }) => {
  const { driverName, vehicleNumber, paymentMethod, fare, source, destination } = route.params;

  if (!source || !destination) {
    Alert.alert('Error', 'Source or Destination is not defined.');
    navigation.goBack(); // Navigate back to the previous screen
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')} // Navigate to HomeScreen
      >
        <EvilIcons name="arrow-left" size={30} color="#333" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: source.latitude,
          longitude: source.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={source}
          title="Source"
          description="Your starting location"
          pinColor="green"
        />
        <Marker
          coordinate={destination}
          title="Destination"
          description="Your destination location"
          pinColor="blue"
        />
        <Polyline
          coordinates={[source, destination]}
          strokeColor="#0000FF"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.driverText}>Your driver is arriving shortly!</Text>
        <Text style={styles.driverName}>{driverName}</Text>
        <Text style={styles.driverVehicle}>Vehicle: {vehicleNumber}</Text>
        <Text style={styles.paymentMethod}>Payment Method: {paymentMethod}</Text>
        <Text style={styles.fare}>Fare: Rs {fare.toFixed(2)}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                driverName, // Pass driver name to ChatScreen
              })
            }
          >
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  driverText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverVehicle: {
    fontSize: 14,
    color: '#555',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#555',
  },
  fare: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  messageButton: {
    backgroundColor: '#20a103',
    padding: 15,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverDetailsScreen;
