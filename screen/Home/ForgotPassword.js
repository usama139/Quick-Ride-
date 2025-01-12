import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavHeaderComp from '../../src/components/NavHeaderComp';
import { _apiSendOtp } from '../../src/config/api'; // Ensure this API function is configured properly

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [contact, setContact] = useState('+92'); // Prefill with Pakistan's country code
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value) => {
    // Remove +92 for validation
    const trimmedValue = value.replace('+92', '');
    // Validate only digits and a max of 10 digits
    if (/^\d*$/.test(trimmedValue) && trimmedValue.length <= 10) {
      setContact(`+92${trimmedValue}`);
    } else if (trimmedValue.length > 10) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
    }
  };

  const sendOtp = async () => {
    // Check if the length of the phone number (excluding prefix) is 10
    if (contact.length !== 13) { // +92 + 10 digits = 13 characters
      Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    setIsLoading(true);
    try {
      // Integrate your WhatsApp API or backend to send the OTP
      await _apiSendOtp(contact, otpCode, { via: 'whatsapp' });
      navigation.navigate('ForgotOTPVerification', { contact, otpCode });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error('OTP Sending Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NavHeaderComp navigation={navigation} />

      <Text style={styles.title}>Verification Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#BEBEBE"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={handleInputChange}
        maxLength={13} // +92 + 10 digits = 13 characters
      />

      <TouchableOpacity
        style={styles.button}
        onPress={sendOtp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 50,
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333333',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#008000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 280,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
