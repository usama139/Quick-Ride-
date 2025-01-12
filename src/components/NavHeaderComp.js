import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function NavHeaderComp({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 35,
          height: 35,
          borderRadius: 20,
          borderColor: 'green',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <EvilIcons name="chevron-left" size={35} color="green" />
      </TouchableOpacity>
      
    </View>
  );
}
