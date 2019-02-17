import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import ChatRoom from './screens/ChatRoom';
import Profile from './screens/profile/main';
import TestPhone from './screens/TestPhone';
import Notifications from './screens/Notifications';

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
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  TestPhone: {
    screen: TestPhone,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
}, {initialRouteName: 'Profile'});

export const Navigator = createAppContainer(RootStack);
