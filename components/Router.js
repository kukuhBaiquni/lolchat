import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import ChatRoom from './screens/ChatRoom';
import Profile from './screens/profile/main';
import TestPhone from './screens/TestPhone';
import Notifications from './screens/Notifications';
import Settings from './screens/profile/settings';
import SettingDetails from './screens/profile/settingDetails';


const ProfileStack = createStackNavigator({
  Main: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  SettingDetails: {
    screen: SettingDetails,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
}, {initialRouteName: 'Main'})

const ProfileContainer = createAppContainer(ProfileStack)

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
    screen: ProfileContainer,
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
