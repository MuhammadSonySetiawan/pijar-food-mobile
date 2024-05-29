/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon4 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Button, Avatar} from 'react-native-paper';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo?.assets[0]?.fileName,
    type: photo?.assets[0]?.type,
    uri:
      Platform.OS === 'ios'
        ? photo?.assets[0]?.uri.replace('file://', '')
        : photo?.assets[0]?.uri,
  });

  return data;
};


function profileScreen(props) {
  const {navigation} = props;

  const state = useSelector(state => state);
  const [user, setUser] = React.useState('');

  const [fullname, setFulname] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const [photo, setPhoto] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

   console.log('hasil :',state.userData.userData.data[0]);
  // hendle refresh
  const hendleRefresh = () => {
    const id = state.userData.userData.data[0].id;
     const token = state.userData.userData.token;
    console.log("ambil id :",id);
    axios
      .get(`https://pijar-food-be-one.vercel.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(result => {
        setUser(result.data?.data[0]);
        // console.log('hallo', result.data?.data);
      })
      .catch(err => {
        console.log('error :', err);
      });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUpdateProfilePicture = () => {
    setIsLoading(true);
    if (photo != null) {
      const payload = createFormData(photo);
      const token = state.userData.userData.token;
      axios
        .patch('https://pijar-food-be-one.vercel.app/users/photo', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          hendleRefresh();
          console.log('hasil:', response.data.message);
          Alert.alert('Succes', response.data.message, [{style: 'Ok'}]);
        })
        .catch(error => {
          console.log('gagal:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log('Photo profile not found');
      setIsLoading(false);
    }
  };

  React.useEffect(res => {
    setUser(state.userData.userData.data[0]);
  }, []);

  const handleProfile = () => {
    const token = state.userData.userData.token;
    axios
      .patch(
        `https://pijar-food-be-one.vercel.app/users/`,
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
      .then(res => {
        console.log('berhasil :', res.data.massage);
        Alert.alert('Succes', res.data.massage, [{style: 'Ok'}]);
        props.navigation.navigate('Profile');
        hendleRefresh();

      })
      .catch(err => console.log('gagal :', err));
  };
//  console.log(user);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
      }}>
      {/* Start Header */}
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 400,
        }}>
        {/* start edit photo Profile */}
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
            <View
              style={{
                borderRadius: 100,
                marginLeft: 130,
                marginRight: 130,
              }}>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Avatar.Image size={150} source={{uri: user?.photo}} />
              </TouchableOpacity>
            </View>
            <Button
              mode="contained"
              style={{
                backgroundColor: '#637D76',
                marginTop: 10,
                marginLeft: 128,
                width: 150,
              }}
              onPress={handleUpdateProfilePicture}>
              <Text>{isLoading === true ? 'Loading...' : 'Edit Foto'}</Text>
            </Button>

          </View>
          {/* and edit photo Profile */}
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
          {/* start input Edit Profile */}
          <View style={styles.input}>
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

          <View style={styles.input}>
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

          <View style={styles.input}>
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

          <View style={styles.input}>
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

          {/* End input Edit Profile */}

          <View
            style={{
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
              onPress={handleProfile}>
              <Text> Edit Profile </Text>
            </Button>
          </View>
        </View>
        {/* End Navigasi Profile */}
      </View>
      {/* End Content */}
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
  },
  textByRecipes: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
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
