import React, { Container } from 'react';
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import api from '../../src/calls.js'
import * as Application from 'expo-application';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ navigation }) => {
    const deviceId = Application.androidId

    useEffect(() => {
        api.getUser(deviceId).then((user) => {
            if (!user) {
                api.addUser({ deviceId, dates: [] })
                    .then(() => {
                        navigation.navigate('MainScreen')
                    }).catch((e) => {
                        console.log('Error', e)
                    })
            }
            navigation.navigate('MainScreen')
        })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffb6c1'}}>
            <LottieView source={require('../../assets/heart.json')}
                autoPlay
                loop={true}
            />
           <Image source={require('../../assets/title.png')} style={{top:'28%', right: '7%'}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 32,
    },
    buttonStyle: {
        height: 54,
        width: '80%',
        marginTop: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2EE59D',
        shadowRadius: 5,
        shadowOpacity: 0.7,
        shadowColor: 'rgba(46, 229, 157, 0.5)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    buttonTextStyle: {
        color: '#fdfdfd',
        fontWeight: '700',
    },
});


export default LoadingScreen