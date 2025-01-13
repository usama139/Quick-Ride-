import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SetPasswordScreen = ({ navigation, route }) => {
  const { phone } = route.params; // Retrieve the phone number from route params
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please enter both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);

      const email = `${phone}@example.com`;

      // Check if the email already exists
      const existingUser = await auth().fetchSignInMethodsForEmail(email);

      if (existingUser.length > 0) {
        // User already exists, update Firestore data
        await firestore().collection('users').doc(phone).set(
          {
            phone,
            password,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true } // Merge to avoid overwriting existing data
        );

        Alert.alert('Success', 'Password updated successfully!');
        navigation.navigate('HomeScreen'); // Navigate to home or relevant screen
      } else {
        // Create a new user
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        // Save the user's data in Firestore
        await firestore().collection('users').doc(phone).set({
          phone,
          password,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Error setting password:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This phone number is already registered.');
      } else {
        Alert.alert('Error', 'Something went wrong while setting the password.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
        <Text style={styles.showPasswordText}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePasswordSubmit}
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
        disabled={isSubmitting}>
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
  },
  showPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  showPasswordText: {
    color: '#007bff',
  },
  submitButton: {
    backgroundColor: '#227a33',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d5dbdb',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetPasswordScreen;
