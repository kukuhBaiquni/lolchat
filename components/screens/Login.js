import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Login extends Component {
  render() {
    return(
      <View>
        <Text onPress={() => this.props.navigation.navigate('ChatRoom')}>Login</Text>
      </View>
    )
  }
}
