/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {Avatar, Card, IconButton, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import {Button} from 'react-native-paper';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {addRecipe, getSelectRecipe} from '../store/redusers/recipeSlice';
import {useNavigation} from '@react-navigation/native';
import {category} from '../store/redusers/recipeSlice';

function profileScreen(props) {
  const navigate = useNavigation();
  const {navigation} = props;
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [keyword, setKeyword] = React.useState('');
  const [resipesList, setRecipesList] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [nameList, setNameList] = React.useState();

  // console.log('isi :', props);

  // React.useEffect(()=>{
  // const category = (state.recipe.nameCategory);
  // },[]);

  React.useEffect(() => {
    const nama = state?.recipe?.nameCategory;
    // setNameList = nama
    axios
      .get(`https://pijar-food-sonny.onrender.com/recipes/category/${nama}`)
      .then(res => {
        setRecipes(res?.data?.data ?? []);
        setNameList(nama);
        // console.log('hasil :', res?.data?.data);
      })
      .catch(err => console.log('error :', err));

    // Contoh
    axios
      .get('https://pijar-food-sonny.onrender.com/recipes')
      .then(res => {
        console.log(res?.data?.data ?? []);
        // console.log(res.data.data);
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
        </View>
        {/* End Header */}
        <View
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginBottom: 10,
            backgroundColor: '#fff',
            width: '96%',
            height: 50,
          }}>
          <Text
            variant="labelLarge"
            style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop:5}}>
            Menu Category
          </Text>
        </View>
        <View
          style={{
            // display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            marginLeft:15
            // marginTop: 10,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Chicken'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-chiken.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Chicken</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Snacks'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-snacks.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Snacks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Ice Cream'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-es.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Ice Cream</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Mie'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-mie.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Mie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Vegeterian'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-salad.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Vegeterian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Seafood'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-seafood.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Seafood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Meat'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-met.jpg')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Meat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(category('Other Food'));
              navigation.navigate('Category');
            }}
            style={{marginBottom: 20}}>
            <Image
              source={require('../assets/icon-other-food.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <Text style={{textAlign: 'center'}}>Other Food</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
export default profileScreen;
