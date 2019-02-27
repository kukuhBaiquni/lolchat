import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { facebookLogin } from '../../config/FacebookLogin';
import { fonts } from '../../config/FontList';
import Icon from 'react-native-vector-icons/FontAwesome';

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
          <Text style={[styles.loginText, {color: '#00f5d0'}]}>L</Text>ogin..
        </Text>
        <View style={{width: SCREEN_WIDTH*0.85}}>
          <View>
            <View style={styles.textInputContainer}>
              <View style={styles.textInputIcon}>
                <Icon name='user-circle-o' color='black' size={20} />
              </View>
              <TextInput
                style={[styles.textInputValue, {width: '80%'}]}
                maxLength={35}
                keyboardType='email-address'
                placeholder='Email / Username'
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
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={[styles.forgotPasswordText, {fontSize: 20}]}>ATAU</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.sosmedWrapper}>
              <TouchableOpacity style={[styles.sosmedTouchArea, {backgroundColor: '#3175c4'}]}>
                <Icon name='facebook' color='white' size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sosmedTouchArea, {backgroundColor: '#c43131'}]}>
                <Icon name='google-plus' color='white' size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sosmedTouchArea, {backgroundColor: '#1aa320'}]}>
                <Icon name='phone' color='white' size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.forgotPasswordText}>Lupa Password?
              <Text style={{color: '#00f5d0'}}> Tap Disini</Text>
            </Text>
          </View>
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={styles.forgotPasswordText}>Belum Punya Akun?
              <Text style={{color: '#00f5d0'}}> Tap Disini</Text>
            </Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.appVerText}>App version 1.0.0</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  textInputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderWidth: 2,
    borderColor: '#00f5d0',
    borderColor: '#00f5d0'
  },
  textInputIcon: {
    height: 40,
    width: 40,
    backgroundColor: '#00f5d0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece'
  },
  textInputValue: {
    width: '62%',
    height: 45,
    fontSize: 16,
    fontFamily: 'JosefinSans-Bold',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 35,
    fontFamily: 'AllerDisplay'
  },
  touchableArea: {
    width: '100%',
    height: 50,
    backgroundColor: '#00f5d0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  eyeIcon: {
    width: '15%',
    borderLeftColor: '#606060',
    borderLeftWidth: 1,
    alignItems: 'center',
    height: 30,
    justifyContent: 'center'
  },
  forgotPasswordText: {
    fontFamily: 'AllerDisplay',
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontFamily: 'AllerDisplay',
    fontSize: 22
  },
  sosmedWrapper: {
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%'
  },
  sosmedTouchArea: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appVerText: {
    color: 'white',
    fontFamily: 'AllerDisplay'
  }
})
