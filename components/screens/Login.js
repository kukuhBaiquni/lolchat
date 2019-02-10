import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {

  facebookLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken()
        .then((data) => {
          const {accessToken} = data;
          const responseInfoCallback = (error, result) => {
            console.log(result);
          }
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'name,picture,email'
                }
              }
            },
            responseInfoCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start()
        })
      }
    })
  }

  logout() {
    LoginManager.logOut()
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this.facebookLogin()} style={{height: 80, width: 250, backgroundColor: '#5ed9ff', justifyContent: 'center', alignItems: 'center'}}>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()} style={{height: 80, width: 250, backgroundColor: '#5ed9ff', justifyContent: 'center', alignItems: 'center'}}>
        </TouchableOpacity>
      </View>
    )
  }
}
