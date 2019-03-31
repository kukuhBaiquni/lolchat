import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, TextInput, Image, Dimensions, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import CodeInput from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { checkPhoneNumber, resetAll } from './Action';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

class LoginViaPhone extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.error !== this.props.user.error && this.props.user.data.status) {
      Alert.alert(
        'Login gagal',
        'Nomor kamu belum terdaftar, daftar sekarang?',
        [
          {text: 'OK', onPress: () => this.props.navigation.replace('Register', '+62' + this.state.phoneNumber)},
          {text: 'TIDAK'}
        ],
        { cancelable: false }
      );
      this.props.dispatch(resetAll())
    }
    if (prevProps.user.error !== this.props.user.error && !this.props.user.data.status) {
      Alert.alert(
        'Login gagal',
        'Login tidak berhasil, silahkan ulangi permintaan kamu.',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      );
      this.props.dispatch(resetAll())
    }
    if (prevProps.user.success !== this.props.user.success) {
      this.props.dispatch(resetAll())
      this.props.navigation.replace('Profile')
    }
  }

  // componentDidMount() {
  //   this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user: user.toJSON() });
  //     } else {
  //       // User has been signed out, reset the state
  //       this.setState({
  //         user: null,
  //         message: '',
  //         codeInput: '',
  //         phoneNumber: '',
  //         confirmResult: null,
  //       });
  //     }
  //   });
  // }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Mengirim kode verifikasi ...' });

    firebase.auth()
    .signInWithPhoneNumber('+62' + phoneNumber)
    .then((confirmResult) => {
      this.setState({confirmResult, message: ''})
      const userPhone = confirmResult._auth._user._user.phoneNumber;
      if (userPhone === '+62' + phoneNumber) {
        this.props.dispatch(checkPhoneNumber(userPhone))
      }
    })
    .catch(error => this.setState({ message: `Nomor Handphone yang kamu masukan tidak valid` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
      .then((user) => {
        const userPhone = user._user.phoneNumber;
        this.props.dispatch(checkPhoneNumber(userPhone))
      })
      .catch(error => this.setState({ message: `Konfirmasi kode gagal` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25}}>
        <Text style={{fontFamily: 'AllerDisplay', fontSize: 18, color: 'white', alignItems: 'center'}}>Masukan Nomor Handphone Kamu</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{height: 45, width: '17%', backgroundColor: 'white', marginTop: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 3}}>
            <Text style={{fontFamily: 'AllerDisplay', fontSize: 20}}>+62</Text>
          </View>
          <TextInput
            style={{ height: 45, marginTop: 15, width: '79%', marginBottom: 15, marginLeft: 10, backgroundColor: 'white', fontFamily: 'AllerDisplay', fontSize: 20, borderRadius: 3 }}
            onChangeText={value => this.setState({ phoneNumber: value })}
            placeholder={'Nomor Handphone... '}
            keyboardType='numeric'
            maxLength={14}
            value={phoneNumber}
            />
        </View>
        <TouchableNativeFeedback onPress={this.signIn} background={TouchableNativeFeedback.Ripple('black')}>
          <View style={{ height: 45, backgroundColor: '#00f5d0', borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'AllerDisplay', fontSize: 18}}>Kirim</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{width: SCREEN_WIDTH*0.85, textAlign: 'center', padding: 5, backgroundColor: '#000', color: '#fff', fontFamily: 'AllerDisplay', fontSize: 15 }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ width: SCREEN_WIDTH, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={{color: 'white', fontFamily: 'AllerDisplay', fontSize: 18, textAlign: 'center'}}>Masukan kode verifikasi</Text>
        <TextInput
          keyboardType='numeric'
          style={{ height: 45, marginTop: 15, marginBottom: 15, backgroundColor: 'white', borderRadius: 3, fontFamily: 'AllerDisplay', fontSize: 18, textAlign: 'center' }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder='Masukan kode..'
          value={codeInput}
        />
        <TouchableNativeFeedback onPress={this.confirmCode} background={TouchableNativeFeedback.Ripple('black')}>
          <View style={{ height: 45, backgroundColor: '#00f5d0', borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'AllerDisplay', fontSize: 18}}>Konfirmasi Kode</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return dispatch
};

export default connect(
  mapDispatchToProps
)(LoginViaPhone);
