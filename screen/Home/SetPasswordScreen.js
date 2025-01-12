import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

      // Create a new user with email and password if no user is signed in
      const email = `${phone}@example.com`; // You can use phone or other data as the email
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Now save the user's phone number and other details to Firestore
      await firestore().collection('users').doc(phone).set({
        phone,
        password,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Navigate to the next screen (or confirmation screen)
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('HomeScreen'); // Replace with your actual screen name after password set

    } catch (error) {
      console.error('Error setting password:', error);
      Alert.alert('Error', 'Something went wrong while setting the password.');
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
