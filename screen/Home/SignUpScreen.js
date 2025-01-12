import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import NavHeaderComp from '../../src/components/NavHeaderComp';
import CountryCodesMd from '../../src/modal/CountryCodesMd';
import { _apiSendOtp } from '../../src/config/api';

GoogleSignin.configure({
  webClientId: '36992144081-82kg95sf5b8u45kf1p5129b45t9i34mq.apps.googleusercontent.com',
});

const SignUpScreen = ({ navigation }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState({
    code: '+92',
    flag: '🇵🇰',
  });
  const [isCountryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSignUpEnabled = phoneNumber.length >= 9 && phoneNumber.length <= 11;

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSignUp = async () => {
    if (!isSignUpEnabled) return;

    const phone = `${selectedCountryCode.code}${phoneNumber}`;
    const otpCode = generateOTP();

    setIsLoading(true);
    try {
      await _apiSendOtp(phone, otpCode);
      navigation.navigate('VerifyOTPScreen', { phone, otpCode });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error('OTP Sending Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const { idToken } = await GoogleSignin.getTokens();

        if (!idToken) throw new Error('No idToken received');
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const user = await auth().signInWithCredential(googleCredential);

        // Extract serializable data
        const userData = {
            displayName: user.user.displayName,
            email: user.user.email,
            photoURL: user.user.photoURL,
            uid: user.user.uid,
        };

        navigation.navigate('HomeScreen', { user: userData });
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign-In is in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available');
        } else {
            console.error('Error during sign-in:', error);
        }
    }
};


  const handleCountrySelection = (country) => {
    setSelectedCountryCode({
      code: country.code,
      flag: country.flag,
    });
    setCountryCodeModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <NavHeaderComp navigation={navigation} />
          <Text style={styles.title}>Sign up with your phone number</Text>

          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              onPress={() => setCountryCodeModalVisible(true)}
              style={styles.countryCodeContainer}
            >
              <Text style={styles.countryCodeText}>
                {selectedCountryCode.flag} {selectedCountryCode.code}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
            />
          </View>

          <Text style={styles.termsText}>
            By signing up, you agree to the{' '}
            <Text style={styles.linkText}>Terms of service</Text> and{' '}
            <Text style={styles.linkText}>Privacy policy</Text>.
          </Text>

          <TouchableOpacity
            style={[
              styles.signUpButton,
              { backgroundColor: isSignUpEnabled ? '#227a33' : '#d5dbdb' },
            ]}
            onPress={handleSignUp}
            disabled={!isSignUpEnabled || isLoading}
          >
            <Text style={styles.signUpButtonText}>
              {isLoading ? 'Sending OTP...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Sign up with Gmail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/facebook.png')}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
          </TouchableOpacity>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('LoginPage')}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={isCountryCodeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCountryCodeModalVisible(false)}
      >
        <CountryCodesMd
          onSelectCountry={handleCountrySelection}
          onClose={() => setCountryCodeModalVisible(false)}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 70,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  countryCodeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  linkText: {
    color: '#0CA789',
  },
  signUpButton: {
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 30,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 17,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 14,
  },
});

export default SignUpScreen;
