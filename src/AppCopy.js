/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    ImageBackground,
    Image,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
    PaperProvider,
    Button,
} from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/homeScreen';

const Stack = createNativeStackNavigator()

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };



    return (

        <PaperProvider>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <View style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        padding: 15,
                    }}>


                        {/* <Home backgroundColor={backgroundStyle} /> */}
                        <NavigationContainer>
                            <Stack.Navigator>
                                <Stack.Screen name="Home" component={Home} />
                            </Stack.Navigator>
                        </NavigationContainer>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
