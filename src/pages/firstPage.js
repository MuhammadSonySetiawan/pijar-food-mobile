/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet,  } from 'react-native';
import { Button } from 'react-native-paper';

function firstPage(props) {
    const { navigation } = props;

  return (
    <View>
          <ImageBackground
              source={require('../assets/ng1.webp')}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}>
              <View style={{marginTop:500}}>
                  <Button mode='contained-tonal' onPress={() => navigation.navigate('Login')} style={{ width: 200, marginLeft: 100, backgroundColor:'#E6DEB0',marginBottom:10}}>
                      Sudah punya akun
                  </Button>
                  <Button mode='contained-tonal'  onPress={() => navigation.navigate('Register')} style={{ width: 200, marginLeft: 100, backgroundColor: '#E6DEB0' }}>
                      Belum Punya akun
                  </Button>
              </View>
          </ImageBackground>
    </View>
  )
}
export default firstPage;
