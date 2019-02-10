import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class Login extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return(
      <View>
        <Text onPress={() => this.props.navigation.navigate('ChatRoom')}>Login</Text>
      </View>
    )
  }
}
