import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import ChatRoom from './screens/ChatRoom';
import Profile from './screens/profile/main';
import LoginViaPhone from './screens/login/LoginViaPhone';
import Settings from './screens/profile/settings';
import SettingDetails from './screens/profile/settingDetails';
import TestUpload from './TestUpload';

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

const ProfileContainer = createAppContainer(ProfileStack);

const RootStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  LoginViaPhone: {
    screen: LoginViaPhone,
    navigationOptions: ({navigation}) => ({
      headerTintColor: '#00f5d0',
      headerStyle: {
        backgroundColor: 'black'
      },
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      title: 'Gabon',
      headerTintColor: '#00f5d0',
      headerStyle: {
        backgroundColor: 'black'
      },
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
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  TestUpload: {
    screen: TestUpload,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
}, {initialRouteName: 'Login'});

export const Navigator = createAppContainer(RootStack);
