/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import Icon6 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon7 from 'react-native-vector-icons/dist/Octicons';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
    // includeExtra,
  },
};

function profileScreen(props) {
  const {navigation} = props;
  // console.log('hasil :', props);
  const state = useSelector(state => state);
  const [user, setUser] = React.useState('');

  const [fullname, setFulname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const [photo, setPhoto] = React.useState('');

  // console.log(state.userData.userData.data[0]);

  const openGalery = async () => {
    const image = await launchImageLibrary(options);
    setPhoto(image.assets[0].fileName);
  };

  // update photo
  const updatePhoto = async () => {
    console.log(state.userData.userData.token);
    const token = state.userData.userData.token;
    axios
      .patch(
        `https://pijar-food-sonny.onrender.com/users/photo`,
        {
          photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => console.log('berhasil :', res))
      .catch(err => console.log('gagal :', err));
  };

  React.useEffect(res => {
    setUser(state.userData.userData.data[0]);
  }, []);

  const handleProfile = () => {
    // AsyncStorage.clear();
    const token = state.userData.userData.token;
    axios
      .patch(
        `https://pijar-food-sonny.onrender.com/users/`,
        {
          email: email,
          fullName: fullname,
          phoneNumber: phone,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => console.log('berhasil :', res))
      .catch(err => console.log('gagal :', err));
    // props.navigation.navigate('Profile');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
      }}>
      {/* <ScrollView> */}
      {/* Start Header */}
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 400,
        }}>
        <View
          resizeMode="cover"
          style={{width: '100%', height: 500, backgroundColor: '#AED9B9'}}>
          <Button onPress={() => navigation.goBack()}>
            <Icon
              name="arrowleft"
              size={25}
              color="#fff"
              style={{marginLeft: -355, marginTop: 20}}
            />
          </Button>

          <View style={{marginTop: -10}}>
            <View style={{borderRadius: 100, marginLeft: 130}}>
              {/* <ImageBackground source={require('../assets/tahu_kupat.jpg')}
                                style={styles.photoProfile} /> */}
              <TouchableOpacity onPress={openGalery}>
                <Avatar.Image size={150} source={{uri: user?.photo}} />
              </TouchableOpacity>
            </View>
            {/* <Text
              variant="labelLarge"
              style={styles.textWithShadow}
              numberOfLines={1}>
              {user.fullName}
            </Text> */}
            <Button
              mode="contained"
              style={{
                backgroundColor: '#637D76',
                marginTop: 10,
                marginLeft: 128,
                width: 150,
              }}
              onPress={updatePhoto}
              // onPress={
              //   openGalery
              // }
            >
              <Text> Edit Foto </Text>
            </Button>
          </View>
        </View>
      </View>
      {/* End Header */}

      {/* Start content */}
      <View
        style={{
          flex: 1,
          marginLeft: 8,
          minWidth: '96%',
          height: 100,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -150,
          backgroundColor: '#fff',
          boxShadowColor: 'rgba(0, 0, 0, 0.90)',
        }}>
        {/* Start Navigasi Profile */}
        <View style={{marginLeft: 20, marginTop: 20}}>
          {/* start input register */}
          <View
            style={styles.input}
            //   onChangeText={value => setEmail(value)}
          >
            <Icon1
              name="user"
              size={25}
              color="#637D76"
              style={{marginRight: 5, marginTop: 5}}
            />
            <TextInput
              placeholder="Name"
              style={{fontSize: 18, padding: 5}}
              defaultValue={user.fullName}
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
              style={{marginRight: 5, marginTop: 5}}
            />
            <TextInput
              placeholder="E-mail"
              style={{fontSize: 18, padding: 5, marginRight: 3}}
              keyboardType="email-address"
              defaultValue={user.email}
              onChangeText={value => setEmail(value)}
            />
          </View>

          <View
            style={styles.input}
            //   onChangeText={onChangeText}
          >
            <Icon1
              name="phone"
              size={25}
              color="#637D76"
              style={{marginRight: 5, marginTop: 5}}
            />
            <TextInput
              placeholder="Phone Number"
              style={{fontSize: 18, padding: 5}}
              keyboardType="numeric"
              defaultValue={user.phoneNumber}
              onChangeText={value => setPhone(value)}
            />
          </View>

          <View
            style={styles.input}
            // onChangeText={onChangeNumber}
          >
            <Icon
              name="lock"
              size={25}
              color="#637D76"
              style={{marginRight: 5, marginTop: 5}}
            />
            <TextInput
              placeholder="Create New Password"
              secureTextEntry={true}
              style={{fontSize: 18, padding: 5}}
              defaultValue={user.phoneNumber}
              onChangeText={value => setPassword(value)}
            />
          </View>

          {/* End input register */}

          <View
            style={{
              // marginTop: 10,
              // marginLeft: 1,
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Button
              mode="contained"
              style={{
                backgroundColor: '#637D76',
                marginTop: 10,
                marginLeft: 30,
                width: 300,
              }}
              onPress={
                handleProfile
                // register
              }>
              <Text> Edit Profile </Text>
            </Button>
          </View>
        </View>
        {/* End Navigasi Profile */}
      </View>
      {/* End Content */}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    // marginLeft: 10,
    // marginLeft: 90
    // fontFamily: 'sans-serif'
  },
  textByRecipes: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    // fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    marginLeft: 90,
  },
  buttonActive: {
    color: '#18172B',
    borderBottomColor: '#AED9B9',
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
  buttonNonActive: {
    color: '#666666',
  },
  photoProfile: {
    width: 150,
    height: 150,
  },
  input: {
    height: 60,
    margin: 9,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#637D76',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    marginRight: 25,
  },
});
export default profileScreen;
