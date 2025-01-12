import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/welcome.png')} // Replace with your actual image path
          style={styles.image}
        />
      </View>

      {/* Text content */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Have a better sharing experience</Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.createAccountButtonText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LoginPage')}
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 400, // Adjust as needed to fit your design
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 30,
  },
  createAccountButton: {
    backgroundColor: '#227a33',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 15,
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#227a33',
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#227a33',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
