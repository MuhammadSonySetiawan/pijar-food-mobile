/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { GiftedChat , Bubble} from 'react-native-gifted-chat';

import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import EmojiSelector from 'react-native-emoji-selector';

import { Appbar, Avatar } from 'react-native-paper';

function messageScreen(props) {
    const { navigation } = props;
    const [messages, setMessages] = useState([]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    image:
                        require('../assets/profile.png'),
                    createdAt: new Date(),
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://gravatar.com/avatar/668e357ca01060e52e0025452546a170?s=400&d=robohash&r=x',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor:'#AED9B9', padding:10}}>
            {/* Top Chat  */}
            <Appbar.Header style={{margin:-13}}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Chat Community" />
            </Appbar.Header>
            {/* Body Chat */}
            <GiftedChat style={{borderRadius:50}}
                messages={messages}
                onSend={messages => onSend(messages)}

                user={{
                    _id: user?.id,
                    name: user?.fullname,
                    avatar:
                        require('../assets/profile.png'),
                }}
                onInputTextChanged={value => {
                    setShowEmoji(false);
                    setText(value);
                    }}
                textInputProps={{ onSubmitEditing: () => setShowEmoji(false) }}
                text={text}
                alwaysShowSend renderActions={() => (
                    <View style={{height: '100%', justifyContent:'center', left:5}}>
                        <TouchableOpacity onPress={() => {
                            setShowEmoji(true);
                            Keyboard.dismiss();
                            }}>
                            <Icon name='emotsmile' size={25} style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                )}
                renderBubble={ props => {
                    return (
                        <Bubble
                        {...props}
                        textStyle={{
                            right:{
                                color:'#231F20',
                                fontFamily: 'CerebriSans-Book',
                            },
                            left:{
                                color:'Red',
                                fontFamily: 'CerebriSans-Book',
                            },
                        }}
                        wrapperStyle={{
                            left:{
                                backgroundColor: '#E6F5F3',
                            },
                            right:{
                                backgroundColor: '#E6DEB0',
                            },
                        }}
                        />
                    );
                }}
            />
            {showEmoji ? (<EmojiSelector onEmojiSelected={emoji => setText(`${emoji}${text}`)} />) : null}
        </View>
    );
}

export default messageScreen;