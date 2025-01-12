import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import NavHeaderComp from '../../src/components/NavHeaderComp';

GoogleSignin.configure({
    webClientId: '36992144081-82kg95sf5b8u45kf1p5129b45t9i34mq.apps.googleusercontent.com',
});

function Login({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handlePhoneNumberChange = (text) => {
        const numericText = text.replace(/\D/g, '');
        setPhoneNumber(numericText);
    };

    const handleLogin = async () => {
        // Reset error messages
        setPhoneNumberError('');
        setPasswordError('');
    
        // Validate phone number and password
        if (!phoneNumber) {
            setPhoneNumberError('Please fill out this field.');
        }
        if (!password) {
            setPasswordError('Please fill out this field.');
        }
        if (!phoneNumber || !password) {
            return; // Prevent further execution if fields are empty
        }
    
        if (phoneNumber.length !== 11) {
            setPhoneNumberError('Please enter a valid 11-digit phone number.');
            return;
        }
    
        const email = `+92${phoneNumber.substring(1)}@example.com`;
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            Alert.alert('Login Successful', 'Welcome back!');
            navigation.navigate('HomeScreen');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setPhoneNumberError('No account found with this number.');
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Password was incorrect.');
            } else {
                Alert.alert('Login Failed', 'Something went wrong. Please try again.');
                console.error('Login Error:', error);
            }
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

            const userData = {
                displayName: user.user.displayName,
                email: user.user.email,
                photoURL: user.user.photoURL,
            };

            Alert.alert('Login Successful', `Welcome ${userData.displayName || 'User'}`);
            navigation.navigate('HomeScreen', { user: userData });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign-In is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available');
            } else {
                Alert.alert('Login Failed', 'Error during Google Sign-In. Please try again.');
                console.error('Google Sign-In Error:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <NavHeaderComp navigation={navigation} />
            <View style={styles.imageWrapper}>
                <Image 
                    source={require('../../assets/car.png')} 
                    style={styles.image} 
                    resizeMode="contain" 
                />
            </View>
            <TextInput
                style={[styles.input, phoneNumberFocused && styles.focusedInput]}
                placeholder="Enter your Mobile Number"
                placeholderTextColor="grey"
                keyboardType="numeric"
                maxLength={11}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                onFocus={() => setPhoneNumberFocused(true)}
                onBlur={() => setPhoneNumberFocused(false)}
            />
            {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
            <View style={styles.passwordWrapper}>
                <TextInput
                    style={[styles.input, passwordFocused && styles.focusedInput]}
                    placeholder="Enter your Password"
                    placeholderTextColor="grey"
                    keyboardType="default"
                    maxLength={20}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <TouchableOpacity
                    style={styles.forgotPasswordText}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
                    <Image 
                        source={require('../../assets/google.png')} 
                        style={styles.socialLogo} 
                    />
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image 
                        source={require('../../assets/facebook.png')} 
                        style={styles.socialLogo} 
                    />
                    <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.signInText}>
                Not have an Account? 
                <Text
                    style={{ color: 'green' }}
                    onPress={() => navigation.navigate('SignUpScreen')}
                >
                   Sign Up
                </Text>
            </Text>
            <View style={styles.continueButtonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.termsText}>
                By Continuing, you agree that you have read and accept our
                T&Cs & Privacy policy
            </Text>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50, // Moves the image higher
    },
    image: {
        width: '90%',
        height: '90%',
    },
    inputContainer: {
        marginTop: -40, // Moves the whole input section higher
    },
    input: {
        height: 50,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 25,
        fontSize: 16,
        color: 'black',
        backgroundColor: '#F7F8F9',
    },
    focusedInput: {
        borderColor: '#000000',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -10,
        marginBottom: 10,
    },
    passwordWrapper: {
        position: 'relative',
    },
    forgotPasswordText: {
        position: 'absolute',
        right: 0,
        bottom: -0,
    },
    forgotPassword: {
        color: '#0CA789',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 15,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: 1,
        marginHorizontal: 5,
    },
    socialLogo: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInText: {
        alignSelf: 'center',
        margin: 20,
        color: '#97ADB6',
    },
    continueButtonContainer: {
        width: '75%',
        alignSelf: 'center',
    },
    continueButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#227a33',
    },
    continueButtonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    termsText: {
        alignSelf: 'center',
        margin: 20,
        color: '#97ADB6',
        textAlign: 'center',
    },
});
