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
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
import {setUser} from '../store/redusers/user';

function loginScreen(props) {
  const {navigation} = props;

  const dispatch = useDispatch()

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);


  const loginUser = async () =>{
    database()
      .ref('users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if(snapshot.val() == null){
          console.log('invalid email');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if(userData?.password != password ){
            console.log('invalid password');
          return false;
        }
        console.log('User data: ', userData);
        // console.log(dispatch(setUser(userData)))

      });
  };

  const HendleLogin = () => {
    setIsLoading(true);
    console.log(email);
    console.log(password);
    // login firebase
    database()
      .ref('users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          console.log('invalid email');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData?.password != password) {
          console.log('invalid password');
          return false;
        }
        console.log('User data: ', userData);
      });

      // login axios
    axios
      .post('https://pijar-food-sonny.onrender.com/auth/login', {
        email: email,
        password: password,
      })
      .then(async res => {
        // dispatch(user(res.data.data));
        console.log('berhasil :', res.data.data);
        await AsyncStorage.setItem('token', res.data.token);
        // await AsyncStorage.setItem('id', res.data.data.id);
        // await AsyncStorage.setItem('id', res.data.data.id);
        props.navigation.navigate('Home');
        dispatch(setUser(res.data));
        //  console.log('berhasil :', res.data.data);
      })
      .catch(err => {
        // Alert.alert('Warning', err.response.data.messages, [{style: 'cancel'}]),
        console.log('gagal :', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{backgroundColor: '#AED9B9', height: '100%'}}>
        <View style={{marginTop: 20}}>
          <Icon3
            name="chef-hat"
            size={100}
            color="#637D76"
            style={{marginLeft: 150, marginBottom: 30}}
          />
          {/* <View style={{ borderRadius: 100, height: 200, width: 200, backgroundColor:'#C4C4C4', display:'flex', justifyContent:'center',}}>
                  <Icon3 name='chef-hat' size={100} color='#637D76' style={{ position: 'absolute', }} />
            </View> */}
          <Text
            variant="labelLarge"
            style={{fontSize: 20, color: '#637D76', textAlign: 'center'}}>
            Welcome !
          </Text>
          <Text
            variant="labelMedium"
            style={{fontSize: 14, marginTop: 5, textAlign: 'center'}}>
            Log in to your exiting account.
          </Text>
          <View style={{margin: 25}}>
            <View
              style={styles.input}
              //   onChangeText={onChangeText}
            >
              <Icon1
                name="user"
                size={25}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="examplexxx@gmail.com"
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setEmail(value)}
                value={email}
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
                secureTextEntry={true}
                placeholder="Password"
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setPassword(value)}
                value={password}
              />
            </View>
            <View>
              <Button onPress={() => navigation.navigate('Contoh')}>
                <Text
                  style={{
                    color: '#999999',
                    marginTop: -2,
                    marginLeft: 200,
                    marginBottom: 50,
                  }}>
                  Forgot Password ?
                </Text>
              </Button>

              <Button
                mode="contained"
                style={{backgroundColor: '#637D76'}}
                onPress={
                  // loginUser
                  HendleLogin
                }
                disabled={isLoading}>
                <Text> {isLoading === true ? 'Loading...' : 'Log in'}</Text>
              </Button>
              <View
                style={{marginTop: 10, marginLeft: 70, flexDirection: 'row'}}>
                <Text style={{textAlign: 'center', color: '#999999'}}>
                  Don’t have an account?
                </Text>
                <Button onPress={() => navigation.navigate('Register')}>
                  <Text
                    style={{
                      color: '#637D76',
                      textAlign: 'right',
                      marginRight: 0,
                      marginTop: 0,
                    }}>
                    Sign Up
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default loginScreen;
