import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {countryCodeList} from '../assets/local';

export default function CountryCodesMd({show, hideModal, onSelected}) {
  return (
    <Modal transparent={true} visible={show}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Select Country/Region
            </Text>
            <TouchableOpacity onPress={() => hideModal()}>
              <Text
                style={{
                  color: '#839192',
                }}>
                cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: 1,
              borderColor: '#95a5a6',
            }}>
            <AntDesign name="search1" size={20} color="#95a5a6" />
            <TextInput
              style={{
                marginLeft: 10,
              }}
              placeholder="search"
            />
          </View>
          <ScrollView style={{flex: 1}}>
            {Object.keys(countryCodeList).map(key => {
              return (
                <View key={key}>
                  <View
                    style={{
                      backgroundColor: '#d5dbdb',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        color: '#aab7b8',
                        fontSize: 17,
                      }}>
                      {key}
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 5,
                    }}>
                    {countryCodeList[key].map(item => {
                      return (
                        <TouchableOpacity
                          key={item.country}
                          onPress={() => onSelected(item)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingVertical: 5,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 25,
                                }}>
                                {item.emoji}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  fontSize: 17,
                                }}>
                                {item.country}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  fontSize: 17,
                                }}>
                                {item.code}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
