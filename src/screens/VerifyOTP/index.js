import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import NavHeaderComp from '../../components/NavHeaderComp';

export default function VerifyOTPScreen({navigation, route}) {
  const [timeLeft, setTimeLeft] = useState(120);
  let otpInput = useRef(null);
  const {phone, otpCode} = route.params;

  useEffect(() => {
    if (timeLeft === 0) {
      console.log('=> time out');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  function submitOtp(code) {
    if (code.length === 4) {
      if (code === otpCode) {
        navigation.replace('SetPasswordScreen', { phone: phone }); // Navigate to SetPasswordScreen
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 15}}>
      <NavHeaderComp navigation={navigation} />
      <Text style={{marginTop: 40, fontSize: 20}}>Verify Mobile Number</Text>
      <Text style={{marginTop: 5}}>
        {`You will receive a SMS with a verification pin on ${phone}`}
      </Text>
      <View style={{marginTop: 20}}>
        <OTPTextInput
          tintColor={'black'}
          handleTextChange={text => submitOtp(text)}
          ref={e => (otpInput = e)}
        />
      </View>
      <Text style={{marginTop: 20, fontSize: 16, textAlign: 'center'}}>
        {`Resend code ${formatTime()}`}
      </Text>
    </SafeAreaView>
  );
}
