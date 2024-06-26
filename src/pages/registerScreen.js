/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';

import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/dist/Feather';

import axios from 'axios';

import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

function registerScreen(props) {
  const {navigation} = props;

  const [fullname, setFulname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);


  const register = async () => {
    if (fullname == '' || email == '' || phone == '' || password == '') {
    }
    let data = {
      id: uuid.v4(),
      fullname: fullname,
      email: email,
      phoneNumber: phone,
      password: password,
    };
    database()
      .ref('/users/' + data?.id)
      .set(data)
      .then(
        () => console.log('Data set. Sukses'),
        setFulname(""),
        setEmail(""),
        setPhone(""),
        setPassword(""),
        navigation.navigate("Login")
      );
  };

  const hendleRegister = () => {
    setIsLoading(true);
    if (fullname == '' || email == '' || phone == '' || password == '') {
    }
    let data = {
      id: uuid.v4(),
      fullname: fullname,
      email: email,
      phoneNumber: phone,
      password: password,
    };
    database()
      .ref('/users/' + data?.id)
      .set(data)
      .then(
        () => console.log('Data set. Sukses'),
        setFulname(''),
        setEmail(''),
        setPhone(''),
        setPassword(''),
        // navigation.navigate('Login'),
      );


    axios
      .post('https://pijar-food-be-one.vercel.app/users', {
        fullName: fullname,
        email: email,
        phoneNumber: phone,
        password: password,
      })
      // const newReference = database().ref('/users').push();

      // console.log('Auto generated key: ', newReference.key);

      // newReference
      //     .set({
      //         fullname: fullname,
      //         email: email,
      //         phoneNumber: phone,
      //         password: password,
      //     })
      // .then(() => console.log('Data updated.'))

      .then(async res => {
        Alert.alert('Succes', res.data.message, [
          {style: 'Ok' && props.navigation.navigate('Login')},
        ]);
        // props.navigation.navigate('Login');
        console.log('hasil :', res.data.message);
      })
      .catch( err =>{
        Alert.alert('Warning', err.response.data.messages ?? "The input form must not be empty.", [{style: 'Ok'}])
        // console.log('error :', err.response.data.messages)
        // console.log('error :', err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: '#AED9B9', height: '100%'}}>
      <ScrollView>
        <View style={{marginTop: 20}}>
          <Text
            variant="labelLarge"
            style={{fontSize: 30, color: '#637D76', textAlign: 'center'}}>
            Let’s Get Started !
          </Text>
          <Text
            variant="labelMedium"
            style={{fontSize: 14, marginTop: 5, textAlign: 'center'}}>
            Create new account to access all feautures
          </Text>
          <View style={{margin: 25}}>
            {/* start input register */}
            <View
              style={styles.input}
              //   onChangeText={value => setEmail(value)}
            >
              <Icon1
                name="user"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Name"
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setFulname(value)}
              />
            </View>

            <View
              style={styles.input}
              //   onChangeText={onChangeText}
            >
              <Icon4
                name="email-outline"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="E-mail"
                style={{fontSize: 18, padding: 5}}
                keyboardType="email-address"
                onChangeText={value => setEmail(value)}
              />
            </View>

            <View
              style={styles.input}
              //   onChangeText={onChangeText}
            >
              <Icon5
                name="phone"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Phone Number"
                style={{fontSize: 18, padding: 5}}
                keyboardType="numeric"
                onChangeText={value => setPhone(value)}
              />
            </View>

            <View
              style={styles.input}
              // onChangeText={onChangeNumber}
            >
              <Icon2
                name="lock"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Create New Password"
                secureTextEntry={true}
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setPassword(value)}
              />
            </View>

            <View
              style={styles.input}
              // onChangeText={onChangeNumber}
            >
              <Icon2
                name="lock"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="New Password"
                secureTextEntry={true}
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setPassword(value)}
              />
            </View>
            {/* End input register */}
            <View>
              <Button
                mode="contained"
                style={{backgroundColor: '#637D76', marginTop: 30}}
                onPress={
                  hendleRegister
                  // register
                }
                disabled={isLoading}>
                <Text>{isLoading === true ? 'Loading...' : 'Register'}</Text>
              </Button>
              <View
                style={{marginTop: 10, marginLeft: 65, flexDirection: 'row'}}>
                <Text style={{textAlign: 'right', color: '#999999'}}>
                  Already have account?
                </Text>
                <Button onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#637D76', marginTop: -2}}>
                    Log in Here
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#637D76',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
  },
});
export default registerScreen;
