/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/FontAwesome5';

import {Button} from 'react-native-paper';

import {WebView} from 'react-native-webview';
import recipeSlice, {
  addRecipe,
  getSelectRecipe,
} from '../store/redusers/recipeSlice';
import axios from 'axios';
import {useSelector} from 'react-redux';

function detailScreen(props) {
  const {navigation} = props;
  const state = useSelector(state => state);

  const [type, SetType] = React.useState('ingridien');
  const [createBy, setCreateBy] = React.useState();


  const {
    recipe: {recipeList, currentRecipe},
  } = useSelector(state => state);
  const [detailRecipe, setDetailRecipe] = React.useState(null);

    const token = state.userData.userData.token;


  // console.log(detailRecipe?.createby);
  const idUser = detailRecipe?.createby;
  axios
    .get(`https://pijar-food-sonny.onrender.com/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(result => {
      console.log('hasil :', result.data.data[0].fullName);
      setCreateBy(result.data.data[0].fullName);
    })
    // .then(res => console.log('hasil :', res))
    .catch(err => console.log('error :', err));
  // console.log(recipe);

  React.useEffect(() => {
    if (currentRecipe) {
      setDetailRecipe(recipeList.find(res => res.id === currentRecipe));
    }
  }, [recipeList, currentRecipe]);

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
        <ImageBackground
          source={{uri: detailRecipe?.recipePicture}}
          resizeMode="cover"
          style={{width: '100%', height: 500}}>
          <Button onPress={() => navigation.goBack()}>
            <Icon
              name="arrowleft"
              size={25}
              color="#fff"
              style={{marginLeft: -355, marginTop: 20}}
            />
          </Button>
          <Text
            variant="labelLarge"
            style={styles.textWithShadow}
            numberOfLines={1}>
            {detailRecipe?.title}
          </Text>
          <View style={styles.rowText}>
            <Text variant="labelLarge" style={styles.textByRecipes}>
              By
            </Text>
            <Text
              variant="labelLarge"
              style={styles.textByRecipes}
              numberOfLines={1}>
              {createBy ?? 'unknown'}
            </Text>
          </View>
        </ImageBackground>
      </View>
      {/* End Header */}

      {/* Start content */}
      <View
        style={{
          flex: 1,
          minWidth: '100%',
          height: 100,
          borderRadius: 20,
          marginTop: -20,
          backgroundColor: '#fff',
        }}>
        {/* Start Navigasi Content */}
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Button
            labelStyle={
              type === 'ingridien'
                ? styles.buttonActive
                : styles.buttonNonActive
            }
            onPress={() => SetType('ingridien')}
            style={styles.textBorderBottom}>
            ingridien
          </Button>
          <Button
            labelStyle={
              type === 'video' ? styles.buttonActive : styles.buttonNonActive
            }
            onPress={() => SetType('video')}
            style={{width: 100}}>
            Video
          </Button>
        </View>
        {/* End Navigasi Content */}
        {type === 'ingridien' ? (
          <ScrollView>
            <View style={{marginLeft: 28}}>
              <Text>{detailRecipe?.ingredients ?? 'ingridient not found'}</Text>
            </View>
          </ScrollView>
        ) : (
          <View style={{marginLeft: 28}}>
            <TouchableOpacity
              onPress={() => Linking.openURL(detailRecipe.videoLink)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon1
                name="play"
                size={25}
                color="#637D76"
                style={{marginRight: 20}}
              />
              <View>
                <Text variant="titleLarge" style={{fontSize: 16}}>
                  Video Tutorial
                </Text>
                <Text variant="labelSmall" style={{fontSize: 12}}>
                  {' '}
                  {detailRecipe?.title}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/* start ingridien */}
        {/* End ingridien */}

        {/* Strat Vidio */}
        {/* End Vidio */}
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
    marginTop: 200,
    marginLeft: 10,
    // fontFamily: 'sans-serif'
  },
  textByRecipes: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    marginLeft: 8,
  },
  buttonActive: {
    color: '#18172B',
    borderBottomColor: '#75C9CC',
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
  buttonNonActive: {
    color: '#666666',
  },
  rowText: {
    marginLeft:5,
    display: 'flex',
    flexDirection: 'row',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
});

export default detailScreen;
