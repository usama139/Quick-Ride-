import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationScreen = ({ title, description, time, highlighted }) => {
  return (
    <View
      style={[
        styles.card,
        highlighted ? styles.highlightedCard : styles.normalCard,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  highlightedCard: {
    backgroundColor: '#e9f9ef',
  },
  normalCard: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationScreen;
