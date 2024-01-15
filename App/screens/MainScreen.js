import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Dimensions, Easing, SafeAreaView, SafeAreaViewBase, FlatList, Animated } from 'react-native';
import * as Application from 'expo-application';
import api from '../../src/calls.js'
import { Entypo, Feather } from 'react-native-vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get('screen');
import styles from '../styles/styles.js'

const MainScreen = ({ navigation }) => {
  const deviceId = Application.androidId

  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()
  const SPACING = 18;
  const AVATAR_SIZE = 70;
  const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;


  useEffect(() => {
    api.getMyDates(deviceId).then((dates) => {
      setDates(dates)
    }).catch((e) => {
      console.log(e)
    })
  }, [isFocused, loading])

  /*
    * @param _id is the objectId of the date to be deleted
    */
  const deleteItem = (date) => {
    setLoading(true)
    api.deleteDate(deviceId, date)
      .then((response) => {
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
      })
      .catch((e) => console.log(e))
  }

  const trimName = (name) => {
    const names = name.split(' ')
    if (name.length < 8) {
      return name
    } else if (names.length === 1) {
      return name.substring(0, 6) + '...'
    }
    else {
      return names[0][0] + '. ' + names[1]
    }
  }

  const formatPhone = (phone) => {
    phone = phone.replace(/-/g, '')
    return '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + ' - ' + phone.substring(6, 10)
  }

  const scrollY = React.useRef(new Animated.Value(0)).current;

  return <View style={{ height: height, bottom: 0, backgroundColor: '#FFD3DA', ...StyleSheet.absoluteFillObject }}>
    <View style={{ backgroundColor: '#FF7A93', alignItems: "center", height: '13%', borderBottomColor: 'black', borderBottomWidth: 1 }}>
      <Image source={require('../../assets/logo.png')} style={{ marginBottom: 10, }} />
      {/* <BlurView
        // style={styles.blurView}
        // blurRadius={1}
        // blurType={blurType}
      >
        <Image source={require('../../assets/logo.png')} style={{ backgroundColor: 'black', position: 'absolute', blurRadius: "50%", borderColor: 'gray', borderWidth: 5 }} />
      </BlurView> */}

      <TouchableOpacity
        style={{
          marginTop: 45,
          marginRight: 20,
          position: 'absolute',
          right: 0,
        }}
        onPress={() => navigation.navigate('EDataScreen')}
      >
        <Feather name="user-plus" size={32} color='#3B3B3B' />
      </TouchableOpacity>
    </View>
    <Animated.FlatList
      data={dates}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      keyExtractor={item => item._id}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 20
      }}
      renderItem={({ item, index }) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + .5)
        ]

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })

        return <View>
          <Animated.View
            style={{
              flexDirection: 'row',
              padding: 18,
              marginBottom: 10,
              backgroundColor: '#FFF',
              borderRadius: 50,
              borderColor: "#979797",
              borderWidth: 2,
              transform: [{ scale }]
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VDataScreen', { item })}>
              <Image
                source={item.image ? { uri: item.image } : (require('../../assets/avatar.png'))}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING + 5
                }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('VDataScreen', { item })}>
                <Text style={{ fontSize: height * 0.022, fontWeight: '700' }}>
                  {trimName(item.name)} {item.age && <Text>, {item.age}</Text>}</Text>
                <Text style={{ fontSize: height * 0.014, opacity: .8, color: '#0099cc', marginTop: 6 }}>
                  {item.phoneNumber ? formatPhone(item.phoneNumber) : "No contact info"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.trash}
              onPress={() => deleteItem(item)}>
              <Entypo name="trash" size={30} color='#525252' />
            </TouchableOpacity>
          </Animated.View>
        </View>
      }}
    />
  </View >
}

/// Just some styles
export default MainScreen