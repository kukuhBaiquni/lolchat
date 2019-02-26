import { Navigator } from './Router';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { store } from '../store';
import { StatusBar } from 'react-native';

export default class Wrapper extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return(
      <Provider store={store}>
        <StatusBar
          backgroundColor='black'
          barStyle='light-content'
          />
        <Navigator />
      </Provider>
    )
  }
}
