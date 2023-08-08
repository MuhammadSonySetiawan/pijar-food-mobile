/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ImageBackground, Text} from 'react-native';
import { Button } from 'react-native-paper';

function firstPage(props) {
    const { navigation } = props;

  return (
    <View>
      <ImageBackground
        source={require('../assets/ng1.webp')}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: 340}}>
          <View>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('Login')}
              style={{
                width: 300,
                marginLeft: 50,
                backgroundColor: '#E6DEB0',
              }}>
              <Text style={{fontSize: 18}}>Sudah punya akun</Text>
            </Button>
          </View>
          <View>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('Register')}
              style={{
                width: 200,
                marginLeft: 100,
                marginTop: 10,
                backgroundColor: '#E6DEB0',
                width: 300,
                marginLeft: 50,
              }}>
              <Text style={{fontSize: 18}}>Belum Punya akun</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default firstPage;
