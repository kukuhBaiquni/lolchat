import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { facebookLogin } from '../../../config/FacebookLogin';
import { fonts } from '../../../config/FontList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styling } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  logout() {
    LoginManager.logOut()
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={[{color:'white'}, styles.loginText]}>
          <Text style={[styles.loginText, {color: '#00f5d0'}]}>R</Text>egister..
        </Text>
        <View style={{width: SCREEN_WIDTH*0.85}}>
          <View>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputIcon}>
                <Icon name='user-circle-o' color='black' size={20} />
              </View>
              <TextInput
                style={[styles.textInputValue, {width: '85%'}]}
                maxLength={35}
                keyboardType='email-address'
                placeholder='Email'
                />
            </View>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputIcon}>
                <Icon name='lock' color='black' size={20} />
              </View>
              <TextInput
                style={styles.textInputValue}
                maxLength={16}
                secureTextEntry={!this.state.showPassword}
                placeholder='Password'
                />
              <TouchableOpacity onPress={() => this.setState({showPassword: !this.state.showPassword})} style={styles.eyeIcon}>
                <Icon name={this.state.showPassword ? 'eye-slash' : 'eye'} color='#606060' size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('black', false)}
              >
              <View style={styles.touchableArea}>
                <Text style={styles.submitText}>Submit</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(styling);
