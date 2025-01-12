import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddPost = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // Get the current user ID from Firebase Authentication
  const userId = auth().currentUser?.uid;

  // Save post data to Firestore
  const savePost = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please provide both title and description');
      return;
    }

    setUploading(true);

    try {
      // Save the post data in Firestore
      await firestore().collection('Posts').add({
        title,
        description,
        userId,  // Store the userId to track who created the post
        createdAt: firestore.FieldValue.serverTimestamp(), // Store the creation timestamp
      });

      setUploading(false);
      Alert.alert('Success', 'Post added successfully!');
      navigation.goBack();  // Navigate back to the previous screen
    } catch (error) {
      setUploading(false);
      console.error('Error saving post: ', error);
      Alert.alert('Error', 'Failed to add post');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add a New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Post Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {uploading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={savePost}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#55ACEE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#3B5998',
    fontSize: 16,
  },
});

export default AddPost;
