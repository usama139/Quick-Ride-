import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize GoogleSignin configuration
GoogleSignin.configure({
  webClientId: '406357522661-q1eggktvoj422kprli9jf7pvjmqqk5u6.apps.googleusercontent.com', // Replace with your actual web client ID from Firebase
});

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handle regular email sign-up
  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;

      await firestore()
        .collection('Users')
        .doc(userId)
        .set({
          email: email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'User registered successfully!');
      setEmail('');
      setPassword('');
      navigation.navigate('LoginScreen'); // Navigate to Login screen after successful sign-up
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      // Ensure Google Play Services are available before proceeding
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Start Google Sign-In process
      const userInfo = await GoogleSignin.signIn(); // Sign in and get user info

      // Access the idToken and accessToken from the userInfo object
      const { idToken, accessToken } = userInfo;

      if (!idToken) {
        throw new Error('Google Sign-In failed! ID token not found');
      }

      // Create a Firebase credential with the idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

      // Sign in with the Firebase credential
      const userCredential = await auth().signInWithCredential(googleCredential);

      const userId = userCredential.user.uid;

      // Save the user's data to Firestore
      await firestore()
        .collection('Users')
        .doc(userId)
        .set({
          email: userCredential.user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Google user signed in successfully!');
      navigation.navigate('HomeScreen'); // Navigate to your main screen after sign-in
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <Text>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Text>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <View style={styles.separator} />

      

      <View style={styles.separator} />

      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  separator: {
    marginVertical: 10,
  },
  googleButton: {
    backgroundColor: '#f53939',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#ea0606',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
