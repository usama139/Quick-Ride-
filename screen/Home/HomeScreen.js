import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
const GOOGLE_API_KEY = 'AIzaSyD3UP7y4tygN97ZqM8xrvgueqnv1mgivNw';
export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isChoosingSource, setIsChoosingSource] = useState(false);
  const [isChoosingDestination, setIsChoosingDestination] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const mapRef = useRef(null);

  const defaultLocation = {
    latitude: 25.5065,
    longitude: 69.0136,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigation = useNavigation();
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      },
      error => {
        Alert.alert(
          'Error',
          `Failed to get your location: ${error.message}` +
            ' Make sure your location is enabled.',
        );
        setLocation(defaultLocation);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
            setLocation(defaultLocation);
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setLocation(defaultLocation);
          setLoading(false);
        }
      } else {
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);
  useEffect(() => {
    if (destination && !source && location) {
      setSource(location); // Auto-assign current location as source if no source is set
    }
    if (source && destination) {
      setConfirmVisible(true);
    } else {
      setConfirmVisible(false);
    }
  }, [source, destination, location]);

  const handleMapPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    if (isChoosingSource) {
      setSource(coordinate);
      setIsChoosingSource(false);
    } else if (isChoosingDestination) {
      setDestination(coordinate);
      setIsChoosingDestination(false);
    }
    if (source && destination) {
      setConfirmVisible(true);
    }
  };

  const showCoordinates = () => {
    if (source && destination) {
      const distance =
        getDistance(
          {latitude: source.latitude, longitude: source.longitude},
          {latitude: destination.latitude, longitude: destination.longitude},
        ) / 1000; // Convert to kilometers
      Alert.alert(
        'Coordinates and Distance',
        `Source: \nLatitude: ${source.latitude}, Longitude: ${
          source.longitude
        }\n\nDestination: \nLatitude: ${destination.latitude}, Longitude: ${
          destination.longitude
        }\n\nDistance between source and destination: ${distance.toFixed(
          2,
        )} kilometers`,
      );
    } else {
      Alert.alert(
        'Error',
        'Please select both source and destination coordinates.',
      );
    }
  };

  const removeSource = () => {
    setSource(null);
  };

  const removeDestination = () => {
    setDestination(null);
  };

  const zoomToMarker = marker => {
    if (mapRef.current && marker) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };
  const handleSelectPlace = (details) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSelectedLocation(details.name);
      setSearchModalVisible(false);
    } else {
      const errorMessage = 'Details or geometry missing in selected place.';
      alert('Location details not found. Please try again.');
      console.error(errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            region={location}
            onPress={handleMapPress}>
            {/* Render default markers */}
            <Marker coordinate={location} />
            {/* Render main markers */}
            {source && (
              <Marker
                coordinate={source}
                title={'Source'}
                description={'Your source location'}
                pinColor={'green'}
                onPress={() => zoomToMarker(source)}
              />
            )}
            {destination && (
              <Marker
                coordinate={destination}
                title={'Destination'}
                description={'Your destination location'}
                pinColor={'blue'}
                onPress={() => zoomToMarker(destination)}
              />
            )}
            {source && destination && (
              <Polyline
                coordinates={[source, destination]}
                strokeColor="#000"
                strokeWidth={2}
              />
            )}
            
          </MapView>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonGroup}>
            {source ? (
                <TouchableOpacity style={styles.gradientButton} onPress={() => setSource(null)}>
                  <LinearGradient
                    colors={['#85d895', '#4CAF50']}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>Remove Source</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.gradientButton}
                  onPress={() => setIsChoosingSource(true)}
                >
                  <LinearGradient
                    colors={['#85d895', '#4CAF50']}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>
                      {isChoosingSource ? 'Choosing Source' : 'Set Source'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
             {destination ? (
                <TouchableOpacity style={styles.gradientButton} onPress={() => setDestination(null)}>
                  <LinearGradient
                    colors={['#85d895', '#4CAF50']}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>Remove Destination</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.gradientButton}
                  onPress={() => setIsChoosingDestination(true)}
                >
                  <LinearGradient
                    colors={['#85d895', '#4CAF50']}
                    style={styles.gradient}
                  >
                    <Text style={styles.buttonText}>
                      {isChoosingDestination ? 'Choosing Destination' : 'Set Destination'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              {confirmVisible && (
              <TouchableOpacity
                style={[styles.confirmButton, { position: 'absolute', top: -60, alignSelf: 'center' }]}
                onPress={() => navigation.navigate('SelectTransportScreen',{
             
                source: source,
                destination: destination,})}
                
              >
                <LinearGradient
                  colors={['#4CAF50', '#2E7D32']}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            </View>
           
          </View>
        </>
      )}
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuIcon}>
        <EvilIcons name="navicon" size={30} color="#333" />
      </TouchableOpacity>

      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('NotificationContainer')}>
        <EvilIcons name="bell" size={30} color="#333" />
      </TouchableOpacity>

      {/* Search Box with Gradient */}
      <LinearGradient
        colors={['#85d895', '#aee6bb', '#85d895']}
        style={styles.controlContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.searchBox} onPress={() => setSearchModalVisible(true)}>
          <Text style={styles.input}>
            {selectedLocation || 'Where would you go?'}
          </Text>
          <EvilIcons name="search" size={25} color="#999" style={{ marginHorizontal: 10 }} />
          <EvilIcons name="heart" size={25} color="#999" />
        </TouchableOpacity>
      </LinearGradient>
       {/* Bottom Navigation */}
       <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <EvilIcons name="location" size={30} color="#34c759" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FavouriteScreen')}>
          <EvilIcons name="heart" size={30} color="#999" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.navButtonActive}
  onPress={() => {
    if (source && destination) {
      const distance =
        getDistance(
          { latitude: source.latitude, longitude: source.longitude },
          { latitude: destination.latitude, longitude: destination.longitude },
        ) / 1000; // Convert to kilometers
      Alert.alert(
        'Coordinates and Distance',
        `Source: \nLatitude: ${source.latitude}, Longitude: ${source.longitude}\n\nDestination: \nLatitude: ${destination.latitude}, Longitude: ${destination.longitude}\n\nDistance between source and destination: ${distance.toFixed(2)} kilometers`,
      );
    } else {
      Alert.alert(
        'Error',
        'Please select both source and destination coordinates.',
      );
    }
  }}
>
  <EvilIcons name="credit-card" size={30} color="white" />
  <Text style={styles.navTextActiveWhite}>Details</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('OfferScreen')}>
          <EvilIcons name="trophy" size={30} color="#999" />
          <Text style={styles.navText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <EvilIcons name="user" size={30} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

       <Modal
        visible={searchModalVisible}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Search Location</Text>
          <GooglePlacesAutocomplete
            placeholder="Search for a location"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => {
              handleSelectPlace(details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'en',
            }}
            styles={{
              textInput: styles.modalInput,
              listView: styles.placesListView,
            }}
            enablePoweredByContainer={false}
          />
          <TouchableOpacity style={styles.closeModal} onPress={() => setSearchModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gradientButton: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  confirmButton: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 10,
    position: 'relative',
    bottom:70,
    right: 120,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  menuIcon: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 7,
  },
  controlContainer: {
    position: 'absolute',
    top: 560,
    left: 20,
    right: 20,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '100%', // Adjusted to fit within controlContainer
    marginBottom: 4,
    
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navButton: { alignItems: 'center' },
  navButtonActive: {
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 150,
    padding: 10,
    width: 70,
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    bottom: 37,
    transform: [{ translateX: -35 }], // Center the active button
  },
  navText: { color: '#999' },
  navTextActive: { color: '#34c759' },
  navTextActiveWhite: { color: 'white' },
  modalContainer: { flex: 1, backgroundColor: 'white', padding: 20 },
  modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  placesListView: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeModal: { alignSelf: 'center', marginTop: 20 },
  closeText: { color: 'blue', fontSize: 16 },
});