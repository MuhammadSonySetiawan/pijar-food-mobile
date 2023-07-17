/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon2 from 'react-native-vector-icons/dist/Feather';

import { Button, PaperProvider } from 'react-native-paper';

import DocumentPicker, { types } from 'react-native-document-picker';
function eddScreen(props) {
    const { navigation } = props;

  const [fileResponse, setFileResponse] = React.useState([]);

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.docx],
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);
  return (
    <PaperProvider>
      <SafeAreaView style={{ backgroundColor: '#AED9B9', height: '100%' }}>

      <ScrollView style={{height:'90%'}}>
          <Text variant="labelLarge" style={{ fontSize: 30, color: '#637D76', textAlign: 'center', marginBottom:20 }}>
            Add Your Recipe
          </Text>

          <View>
            <View style={styles.input}>
              <Icon2 name='book-open' size={32} color='#637D76' style={{ marginRight: 5 }} />
              <TextInput placeholder="Title" style={{ fontSize: 18, padding: 5 }} />
            </View>

            <View style={{
              // height: 60,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: '#637D76',
              backgroundColor: '#fff'
            }}>
              <TextInput placeholder="Description" style={{ fontSize: 18, padding: 5, height: 200, borderColor: '#fff' }} />
            </View>

            <View style={styles.input}>
              <Icon2 name='video' size={32} color='#637D76' style={{ marginRight: 5 }} />
              <TextInput placeholder="Add Video" style={{ fontSize: 18, padding: 5 }} />
            </View>
            <View style={{marginLeft:120, marginTop:10}}>
              <Button mode="contained" onPress={() => console.log('Pressed')} style={{ width: 150, backgroundColor:'#637D76' }}>
                Post
              </Button>
            </View>
            

          </View>

      </ScrollView>
        <View style={{
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
              <Icon name='home' size={35} color='#666666' />
              <Text style={{ color: '#666666' }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EddRecipes')}>
              <Icon2 name='plus-square' size={35} color='#75C9CC' style={{ marginLeft: 21 }} />
              <Text color='#75C9CC'>Add Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <Icon2 name='message-circle' size={35} color='#666666' style={{ marginLeft: 12 }} />
              <Text>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Icon2 name='user' size={35} color='#666666' />
              <Text>Profile</Text>
            </TouchableOpacity>
          </View>
      </View>

      </SafeAreaView>
      </PaperProvider>
  )
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
