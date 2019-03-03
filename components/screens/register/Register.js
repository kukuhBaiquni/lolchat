import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, TextInput, Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { facebookLogin } from '../../../config/FacebookLogin';
import { fonts } from '../../../config/FontList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styling } from './styles';
import { registerValidation } from '../../../config/RegisterValidation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
      firstName: '',
      lastName: '',
      gender: false,
      password: '',
      error: [],
      p: 0,
      loading: new Animated.Value(0)
    }
  }

  renderFirstNameForm() {
    const { firstName, error } = this.state;
    const color = error.includes('firstName') ? 'red' : '#00f5d0';
    return(
      <View style={[styles.textInputContainer, {borderColor: color}]}>
        <View style={[styles.textInputIcon, {backgroundColor: color}]}>
          <Icon name='user-circle-o' color='black' size={20} />
        </View>
        <TextInput
          style={[styles.textInputValue, {width: '85%'}]}
          maxLength={16}
          autoCapitalize='words'
          placeholder='Nama Depan'
          onChangeText={(x) => this.setState({firstName: x})}
          value={firstName}
          />
      </View>
    )
  }

  renderLastNameForm() {
    const { lastName, error } = this.state;
    const color = error.includes('lastName') ? 'red' : '#00f5d0';
    return(
      <View style={[styles.textInputContainer, {borderColor: color}]}>
        <View style={[styles.textInputIcon, {backgroundColor: color}]}>
          <Icon name='user-circle-o' color='black' size={20} />
        </View>
        <TextInput
          style={[styles.textInputValue, {width: '85%'}]}
          maxLength={16}
          autoCapitalize='words'
          placeholder='Nama Belakang'
          onChangeText={(x) => this.setState({lastName: x})}
          value={lastName}
          />
      </View>
    )
  }

  renderGender() {
    const { gender } = this.state;
    return(
      <View style={[styles.textInputContainer, {borderColor: '#00f5d0'}]}>
        <View style={[styles.textInputIcon, {backgroundColor: '#00f5d0'}]}>
          <Icon name={gender ? 'male' : 'female'} color='black' size={20} />
        </View>
        <TextInput
          style={[styles.textInputValue, {width: '66%'}]}
          editable={false}
          maxLength={35}
          placeholder={gender ? 'Pria' : 'Wanita'}
          placeholderTextColor='black'
          />
        <TouchableOpacity
          onPress={() => this.setState({gender: !gender})}
          style={[styles.textInputIcon, {width: 50, backgroundColor: '#00f5d0'}]} >
          <Icon name='chevron-right' color='black' size={17} />
        </TouchableOpacity>
      </View>
    )
  }
  renderPassword() {
    const { password, showPassword, error } = this.state;
    const color = error.includes('password') ? 'red' : '#00f5d0';
    return(
      <View style={[styles.textInputContainer, {borderColor: color}]}>
        <View style={[styles.textInputIcon, {backgroundColor: color}]}>
          <Icon name='lock' color='black' size={20} />
        </View>
        <TextInput
          style={styles.textInputValue}
          maxLength={16}
          secureTextEntry={!showPassword}
          placeholder='Password'
          onChangeText={(x) => this.setState({password: x})}
          value={password}
          />
        <TouchableOpacity onPress={() => this.setState({showPassword: !showPassword})} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} color='#606060' size={20} />
        </TouchableOpacity>
      </View>
    )
  }

  submitForm() {
    const { firstName, lastName, password, loading } = this.state;
    const status = registerValidation(firstName, lastName, password);
    this.setState({error: status})
    Animated.sequence([
      Animated.timing(loading, {
        toValue: ((SCREEN_WIDTH*0.85)*0.25),
        duration: (Math.random() * 3)*1000
      }),
      Animated.timing(loading, {
        toValue: ((SCREEN_WIDTH*0.85)*0.5),
        duration: (Math.random() * 3)*1000
      }),
      Animated.timing(loading, {
        toValue: ((SCREEN_WIDTH*0.85)*0.75),
        duration: (Math.random() * 3)*1000
      }),
      Animated.timing(loading, {
        toValue: ((SCREEN_WIDTH*0.85)),
        duration: (Math.random() * 3)*1000
      }),
    ]).start()
  }

  render() {
    const { error, loading, p } = this.state;
    return(
      <View style={styles.container}>
        <Text style={[{color:'white'}, styles.loginText]}>
          <Text style={[styles.loginText, {color: '#00f5d0'}]}>R</Text>egister..
        </Text>
        <View style={{width: SCREEN_WIDTH*0.85}}>
          <View>
            {this.renderFirstNameForm()}
            {error.includes('firstName') && <Text style={c.alert}>Minimal 3 karakter dan hanya mengandung huruf dan angka</Text>}
            {this.renderLastNameForm()}
            {error.includes('lastName') && <Text style={c.alert}>Minimal 3 karakter dan hanya mengandung huruf dan angka</Text>}
            {this.renderGender()}
            {this.renderPassword()}
            {error.includes('password') && <Text style={c.alert}>Minimal 3 karakter dan hanya mengandung huruf dan angka</Text>}
          </View>
          <View style={{marginTop: 10}}>
            <TouchableNativeFeedback
              onPress={() => this.submitForm()}
              background={TouchableNativeFeedback.Ripple('black', false)}
              >
              <View style={styles.touchableArea}>
                <Text style={styles.submitText}>Submit</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: 'white', fontSize: 11, marginBottom: 10}}>Tunggu Sebentar ya.. lagi buat akun</Text>
            <View style={{height: 10, width: '100%', borderColor: '#00f5d0', borderWidth: 1, borderRadius: 5}}>
              <Animated.View style={{height: 8, backgroundColor: '#00f5d0', width: loading, borderRadius: 5}} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(styling);
const c = StyleSheet.create({
  alert: {
    color: 'red',
    fontSize: 9,
    textAlign: 'center'
  }
})
