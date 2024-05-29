/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Avatar, Card, IconButton, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import {Button} from 'react-native-paper';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {addRecipe, getSelectRecipe} from '../store/redusers/recipeSlice';
import {useNavigation} from '@react-navigation/native';

function profileScreen(props) {
  const navigate = useNavigation();
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [keyword, setKeyword] = React.useState('');
  const [resipesList, setRecipesList] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [nameList, setNameList] = React.useState();

  React.useEffect(() => {
    console.log(state.userData.userData.data[0]);
    const token = state.userData.userData.token;
    const nama = state?.recipe?.nameCategory;
    // setNameList = nama
    axios
      .get(`https://pijar-food-be-one.vercel.app/recipes/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setRecipes(res?.data?.data ?? []);
        setNameList(nama);
      })
      .catch(err => console.log('error :', err));
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#AED9B9'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          backgroundColor: '#AED9B9',
        }}>
        {/* Start Header */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            resizeMode="cover"
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Button onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={25} color="#fff" />
            </Button>
          </View>
          <View style={{marginTop: 23}}>
            <Text
              variant="labelLarge"
              style={{fontSize: 25, fontWeight: 'bold'}}>
              My Recipe
            </Text>
          </View>
        </View>
        {/* End Header */}
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'around',
            }}>
            {recipes?.map((item, key) => (
              <TouchableOpacity
                style={{marginTop: 10, marginRight: 15}}
                key={key}
                onPress={() => {
                  dispatch(addRecipe(item));
                  dispatch(getSelectRecipe(item.id));

                  navigation.navigate('Detail');
                }}
              >
                <ImageBackground
                  source={{uri: item.recipePicture}}
                  resizeMode="cover"
                  style={{width: 170, height: 170}}
                  imageStyle={{borderRadius: 10}}>
                  <Text
                    variant="labelLarge"
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      marginTop: 120,
                      margin: 10,
                      textShadowOffset: {width: -1, height: 1},
                      textShadowRadius: 10,
                      textShadowColor: 'rgb(0, 0, 0, 0.75)',
                    }}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
export default profileScreen;
