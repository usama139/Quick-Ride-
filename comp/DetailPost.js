import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const DetailPost = ({ route }) => {
  const { post } = route.params;  // Retrieve the post details passed through navigation

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.description}>{post.description}</Text>
        {post.imageUrl && (
          <Image source={{ uri: post.imageUrl }} style={styles.image} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default DetailPost;
