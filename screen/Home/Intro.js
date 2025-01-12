import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    key: 1,
    title: 'Anywhere you are',
    text: 'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: require('../../assets/anywhere.png'),
    buttonImage: require('../../assets/arrow.png'),
  },
  {
    key: 2,
    title: 'At anytime',
    text: 'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: require('../../assets/anytime.png'),
    buttonImage: require('../../assets/arrow.png'),
  },
  {
    key: 3,
    title: 'Book your car',
    text: 'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: require('../../assets/book.png'),
    buttonImage: require('../../assets/arrow.png'),
  },
];

export default function IntroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0); // Keep track of the current slide index
  const navigation = useNavigation(); // Hook to handle navigation

  // Function to handle the button click and navigate to the next slide or login page
  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1); // Move to the next slide
    } else {
      // Navigate to the LoginPage after the last slide
      navigation.navigate('WelcomeScreen');
    }
  };

  // Function to render each slide item
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.skip} onPress={() => handleNextSlide()}>Skip</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNextSlide}  // Move to the next slide or LoginPage
      >
         <Image source={item.buttonImage} style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={[slides[currentSlide]]} // Only render the current slide
      renderPagination={() => null} // Hide default dots pagination
      showDoneButton={false}
      showNextButton={false}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  skip: {
    position: 'absolute',
    top: 40,
    right: 20,
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: 330,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 30,  // Adjust the icon size as needed
    height: 25,
    resizeMode: 'contain',  // Ensure the image maintains its aspect ratio
    
  },
});
