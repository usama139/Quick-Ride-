import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ForgotSetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userId = route.params?.userId; // Retrieve userId
console.log('ForgotSetPassword params:', route.params);

const handleUpdatePassword = async () => {
  if (!userId) {
    console.log('User ID is undefined');
    Alert.alert('Error', 'User ID is missing. Please try again.');
    return;
  }
  


    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    console.log('Updating password for userId:', userId); // Log the userId for debugging

    try {
      // Fetch the user document
      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        console.log('User not found with ID:', userId);
        Alert.alert('Error', 'User not found. Please try again.');
        return;
      }

      console.log('User document data:', userDoc.data());

      // Update the password
      await firestore().collection('users').doc(userId).update({ password });

      Alert.alert('Success', 'Password updated successfully!');
      navigation.navigate('HomeScreen'); // Navigate to HomeScreen or desired screen
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'Failed to update the password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>
      <Text style={styles.subtitle}>Set your password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordHint}>At least 1 number or a special character</Text>

      <TouchableOpacity style={styles.registerButton} onPress={handleUpdatePassword}>
        <Text style={styles.registerText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  iconContainer: {
    padding: 5,
  },
  passwordHint: {
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#227a33',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotSetPassword;
