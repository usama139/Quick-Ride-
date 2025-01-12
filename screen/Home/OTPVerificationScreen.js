import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

const OTPVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendEnabled, setResendEnabled] = useState(true);

  // Use an array to store refs for each input field
  const refs = useRef(otp.map(() => React.createRef()));

  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus the next input if text is entered
    if (text && index < otp.length - 1) {
      if (refs.current[index + 1] && refs.current[index + 1].current) {
        refs.current[index + 1].current.focus();
      }
    }
  };

  const handleVerify = () => {
    Keyboard.dismiss();
    const enteredOtp = otp.join('');
    console.log("Entered OTP: ", enteredOtp);
    
    // Implement OTP verification logic here
    if (enteredOtp === "1234") { // Replace with actual OTP verification logic
      navigation.navigate('SetPasswordScreen'); // Navigating to the SetPasswordScreen
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    if (resendEnabled) {
      setResendEnabled(false);
      console.log("Resend OTP code");
      // Implement OTP resend logic here
      setTimeout(() => setResendEnabled(true), 60000); // Enable resend after 1 minute
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Phone verification</Text>
      <Text style={styles.subtitle}>Enter your OTP code</Text>
      
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={refs.current[index]} // Properly assign ref to each input
            style={styles.otpInput}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            onKeyPress={(e) => {
              // Handle backspace (delete) to focus previous input
              if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
                refs.current[index - 1].current.focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleResend} disabled={!resendEnabled}>
        <Text style={styles.resendText}>Didn’t receive code? <Text style={styles.resendLink}>Resend again</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
  },
  resendText: {
    color: '#888',
    marginBottom: 30,
  },
  resendLink: {
    color: 'green',
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#227a33',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom:150,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#0CA789',
    fontSize: 16,
    marginBottom:120,
    marginRight:270,
},
});

export default OTPVerificationScreen;
