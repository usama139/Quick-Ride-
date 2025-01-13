import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroSlider from './screen/Home/Intro';
import LoginPage from './screen/Home/LoginPage';
import WelcomeScreen from './screen/Home/WelcomeScreen';
import SignUpScreen from './screen/Home/SignUpScreen';
import OTPVerificationScreen from './screen/Home/OTPVerificationScreen';
import SetPasswordScreen from './screen/Home/SetPasswordScreen';
import ProfileScreen from './screen/Home/ProfileScreen';
import ForgotPassword from './screen/Home/ForgotPassword';
import ForgotSetPassword from './screen/Home/ForgotSetPassword';
import ForgotOTPVerification from './screen/Home/ForgotOTPVerification';
import HomeScreen from './screen/Home/HomeScreen';
import RideSelect from './screen/Home/RideSelect';
import PhoneAuthScreen from './src/screens/PhoneAuth';
import VerifyOTPScreen from './src/screens/VerifyOTP';
import NotificationContainer from './screen/Home/NotificationContainer';
import NotificationScreen from './screen/Home/NotificationScreen';
import AddressScreen from './screen/Home/AddressScreen'
import FavouriteScreen from './screen/Home/FavouriteScreen';
import OfferScreen from './screen/Home/OfferScreen';
import SelectTransportScreen from './screen/Home/SelectTransportScreen';
import RentRequestScreen from './screen/Home/RentRequestScreen';
import ThankYouScreen from './screen/Home/ThankYouScreen';
import DriverDetailsScreen from './screen/Home/DriverDetailsScreen';
import ChatScreen from './screen/Home/ChatScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='IntroSlider' screenOptions={{ headerShown: false }}>
       
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="SetPasswordScreen" component={SetPasswordScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotSetPassword" component={ForgotSetPassword} />
        <Stack.Screen name="ForgotOTPVerification" component={ForgotOTPVerification} />
        <Stack.Screen name="RideSelect" component={RideSelect} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen} />
        <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
        <Stack.Screen name="NotificationContainer" component={NotificationContainer} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
        <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
        <Stack.Screen name="OfferScreen" component={OfferScreen} />
        <Stack.Screen name="SelectTransportScreen" component={SelectTransportScreen} />
        <Stack.Screen name="RentRequestScreen" component={RentRequestScreen} />
        <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
        <Stack.Screen name="DriverDetailsScreen" component={DriverDetailsScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        {/* Add HomeScreen or other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
