import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function DeletePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the current user ID from Firebase Authentication
  const userId = auth().currentUser?.uid;

  // Fetch posts of the current user from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore()
          .collection('Posts')
          .where('userId', '==', userId)  // Only fetch posts created by the current user
          .get();

        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to fetch posts');
      }
    };

    fetchPosts();
  }, [userId]);

  // Handle post deletion
  const deletePost = async (postId) => {
    try {
      await firestore().collection('Posts').doc(postId).delete();
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      Alert.alert('Success', 'Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post: ', error);
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  // Render each post in the list
  const renderPostItem = ({ item }) => (
    <View style={styles.postItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // If loading, show a spinner
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Posts</Text>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>No posts to display</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  postItem: {
    backgroundColor: '#EA4C89',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
