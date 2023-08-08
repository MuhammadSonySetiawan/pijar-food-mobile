/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';

import { Button, PaperProvider } from 'react-native-paper';

import DocumentPicker, { types } from 'react-native-document-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
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

function eddScreen(props) {
  const {navigation} = props;
  const state = useSelector(state => state);

  // const [fileResponse, setFileResponse] = React.useState([]);
  // const [photo, setPhoto] = React.useState([]);

  const [recipePicture, setRecipePicture] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [ingredients, setIngredients] = React.useState();
  const [videoLink, setVideoLink] = React.useState(null);

    // open galery
  const openGalery = async () => {
    const image = await launchImageLibrary(options);
    setRecipePicture(image.assets[0].fileName);
    console.log(image.assets[0].fileName);
  };

  // add recipe
  // const hendleAddRecipes = async () => {
  //   if (recipePicture && title && ingredients && videoLink) {
  //     console.log(state.userData.userData.token);
  //     const token = state.userData.userData.token;
  //     axios
  //       .post(
  //         `https://pijar-food-sonny.onrender.com/recipes`,
  //         {
  //           recipePicture: recipePicture,
  //           title: title,
  //           ingredients: ingredients,
  //           videoLink: videoLink,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       )
  //       .then(res => {
  //         // Swal.fire({
  //         //   title: 'Add Recipes Success',
  //         //   text: 'Add Recipes Success, redirect to app',
  //         //   icon: 'success',
  //         // });
  //         // navigate('/');
  //         console.log('berhasil :', res);
  //       })
  //       .catch(error => {
  //         // Swal.fire({
  //         //   title: 'Add Recipes Error!',
  //         //   text: error?.response?.data?.message ?? 'Someting wrong in our app',
  //         //   icon: 'error',
  //         // });
  //         console.log('gagal :',error);
  //       });
  //   } else {
  //     // Swal.fire({
  //     //   title: 'Add Recipes Error!',
  //     //   text: 'Please fill in completely',
  //     //   icon: 'error',
  //     // });
  //     console.log('gagal aja');
  //   }
  // };

  const takePhotoAndUpload = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: false,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // console.log(result)

    // if (result.cancelled) {
    //   return;
    // }

    // let localUri = result.uri;
    // setPhotoShow(localUri);
    // let filename = localUri.split('/').pop();

    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;

    // let formData = new FormData();
    // formData.append('photo', {uri: localUri, name: filename, type});

    const token = state.userData.userData.token;

    axios
      .post(
        `https://pijar-food-sonny.onrender.com/recipes`,
        {
          // recipePicture: recipePicture,
          title: title,
          ingredients: ingredients,
          videoLink: videoLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        // setRecipePicture(res.data.photo.photo);
        console.log('berhasil :', res);
      })
      .catch(err => {
        console.log('errorl :', err.response);
      });
  };


  // const handleDocumentSelection = React.useCallback(async () => {
  //   try {
  //     const response = await DocumentPicker.pick({
  //       presentationStyle: 'fullScreen',
  //       type: [types.pdf, types.docx],
  //     });
  //     setFileResponse(response);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);
  return (
    <PaperProvider>
      <SafeAreaView style={{backgroundColor: '#AED9B9', height: '100%'}}>
        <ScrollView
        // style={{height: '90%'}}
        >
          <Text
            variant="labelLarge"
            style={{
              fontSize: 30,
              color: '#637D76',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Add Your Recipe
          </Text>

          <View>
            <View style={styles.input}>
              <Icon2
                name="book-open"
                size={32}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Title"
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setTitle(value)}
              />
            </View>

            <View
              style={{
                // height: 60,
                // margin:10,
                marginLeft: 10,
                marginRight: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                borderColor: '#637D76',
                backgroundColor: '#fff',
              }}>
              <TextInput
                placeholder="Ingredients"
                style={{
                  fontSize: 18,
                  padding: 5,
                  height: 200,
                  borderColor: '#fff',
                }}
                onChangeText={value => setIngredients(value)}
              />
            </View>

            <View style={styles.input}>
              <Icon2
                name="video"
                size={32}
                color="#637D76"
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Add Video"
                style={{fontSize: 18, padding: 5}}
                onChangeText={value => setVideoLink(value)}
              />
            </View>
            <View style={{marginLeft: 50, marginTop: 2}}>
              <Button
                mode="contained"
                onPress={openGalery}
                style={{
                  width: 300,
                  backgroundColor: '#637D76',
                  marginRight: 5,
                }}>
                Add Image
              </Button>
            </View>

            <View style={{marginLeft: 120, marginTop: 20}}>
              <Button
                mode="contained"
                onPress={takePhotoAndUpload}
                style={{width: 150, backgroundColor: '#637D76'}}>
                Post
              </Button>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            width: '100%',
            height: 70,
            borderColor: '#999',
            borderBottomWidth: 1,
            borderTopWidth: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            {/* <Button mode="contained" onPress={() => console.log('Pressed')} style={{width:150 ,height:50}}>
                        <Image  source={require('./assets/home-yelow.png')} /> Home
                      </Button>
                      */}
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="home" size={35} color="#666666" />
              <Text style={{color: '#666666'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EddRecipes')}>
              <Icon2
                name="plus-square"
                size={35}
                color="#75C9CC"
                style={{marginLeft: 21}}
              />
              <Text color="#75C9CC">Add Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Icon2
                name="message-circle"
                size={35}
                color="#666666"
                style={{marginLeft: 12}}
              />
              <Text>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon2 name="user" size={35} color="#666666" />
              <Text>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // borderColor: '#fff',
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',

  },
})
export default eddScreen;
