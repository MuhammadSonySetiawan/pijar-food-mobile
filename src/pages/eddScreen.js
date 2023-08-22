/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';

import { Button, PaperProvider } from 'react-native-paper';

import axios from 'axios';
import {useSelector} from 'react-redux';
import { launchImageLibrary} from 'react-native-image-picker';

import DropDownPicker from 'react-native-dropdown-picker';

const createFormData = (photo, title, videoLink, ingredients, category) => {
  const data = new FormData();

  data.append('recipePicture', {
    name: photo?.assets[0]?.fileName,
    type: photo?.assets[0]?.type,
    uri:
      Platform.OS === 'ios'
        ? photo?.assets[0]?.uri.replace('file://', '')
        : photo?.assets[0]?.uri,
  });

  data.append('title', title);
  data.append('ingredients', ingredients);
  data.append('videoLink', videoLink);
  data.append('category', category);

  return data;
};

function eddScreen(props) {
  const {navigation} = props;
  const state = useSelector(state => state);

  const [recipePicture, setRecipePicture] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [ingredients, setIngredients] = React.useState(null);
  const [videoLink, setVideoLink] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // droppdown
  const [open, setOpen] = React.useState(false);
  const [category, SetCategory] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Chicken', value: 'Chicken'},
    {label: 'Snacks', value: 'Snacks'},
    {label: 'Ice Cream', value: 'Ice Cream'},
    {label: 'Mie', value: 'Mie'},
    {label: 'Vegeterian', value: 'Vegeterian'},
    {label: 'Seafood', value: 'Seafood'},
    {label: 'Meat', value: 'Meat'},
    {label: 'Other Food', value: 'Other Food'},
  ]);
  // console.log(category);

  const hendleRefresh = () => {
    axios
      .get(`https://pijar-food-sonny.onrender.com/recipes`)
      .then(res => {
        console.log('berhasil :', res?.data?.data ?? []);
      })
      .catch(err => console.log('gagal :', err));
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      console.log(response);
      if (response) {
        setRecipePicture(response);
      }
    });
  };

  const handleCreateRecipe = () => {
    if (!recipePicture && !title && !ingredients && !videoLink) {
      Alert.alert('Warning', 'input form cannot be empty!', [
        {style: 'cancel'},
      ]);
    } else if (!recipePicture) {
      Alert.alert('Warning', 'photo not included!', [{style: 'cancel'}]);
    } else if (!title) {
      Alert.alert('Warning', 'title not included!', [{style: 'cancel'}]);
    } else if (!ingredients) {
      Alert.alert('Warning', 'ingredient not included!', [{style: 'cancel'}]);
    } else if (!videoLink) {
      Alert.alert('Warning', 'Video link not yet included', [
        {style: 'cancel'},
      ]);
    } else if (!category) {
      Alert.alert('Warning', 'Category not yet included', [
        {style: 'cancel'},
      ]);
    } else {
      setIsLoading(true);
      const token = state.userData.userData.token;
      const payload = createFormData(
        recipePicture,
          title,
          videoLink,
          ingredients,
          category,
      );
      axios
        .post(
          'https://pijar-food-sonny.onrender.com/recipes', payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(response => {
          hendleRefresh();
          console.log('Succes :', response.data.message);
          Alert.alert('Succes', response.data.message, [
            {style: 'Ok' && props.navigation.navigate('Home')},
          ]);
        })
        .catch(error => {
          console('gagal :', error?.response?.data?.message);
          // console.log('gagal :', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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
              marginTop: 20,
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
            <View>
              <DropDownPicker
                style={styles.styleDropdown}
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={SetCategory}
                setItems={setItems}
              />
            </View>
            <View style={{marginLeft: 50, marginTop: 2}}>
              <Button
                mode="contained"
                onPress={handleChoosePhoto}
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
                // onPress={takePhotoAndUpload}
                onPress={handleCreateRecipe}
                style={{width: 150, backgroundColor: '#637D76'}}>
                {isLoading === true ? 'Loading...' : 'Post'}
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
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  styleDropdown: {
    height: 50,
    width: 390,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
});
export default eddScreen;
