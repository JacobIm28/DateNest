import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  //General
  screen: {

  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  text1: {
    fontSize: 20
  },
  text2: {
    fontSize: 17,
    opacity: .8,
    color: '#0099cc',
    marginTop: 6
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

  //Headers
  appbarContent: {
    textAlign: "center",
    fontSize: 25
  },
  appbarAction: {
    position: "absolute",
    right: 0
  },
  appbarBack: {
    position: "absolute"
  },


  //icons
  trash: {
    top: "5%",
    borderRadius: 10,
    right: "8%"
  },
  avatar: {
    // width: "3%", 
    // height: '3%', 
    height: '10%',
    borderRadius: 70,
    marginRight: 23
  },
});


export default styles