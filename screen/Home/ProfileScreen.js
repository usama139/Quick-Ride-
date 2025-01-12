import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  BackHandler 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import HomeScreen from '../../src/screens/Home';
import NavHeaderComp from '../../src/components/NavHeaderComp';
// Sample country data
const countries = [
  { label: 'PK +92', value: '+92' },
];

const ProfileScreen = ({ navigation }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+92');
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      navigation.setOptions({
        title: user.displayName || 'Profile',
      });

      const fetchUserData = async () => {
        try {
          const userDoc = await firestore().collection('UserInformation').doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserName(userData.name || '');
            setUserEmail(userData.email || user.email);
            setPhone(userData.phone ? userData.phone.replace(selectedCountryCode, '') : '');
            setCity(userData.city || '');
            setProfileImage(userData.profileImage ? { uri: userData.profileImage } : null);
          } else {
            setUserEmail(user.email); // Default to authenticated email
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch user data.');
        }
      };

      fetchUserData();
    }

    
    
  }, [navigation]);

  

  const handleImagePicker = () => {
    const options = { mediaType: 'photo', maxWidth: 200, maxHeight: 200, quality: 1 };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        const selectedImage = response.assets[0];
        if (selectedImage.fileSize > 5 * 1024 * 1024) {
          Alert.alert('Error', 'Image size exceeds 5MB. Please select a smaller image.');
          return;
        }
        setProfileImage({ uri: selectedImage.uri });
      }
    });
  };

  const saveUserInfo = async () => {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    try {
      const userInfo = {
        name: userName,
        email: userEmail,
        phone: `${selectedCountryCode}${phone}`,
        city,
      };

      if (profileImage?.uri) {
        userInfo.profileImage = profileImage.uri; // Replace with actual upload logic if needed
      }

      await firestore().collection('UserInformation').doc(user.uid).set(userInfo, { merge: true });
      Alert.alert('Success', 'Your information has been updated.');
      navigation.navigate(HomeScreen);
    } catch (error) {
      Alert.alert('Error', 'Failed to save user information.');
    }
  };

  const signOutUser = async () => {
    try {
      await auth().signOut();
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  return (
    <View style={styles.container}>
      <NavHeaderComp navigation={navigation} />
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePicker}>
        {profileImage ? (
          <Image source={profileImage} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.addImageText}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput 
        style={styles.input} 
        placeholder="Full Name" 
        value={userName} 
        onChangeText={setUserName} 
      />
      <View style={styles.phoneContainer}>
        <Text style={styles.selectedCountryCode}>{selectedCountryCode}</Text>
        <TextInput 
          style={styles.phoneInput} 
          placeholder="Mobile Number" 
          keyboardType="phone-pad" 
          value={phone} 
          onChangeText={setPhone} 
        />
      </View>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={userEmail} 
        editable={false} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="City" 
        value={city} 
        onChangeText={setCity} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveUserInfo}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={signOutUser}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 20 },
  profileImageContainer: { alignSelf: 'center', marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profilePlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  addImageText: { fontSize: 40, color: '#aaa' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, fontSize: 16, marginBottom: 15 },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  selectedCountryCode: { fontSize: 16, marginRight: 10 },
  phoneInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { flex: 1, backgroundColor: '#fff', borderColor: '#227a33', borderWidth: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  cancelButtonText: { color: '#227a33', fontWeight: 'bold' },
  saveButton: { flex: 1, backgroundColor: '#227a33', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  signOutButton: { marginTop: 20, backgroundColor: 'red', padding: 15, borderRadius: 8, alignItems: 'center' },
  signOutButtonText: { color: 'white', fontWeight: 'bold' },
});

export default ProfileScreen;
