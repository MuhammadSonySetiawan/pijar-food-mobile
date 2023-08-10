/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, Card, Searchbar, PaperProvider, Avatar} from 'react-native-paper';
import {
  ScrollView,
  View,
  ImageBackground,
  Image,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {addRecipe, getSelectRecipe} from '../store/redusers/recipeSlice';

import database from '@react-native-firebase/database';
// import analytics from '@react-native-firebase/analytics';

function homeScreen(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  // console.log('hasil :', state.recipe);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeSearch = query => setSearchQuery(query);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [recipes, setRecipes] = React.useState([]);
  const [popular, setPopuler] = React.useState([]);

  React.useEffect(() => {
    // New Recipe
    axios
      .get('https://pijar-food-sonny.onrender.com/recipes')
      .then(res => {
        setRecipes(res?.data?.data ?? []);
        // console.log(res.data.data);
      })
      .catch(err => console.log('error :', err));

    // Populer Recipe
    axios
      .get('https://pijar-food-sonny.onrender.com/recipes?sortType=asc')
      .then(res => {
        setPopuler(res?.data?.data ?? []);
        console.log('hasil :', res.data.data);
      })
      .catch(err => console.log('hasil :', err));
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: '#AED9B9',
              height: 100,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('search')}>
              <Searchbar
                style={{backgroundColor: '#EFEFEF', borderRadius: 15}}
                placeholder="Search Pasta, Bread, etc"
                // onChangeText={onChangeSearch}
                // value={searchQuery}
                onChangeText={() => navigation.navigate('search')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{backgroundColor: '##EFEFEF', height: '100%', padding: 15}}>
            <ScrollView>
              {/* start popular recipes */}
              <View style={{marginTop: 5}}>
                <Text variant="labelLarge" style={{fontSize: 20}}>
                  New Recipes
                </Text>
                <Text
                  variant="labelMedium"
                  style={{fontSize: 14, marginTop: 5}}>
                  New Recipes
                </Text>
              </View>

              <View style={{marginTop: 10}}>
                <ScrollView horizontal>
                  {recipes.map((item, key) => (
                    <TouchableOpacity
                      style={{marginTop: 10, marginRight: 10}}
                      key={key}
                      onPress={() => {
                        dispatch(addRecipe(item));
                        dispatch(getSelectRecipe(item.id));

                        navigation.navigate('Detail');
                      }}>
                      <ImageBackground
                        source={{uri: item.recipePicture}}
                        resizeMode="cover"
                        style={{width: 250, height: 150}}
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
                </ScrollView>
              </View>
              {/* end popular recipes */}
              {/* start new recipes */}
              <View
                style={{
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text variant="labelLarge" style={{fontSize: 20}}>
                  Category
                </Text>
                <Text
                  variant="labelMedium"
                  style={{fontSize: 14, color: '#6D61F2'}}>
                  More info
                </Text>
              </View>
              <ScrollView horizontal>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-chiken.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>chicken</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-cinesfood.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>Chinese Food</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-es.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>Ice Cream</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-mie.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>Mie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-salad.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>Salad</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../assets/icon-seafood.jpg')}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{textAlign: 'center'}}>Seafood</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              {/* end new recipes */}

              {/* start popular for you */}
              <View style={{marginTop: 20, marginBottom: 10}}>
                <Text variant="labelLarge" style={{fontSize: 20}}>
                  Popular Recipes
                </Text>
              </View>
              <ScrollView style={{marginBottom: 80}}>
                {popular.map((item, key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      dispatch(addRecipe(item));
                      dispatch(getSelectRecipe(item.id));

                      navigation.navigate('Detail');
                    }}
                    style={{
                      width: 250,
                      height: 210,
                      // marginRight: 10,
                      marginBottom: -80,
                    }}>
                    {/* <Card.Title
                      style={{
                        // backgroundColor: '#ffff',
                        borderRadius: 5,
                        backgroundColor:'red',
                        width:380,
                        height:150
                      }}
                      title={item.title}
                      subtitle={item?.ingredients}
                      left={props => (
                        // <Avatar.Image
                        //   size={50}
                        //   source={{uri: item.recipePicture}}
                        // />
                        <Image
                          source={{uri: item.recipePicture}}
                          style={{
                            width: 120,
                            height: 120,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                        />
                      )}
                    /> */}
                    <View
                      style={{
                        width: 381,
                        height: 120,
                        // marginRight: 10,
                        marginBottom: 100,
                        backgroundColor: '#AED9B9',
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: 5,
                      }}>
                      <Image
                        source={{uri: item.recipePicture}}
                        style={{
                          width: 100,
                          height: 100,
                          margin: 10,
                          borderRadius: 5,
                        }}
                      />
                      <View style={{marginTop: 20}}>
                        <Text
                          // variant="titleLarge"
                          style={{
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 10,
                            textShadowColor: 'rgb(0, 0, 0, 0.75)',
                            fontSize: 20,
                          }}
                          numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text
                          variant="bodyMedium"
                          style={{
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 10,
                            textShadowColor: 'rgb(0, 0, 0, 0.75)',
                          }}
                          numberOfLines={2}>
                          {item?.ingredients ?? 'ingridient not found'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* end popular for you */}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Start Bottom Navigate */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
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
              <Icon name="home" size={35} color="#75C9CC" />
              <Text style={{color: '#75C9CC'}}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EddRecipes')}>
              <Icon2
                name="plus-square"
                size={35}
                color="#666666"
                style={{marginLeft: 21}}
              />
              <Text>Add Recipe</Text>
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
        {/* End Bottom Navigate */}
      </SafeAreaView>
    </PaperProvider>
  );
}

export default homeScreen;
