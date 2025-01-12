import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NotificationCard from './NotificationScreen';
import NavHeaderComp from '../../src/components/NavHeaderComp';

const NotificationContainer = ({navigation}) => {
  const todayNotifications = [
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '15 min ago',
      highlighted: true,
    },
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '25 min ago',
      highlighted: false,
    },
  ];

  const yesterdayNotifications = [
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '15 min ago',
      highlighted: true,
    },
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '25 min ago',
      highlighted: false,
    },
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '25 min ago',
      highlighted: false,
    },
    {
      title: 'Payment confirm',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultrici es tincidunt eleifend vitae.',
      time: '15 min ago',
      highlighted: true,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <NavHeaderComp navigation={navigation} />
        <Text style={styles.title}>Notification</Text>
      </View>

      <Text style={styles.sectionTitle}>Today</Text>
      {todayNotifications.map((item, index) => (
        <NotificationCard
          key={index}
          title={item.title}
          description={item.description}
          time={item.time}
          highlighted={item.highlighted}
        />
      ))}

      <Text style={styles.sectionTitle}>Yesterday</Text>
      {yesterdayNotifications.map((item, index) => (
        <NotificationCard
          key={index}
          title={item.title}
          description={item.description}
          time={item.time}
          highlighted={item.highlighted}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    textAlign:'center',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center',
    paddingLeft:85,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default NotificationContainer;
