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
import { Avatar, Card, IconButton, Searchbar } from 'react-native-paper';
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
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(keyword);

  const hendelSearch = () => {
    setIsLoading(true);
    axios
      .get(`https://pijar-food-be-one.vercel.app/recipes`, {
        params: {
          keyword,
        },
      })
      .then(response => {
        setRecipesList(response?.data?.data);
      })
      .catch(err => {
        // Alert.alert('Warning', err.response.data.messages, [{style: 'cancel'}]),
        console.log('gagal :', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log('isi :', resipesList);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        width: '100%',
        height: 900,
        backgroundColor: '#AED9B9',
      }}>
      <ScrollView>
        {/* Start Header */}
        <View>
          <View
            resizeMode="cover"
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Button onPress={() => navigation.goBack()}>
              <Icon
                name="arrowleft"
                size={25}
                color="#fff"
                style={{
                  marginTop: 18,
                }}
              />
            </Button>
            <Searchbar
              style={{
                backgroundColor: '#EFEFEF',
                borderRadius: 15,
                width: 240,
                height: 50,
                textAlign: 'center',
              }}
              placeholder="Search Recipe"
              onChangeText={value => setKeyword(value)}
              // onKeyDown={e => {
              //   if (e.keyCode === 13) {
              //     hendelSearch();
              // }
              // }}
            />
            <View>
              <Button
                mode="contained"
                style={{
                  backgroundColor: '#637D76',
                  marginLeft: 5,
                  marginRight:10,
                  marginTop: 5,
                }}
                onPress={hendelSearch}
                disabled={isLoading}>
                <Text>{isLoading === true ? 'Loading...' : 'Search'}</Text>
              </Button>
            </View>
          </View>

          {keyword?.length > 0 ? (
            <View
              style={{
                marginTop: 20,
                marginLeft: 10,
                paddingLeft: 10,
                paddingBottom: 10,
              }}>
              {/* {console.log('resipesList', resipesList)} */}
              {resipesList.map((item, key) => (
                <>
                  {/* <View>
                  <Text style={{textAlign: 'center',fontSize: 20,}}> Hasil Pencarian</Text>
                </View> */}
                  <View>
                    <TouchableOpacity
                      style={{marginTop: 5, marginRight: 10}}
                      key={key}
                      onPress={() => {
                        dispatch(addRecipe(item));
                        dispatch(getSelectRecipe(item.id));

                        navigation.navigate('Detail');
                      }}>
                      <Card.Title
                        style={{
                          backgroundColor: '#ffff',
                          borderRadius: 5,
                          marginBottom: 10,
                        }}
                        title={item.title}
                        subtitle={item?.ingredients}
                        left={props => (
                          <Avatar.Image
                            size={50}
                            source={{uri: item.recipePicture}}
                          />
                        )}
                      />

                      {/* <ImageBackground
                        source={{
                          uri: item.recipePicture,
                          // boxShadowColor: 'rgba(0, 0, 0, 0.75)',
                        }}
                        resizeMode="cover"
                        style={{
                          width: '100%',
                          height: 200,
                          position: 'relative',
                        }}
                        imageStyle={{borderRadius: 10}}>
                        <Text
                          variant="labelLarge"
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            position: 'absolute',
                            margin: 10,
                            bottom: 10,
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 10,
                            textShadowColor: 'rgb(0, 0, 0, 0.75)',
                          }}
                          numberOfLines={1}>
                          {item.title}
                        </Text>
                      </ImageBackground> */}
                    </TouchableOpacity>
                  </View>
                </>
              ))}
            </View>
          ) : (
            <View>
              <Text style={{textAlign: 'center', marginTop: 20}}>
                Recipe not found
              </Text>
            </View>
          )}
        </View>
        {/* End Header */}
      </ScrollView>
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
});
export default profileScreen;
