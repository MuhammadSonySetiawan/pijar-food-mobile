/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import Icon6 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon7 from 'react-native-vector-icons/dist/Octicons';
import { Button, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSelector } from 'react-redux';

function profileScreen(props) {
    const { navigation } = props;
    // console.log('hasil :', props);
    const state = useSelector((state) => state);
    const [user, setUser] = React.useState('');

    console.log(state.userData.userData.data[0]);

    React.useEffect((res)=>{
      setUser(state.userData.userData.data[0]);
      // console.log(res)
      // axios
      //   .get(`https://pijar-food-sonny.onrender.com/users/${idUser}`)
      //   .then((result) => {
      //     setUser(result?.data?.data[0]), console.log(res);
// }
// )
},[]);
    const hendleLogOut = () => {
        AsyncStorage.clear();
        props.navigation.navigate('Login');
    };

    const progressApp = () => {
      Alert.alert(
        'Warning',
        'Sorry, Currently not open because the project is in progress',
        [{style: 'cancel'}],
      );
    };
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          backgroundColor: '#AED9B9',
        }}>
        <Button onPress={() => navigation.goBack()}>
          <Icon
            name="arrowleft"
            size={25}
            color="#fff"
            style={{marginTop: 20}}
          />
        </Button>
        {/* Start Header */}
        <View
          style={{
            flex: 1,
            width: '100%',
            height: 400,
            backgroundColor: '#AED9B9',
          }}>
          <View
            resizeMode="cover"
            style={{width: '100%', height: 900, backgroundColor: '#AED9B9'}}>
            <View style={{}}>
              <View style={{borderRadius: 100, marginLeft: 130}}>
                {/* <ImageBackground source={require('../assets/tahu_kupat.jpg')}
                                style={styles.photoProfile} /> */}
                <Avatar.Image size={150} source={{uri: user?.photo}} />
              </View>
              <Text
                variant="labelLarge"
                style={styles.textWithShadow}
                numberOfLines={1}>
                {user?.fullName}
              </Text>
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
            marginTop: -20,
            backgroundColor: '#fff',
          }}>
          {/* Start Navigasi Profile */}
          <View style={{marginLeft: 20}}>
            <View
              style={{
                marginTop: 20,
                marginLeft: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => navigation.navigate('EditProfile')}>
                <Icon1 name="user" size={25} color="#637D76" />
                <Text style={{fontSize: 18, marginLeft: 10}}>Edit Profile</Text>
              </TouchableOpacity>
              <Button onPress={() => navigation.navigate('EditProfile')}>
                <Icon name="right" size={25} color="#637D76" />
              </Button>
            </View>

            <View
              style={{
                marginTop: 20,
                marginLeft: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => navigation.navigate('MyRecipe')}>
                <Icon7 name="file-badge" size={25} color="#637D76" />
                <Text style={{fontSize: 18, marginLeft: 10}}>My Recipe</Text>
              </TouchableOpacity>
              <Button onPress={() => navigation.navigate('MyRecipe')}>
                <Icon name="right" size={25} color="#637D76" />
              </Button>
            </View>

            <View
              style={{
                marginTop: 20,
                marginLeft: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={progressApp}>
                <Icon6 name="save-alt" size={25} color="#637D76" />
                <Text style={{fontSize: 18, marginLeft: 10}}>Saved Recipe</Text>
              </TouchableOpacity>
              <Button onPress={progressApp}>
                <Icon name="right" size={25} color="#637D76" />
              </Button>
            </View>

            <View
              style={{
                marginTop: 20,
                marginLeft: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={progressApp}>
                <Icon name="like2" size={25} color="#637D76" />
                <Text style={{fontSize: 18, marginLeft: 10}}>Liked Recipe</Text>
              </TouchableOpacity>
              <Button onPress={progressApp}>
                <Icon name="right" size={25} color="#637D76" />
              </Button>
            </View>
            <View
              style={{
                marginTop: 20,
                marginLeft: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={hendleLogOut}>
                <Icon5 name="log-out-outline" size={25} color="#637D76" />
                <Text style={{fontSize: 18, marginLeft: 10}}>Log Out</Text>
              </TouchableOpacity>

              <Button onPress={hendleLogOut}>
                <Icon name="right" size={25} color="#637D76" />
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
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        marginTop: 5,
        textAlign:'center',
        // marginLeft: 10,
        // marginLeft: 90
        // fontFamily: 'sans-serif'
    },
    textByRecipes: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        // fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
        marginLeft: 90
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
    photoProfile:{
        width: 150,
        height: 150,
    },


});
export default profileScreen;