import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import ChatRoom from './screens/ChatRoom';
import TestScreen from './screens/TestScreen';
import TestPhone from './screens/TestPhone';

const RootStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  TestScreen: {
    screen: TestScreen,
    navigationOptions: ({navigatio}) => ({
      header: null
    })
  },
  TestPhone: {
    screen: TestPhone,
    navigationOptions: ({navigatio}) => ({
      header: null
    })
  }
}, {initialRouteName: 'TestPhone'});

export const Navigator = createAppContainer(RootStack);
