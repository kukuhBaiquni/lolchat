import { Navigator } from './Router';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

export default class Wrapper extends Component {
  constructor(props) {
    super(props)

    OneSignal.setLogLevel(7, 0);
    let requiresConsent = false;
    OneSignal.setRequiresUserPrivacyConsent(requiresConsent);
    OneSignal.init("cd4da7af-2270-4639-bc59-38f232825d3f");
    OneSignal.configure()
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
  }

  render() {
    return(
      <Navigator />
    )
  }
}
