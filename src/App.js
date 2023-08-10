/* eslint-disable prettier/prettier */
// In App.js in a new project

import * as React from 'react';
import { View, Text,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Button} from 'react-native-paper';

import Home from './pages/homeScreen';
import Detail from './pages/details_screen';
import Register from './pages/registerScreen';
import Login from './pages/loginScreen';
import EddRecipes from './pages/eddScreen';
import Message from './pages/messageScreen';
import Profile from './pages/proifleScreen';
import FirstPage from './pages/firstPage';
import allUser from './pages/allUserScreen';
import editProfile from './pages/editScreen';
import search from './pages/searchScreen';

import { store } from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './store/redusers/user';


const Stack = createNativeStackNavigator();

function App() {
  // const dispatch = useDispatch();
  // const {useData, login } = useSelector(state => state.User)
  // const getUser = async () =>{
  //   let data =await
  // }

  const [isLogin, setIsLogin] = React.useState(false);

  // React.useEffect(() =>{
  //  (async () =>{
  //    const token = await AsyncStorage.getItem('token');
  //    if (token) {
  //      setIsLogin(true);
  //    }
  //  })();
  // }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstPage">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EddRecipes"
            component={EddRecipes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Message"
            component={Message}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="allUser"
            component={allUser}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfile"
            component={editProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FirstPage"
            component={FirstPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="search"
            component={search}
            options={{headerShown: false}}
          />
          {isLogin ? (
            <></>
          ) : (
            <>
              <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;