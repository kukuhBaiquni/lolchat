import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, TextInput, Dimensions, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
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

    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        return {
            title: 'Detail Pengajuan Pinjaman',
            header: null
        }
    };


    logout() {
        LoginManager.logOut()
    }

    fbLogin = async () => {
        var data = await facebookLogin()
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='black' />
                <Text style={[{color:'white'}, styles.loginText]}>
                    <Text style={[styles.loginText, {color: '#00f5d0'}]}>M</Text>asuk..
                </Text>
                <View style={{width: SCREEN_WIDTH*0.85}}>
                    <View>
                        <TouchableNativeFeedback onPress={() => setTimeout(() => {this.props.navigation.navigate('LoginViaPhone')}, 100)} background={TouchableNativeFeedback.Ripple('black')}>
                            <View style={[styles.textInputContainer, {backgroundColor: '#388e11'}]}>
                                <Text style={[styles.loginText, {color: 'white', fontSize: 17}]}>Masuk dengan Handphone</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
                            <Text style={[styles.loginText, {color: 'white', fontSize: 17}]}>ATAU</Text>
                        </View>
                        <TouchableNativeFeedback onPress={() => this.fbLogin()} background={TouchableNativeFeedback.Ripple('black')}>
                            <View style={[styles.textInputContainer, {backgroundColor: '#3a76c4'}]}>
                                <Text style={[styles.loginText, {color: 'white', fontSize: 17}]}>Masuk dengan Facebook</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={{position: 'absolute', bottom: 5, right: 0, width: SCREEN_WIDTH, alignItems: 'center'}}>
                    <Text style={[styles.loginText, {color: 'white', fontSize: 13}]}>App v1.0.0</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(styling);
