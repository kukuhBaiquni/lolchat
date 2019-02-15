import { Navigator } from './Router';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';

export default class Wrapper extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return(
      <Navigator />
    )
  }
}
