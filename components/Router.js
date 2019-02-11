import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import ChatRoom from './screens/ChatRoom';
import TestScreen from './screens/TestScreen';

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
  }
}, {initialRouteName: 'TestScreen'});

export const Navigator = createAppContainer(RootStack);
