import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import RNParallax from '../Parallaque';
import ImagePicker from 'react-native-image-crop-picker';
import Settings from '../Settings';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverPicture: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg',
      statusBarColor: 'black',
      userNameColor: 'white',
      profilePicture: ''
    }
  }

  pickCoverPicture() {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: false,
      includeBase64: true,
      enableRotationGesture: true
    }).then(image => {
      const x =`data:${image.mime};base64,${image.data}`;
      this.setState({coverPicture: x})
    }).catch( err => {
    });
  }

  pickProfilePicture() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      enableRotationGesture: true,
      cropperCircleOverlay: true
    }).then(image => {
      const x =`data:${image.mime};base64,${image.data}`;
      this.setState({profilePicture: x})
    }).catch( err => {
    });
  }

  render() {
    const dummy = Array(30).fill('Gabon');
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={this.state.statusBarColor}
          barStyle='light-content'
          />
        <RNParallax
          headerMinHeight={65}
          headerMaxHeight={300}
          extraScrollHeight={20}
          scrollEventThrottle={5}
          title='Crimson Avenger'
          backgroundColor='#e2e2e2'
          titleFont='BOYCOTT_'
          titleSize={25}
          titleColor={this.state.userNameColor}
          backgroundImage={{uri: this.state.coverPicture}}
          backgroundImageScale={1}
          renderNavBar={() => (
            <View style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', height: 55}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{position: 'absolute', left: 10, top: 22}}>
                <Icon name='mail-reply' color='white' size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pickProfilePicture()} style={{position: 'absolute', right: -5, top: 17, borderRadius: 50, height: 30, width: 30, justifyContent: 'center'}}>
                <Icon name='ellipsis-v' color='white' size={22} />
              </TouchableOpacity>
            </View>
          )}
          renderContent={() => (
            <ScrollView style={{backgroundColor: '#eaeaea'}}>
              <View style={{height: 300, backgroundColor: 'darkred', padding: 20, flexDirection: 'row'}}>
                <Image source={{uri: this.state.profilePicture}} style={{height: 80, width: 80, borderRadius: 40, borderWidth: 2, borderColor: 'black'}} />
                <View style={{justifyContent: 'center', alignItems: 'center', height: 80, width: 240, borderRadius: 10, borderColor: 'black', borderWidth: 2}}>
                  <Text style={{fontSize: 24, fontFamily: 'BOYCOTT_', color: 'white'}}>Crimson Avenger</Text>
                  <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                      <Icon name='heart' color='#ff3083' size={14} />
                      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12, paddingLeft: 5}}>22517</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                      <Icon name='star' color='yellow' size={14} />
                      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12, paddingLeft: 5}}>944</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                      <Icon name='gift' color='cyan' size={14} />
                      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12, paddingLeft: 5}}>7928</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Settings />
            </ScrollView>
          )}
        />
      </View>
    )
  }
}
