import { database, datatype } from 'faker';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Image, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { supported32BitAbis } from 'react-native-device-info';
import { Appbar } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');
import { AppStyles } from '../AppStyles';
import InputScrollView from 'react-native-input-scroll-view';

const VDataScreen = ({ route, navigation }) => {

  const date = route.params.item

  const formatPhone = (phone) => {
    phone = phone.replace(/-/g, '')
    return '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + ' - ' + phone.substring(6, 10)
  }
  const formatLastDate = (lastDate) => {
    return lastDate.substring(0,2) + '/' + lastDate.substring(2,4) + '/' + lastDate.substring(4,8)
  }
  const trimName = (name) => {
    const names = name.split(' ')
    if (name.length < 18) {
      return name
    } else if (names.length === 1) {
      return name.substring(0, 18) + '...'
    }
    else {
      return names[0][0] + '. ' + names[1]
    }
  }

  const onPress = async (e) => {
    e.preventDefault()

    //save data to db
    navigation.navigate('MainScreen')
  }

  //Style all the information about date

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container} enabled>
      <View style={{ width: '100%' }}>
        <Appbar.Header style={{ backgroundColor: '#FF7A93' }}>
          <Appbar.Content
            title={trimName(date.name)}
            titleStyle={{ textAlign: 'center', fontSize: 25 }}
          />
          <Appbar.BackAction
            style={{ position: 'absolute' }}
            onPress={navigation.goBack}
          />
        </Appbar.Header>
      </View>
      <Image
        source={date.image ? { uri: date.image } :
          (require('../../assets/avatar.png'))}
        style={{
          width: 324,
          height: 252,
          borderRadius: 20,
          marginTop: 45
        }}
      />
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          editable={false}
          placeholder={date.age ? `Age:                                                            ${date.age.toString()}` :
            'No Age Found'}
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          editable={false}
          style={styles.body}
          placeholder={date.phoneNumber ? `Phone Number:                 ${formatPhone(date.phoneNumber)}` : 'No Phone Number Found'}
          placeholderTextColor="black"
        />
      </View>

      <View style={styles.InputContainer}>
        <TextInput
          editable={false}
          style={styles.body}
          placeholder={date.numberOfDates? `Number of Dates:                                     ${date.numberOfDates.toString()} `: 'No # of Dates Found'}
          placeholderTextColor="black"
        />
      </View>

      <View style={styles.InputContainer}>
        <TextInput
          editable={false}
          style={styles.body}
          placeholder={date.lastDate? `Last Date:                                   ${formatLastDate(date.lastDate)}` : 'No Last Date Found'}
          placeholderTextColor='black'
        />
      </View>
      <View style={styles.InputContainerNotes}>
      <InputScrollView>
        <TextInput
          editable={false}
          style={styles.bodyNotes}
          placeholder= {date.notes? `Notes: \n${date.notes}`: 'No Notes Found'}
          placeholderTextColor="black"
          multiline
        />
      </InputScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffb6c1'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 17,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  InputContainerNotes: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    paddingTop: 15,
    paddingBottom: 15,
    height: '17%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  bodyNotes: {
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  button1: {
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#68BBE3',
    padding: 10,
    marginTop: 20,
    flexDirection: 'row'
  },
  button2: {
    width: 330,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: '#0E86D4',
    padding: 10,
    marginTop: 20,
  }
});

export default VDataScreen;