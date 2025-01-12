import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AddressScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Blurred background */}
      <BlurView
  style={[StyleSheet.absoluteFillObject, { zIndex: -1 }]} // Set zIndex to place it behind the modal content
  blurType="light"
  blurAmount={10}
  reducedTransparencyFallbackColor="white"
/>


      {/* Main Content */}
      <View style={styles.modal}>
        {/* Header */}
        <View style={styles.header}>
          
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name="close" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Select address</Text>

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <EvilIcons name="location" size={20} color="#333" />
            <TextInput placeholder="From" style={styles.input} />
          </View>
          <View style={styles.inputBox}>
            <EvilIcons name="location" size={20} color="#333" />
            <TextInput placeholder="To" style={styles.input} />
          </View>
        </View>

        {/* Recent Places */}
        <Text style={styles.sectionTitle}>Recent places</Text>
        <FlatList
          
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recentPlace}>
              <View style={styles.placeIcon}>
                <EvilIcons name="location" size={25} color="#4CAF50" />
              </View>
              <View style={styles.placeDetails}>
                <Text style={styles.placeTitle}>{item.title}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
              </View>
              <Text style={styles.placeDistance}>{item.distance}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 150,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  recentPlace: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#e9f9ef',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeDetails: {
    flex: 1,
  },
  placeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  placeAddress: {
    fontSize: 12,
    color: '#666',
  },
  placeDistance: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default AddressScreen;
