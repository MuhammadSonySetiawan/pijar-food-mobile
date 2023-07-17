/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import Icon6 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon7 from 'react-native-vector-icons/dist/Octicons';

import { Button, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
function profileScreen(props) {
    const { navigation } = props;
    const [type, SetType] = React.useState('ingridien')

    const hendleLogOut = () => { 
        AsyncStorage.clear()
        props.navigation.navigate('Login')
    };
    return (
        <View style={{
            flex: 1,
            alignItems: 'flex-start',
        }}>
            {/* Start Header */}
            <View style={{
                flex: 1,
                width: '100%',
                height: 400,
            }}>
                <View
                    resizeMode="cover"
                    style={{ width: '100%', height: 900, backgroundColor:'#AED9B9' }}>
                    <Button onPress={() => navigation.goBack()}>
                        <Icon name='arrowleft' size={25} color='#fff' style={{ marginLeft: -355, marginTop: 20 }} />
                    </Button>

                    <View style={{}}>
                        <View style={{ borderRadius: 100 ,marginLeft: 130 }}>
                        {/* <ImageBackground source={require('../assets/tahu_kupat.jpg')}
                                style={styles.photoProfile} /> */}
                            <Avatar.Image size={150} source={{uri :'https://gravatar.com/avatar/0898e56656e0aa2cdd0ee87e7ab341dc?s=400&d=robohash&r=x'}} />
                    </View>
                    <Text
                        variant="labelLarge"
                        style={styles.textWithShadow}
                        numberOfLines={1} >
                        Tahu Kupat Solo
                    </Text>
    
                    </View>
                </View>
            </View>
            {/* End Header */}

            {/* Start content */}
            <View style={{
                flex: 1,
                marginLeft:8,
                minWidth: '96%',
                height: 100,
                borderTopLeftRadius: 20,
                borderTopRightRadius:20,
                marginTop: -20,
                backgroundColor: '#fff'
            }}>
                {/* Start Navigasi Profile */}
                <View style={{marginLeft:20}}>
                    <View style={{ marginTop: 20, marginLeft: 1, flexDirection:'row', alignItems:'baseline' }}>
                        <Icon1 name='user' size={25} color='#637D76' />
                        <Text style={{fontSize:18, marginLeft:10, marginRight:185}}>Edit Profile</Text>
                        <Button onPress={() => navigation.goBack()}>
                            <Icon name='right' size={25} color='#637D76' />
                        </Button>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                        <Icon7 name='file-badge' size={25} color='#637D76' />
                        <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 190 }}>My Recipe</Text>
                        <Button onPress={() => navigation.goBack()}>
                            <Icon name='right' size={25} color='#637D76' />
                        </Button>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                        <Icon6 name='save-alt' size={25} color='#637D76' />
                        <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 165 }}>Saved Recipe</Text>
                        <Button onPress={() => navigation.goBack()}>
                            <Icon name='right' size={25} color='#637D76' />
                        </Button>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                        <Icon name='like2' size={25} color='#637D76' />
                        <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 170 }}>Liked Recipe</Text>
                        <Button onPress={() => navigation.goBack()}>
                            <Icon name='right' size={25} color='#637D76' />
                        </Button>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                        <Icon5 name='log-out-outline' size={25} color='#637D76' />
                        <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 210 }}>Log Out</Text>
                        <Button onPress={hendleLogOut}>
                            <Icon name='right' size={25} color='#637D76' />
                        </Button>
                    </View>
                </View>
                {/* End Navigasi Profile */}
            </View>
            {/* End Content */}
        </View>
    )
}

const styles = StyleSheet.create({
    textWithShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        marginTop: 20,
        // marginLeft: 10,
        marginLeft: 90
        // fontFamily: 'sans-serif'
    },
    textByRecipes: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        // fontWeight: 'bold',
        fontSize: 15,
        color: '#fff',
        marginLeft: 90
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
    photoProfile:{
        width: 150,
        height: 150,
    },


});
export default profileScreen;