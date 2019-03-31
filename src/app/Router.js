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
    Main                : { screen: Profile },
    Settings            : { screen: Settings },
    SettingDetails      : { screen: SettingDetails }
}, {initialRouteName    : 'Main'})

const ProfileContainer = createAppContainer(ProfileStack);

const RootStack = createStackNavigator({
    Login               : { screen: Login },
    LoginViaPhone       : { screen: LoginViaPhone },
    Register            : { screen: Register },
    ChatRoom            : { screen: ChatRoom },
    Profile             : { screen: ProfileContainer },
    Register            : { screen: Register },
    TestUpload          : { screen: TestUpload },
}, initialRouteName);

const initialRouteName = {initialRouteName: 'Register'}

export const Navigator = createAppContainer(RootStack);
