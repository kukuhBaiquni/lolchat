import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {facebookLogin} from '../../config/FacebookLogin';

export default class Login extends Component {

  logout() {
    LoginManager.logOut()
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => facebookLogin()} style={{height: 80, width: 250, backgroundColor: '#5ed9ff', justifyContent: 'center', alignItems: 'center'}}>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()} style={{height: 80, width: 250, backgroundColor: '#5ed9ff', justifyContent: 'center', alignItems: 'center'}}>
        </TouchableOpacity>
      </View>
    )
  }
}
