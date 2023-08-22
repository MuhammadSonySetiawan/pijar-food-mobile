/* eslint-disable prettier/prettier */
import React from 'react';

import {Text, Card, Searchbar, PaperProvider} from 'react-native-paper';
import {
  ScrollView,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import { useSelector } from 'react-redux';

const allUserScreen = () => {
    const user = useSelector(state => state);
    console.log(user);
  const onChangeSearch = query => setSearchQuery(query);

  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <PaperProvider>
      <SafeAreaView >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          >
          <View
            style={{
              backgroundColor: '#AED9B9',
              height: 80,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Searchbar
              style={{backgroundColor: '#EFEFEF', borderRadius: 15}}
              placeholder="Search Pasta, Bread, etc"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default allUserScreen