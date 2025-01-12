import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CountryCodesMd from '../../modal/CountryCodesMd';
import NavHeaderComp from '../../components/NavHeaderComp';
import { _apiSendOtp } from '../../config/api';  // Import the OTP sending function

export default function PhoneAuthScreen({navigation}) {
  const [mdVisible, setMdVisible] = useState(false);
  const [number, setNumber] = useState('');
  const [continueOtpEnabled, setContinueOtpEnabled] = useState(false);
  const [countryCode, setCountryCode] = useState({
    country: 'Pakistan',
    code: '+92',
    emoji: '🇵🇰',
  });

  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit OTP
  }

  async function sendOtp() {
    if (!continueOtpEnabled) return;
    const phone = countryCode.code + number;
    const otpCode = generateOTP(); // Generate a new OTP
    
    // Sending OTP via WhatsApp using the Twilio API function
    await _apiSendOtp(phone, otpCode);  // Send OTP to WhatsApp

    // Navigate to VerifyOTPScreen with the phone and OTP for verification
    navigation.navigate('VerifyOTPScreen', {
      phone,
      otpCode,
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <CountryCodesMd
        show={mdVisible}
        hideModal={() => setMdVisible(false)}
        onSelected={item => {
          setCountryCode(item);
          setMdVisible(false);
        }}
      />
      <View style={{flex: 0.5, padding: 20}}>
        <NavHeaderComp navigation={navigation} />
        <View style={{paddingVertical: 20}}>
          <Text style={{fontSize: 25, color: 'black', fontWeight: '300', marginBottom: 15, marginTop: 30}}>
            Welcome!{'\n'}What's your number?
          </Text>
          <Text>We need to send you a code on your WhatsApp to verify your phone number.</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          }}>
          <TouchableOpacity onPress={() => setMdVisible(!mdVisible)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 10}}>{countryCode.emoji}</Text>
              <Text style={{color: 'black', marginLeft: 10}}>{countryCode.code}</Text>
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: 10}}>
            <TextInput
              placeholder="Enter your number"
              keyboardType="phone-pad"
              onChangeText={text => {
                setNumber(text);
                if (text.length >= 9) setContinueOtpEnabled(true);
                else setContinueOtpEnabled(false);
              }}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 0.5, justifyContent: 'flex-end', padding: 15}}>
        <TouchableOpacity onPress={sendOtp}>
          <View
            style={{
              backgroundColor: continueOtpEnabled ? '#37b44e' : '#d5dbdb',
              padding: 15,
              borderRadius: 25,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '700',
                color: continueOtpEnabled ? 'white' : '#aab7b8',
              }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
