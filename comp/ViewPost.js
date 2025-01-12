import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore().collection('Posts').get();
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  
  const navigateToDetailPost = (post) => {
    navigation.navigate('DetailPost', { post });  
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetailPost(item)} style={styles.postItem}>
      <View style={styles.postHeader}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  postItem: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  postHeader: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  description: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ViewPost;
