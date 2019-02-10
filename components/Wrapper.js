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
    OneSignal.init("6d142fd0-4b10-4fdf-a575-bb60c1899c12");
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
