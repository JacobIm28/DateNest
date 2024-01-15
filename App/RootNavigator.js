import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen.js'
import EDataScreen from './screens/EDataScreen.js'
import VDataScreen from './screens/VDataScreen.js'
import LoadingScreen from './screens/LoadingScreen.js'

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="EDataScreen" component={EDataScreen} />
        <Stack.Screen name="VDataScreen" component={VDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;