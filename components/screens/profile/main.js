import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StatusBar, Image, TextInput, Dimensions } from 'react-native';
import RNParallax from '../Parallaque';
import ImagePicker from 'react-native-image-crop-picker';
import Settings from '../Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComponentStyling from './componentStyling';
import UserInfo from './userInfo';

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coverPicture: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg',
      statusBarColor: 'black',
      userNameDisplay: 'Crimson Avenger',
      userNameColor: 'white',
      profilePicture: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg',
      isEditingName: false,
      fontFamily: 'Ubuntu-Title'
    }
  }

  pickCoverPicture() {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
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
          title={this.state.userNameDisplay}
          titleFont='BOYCOTT_'
          titleSize={25}
          titleColor={this.state.userNameColor}
          backgroundImage={{uri: this.state.coverPicture}}
          backgroundImageScale={1}
          renderNavBar={() => (
            <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
              <View style={{width: SCREEN_WIDTH * 0.85, height: 65, justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{height: 65, width: 65, justifyContent: 'center', paddingLeft: 18}}>
                  <Icon name='mail-reply' color='white' size={20} />
                </TouchableOpacity>
              </View>
              <View style={{width: SCREEN_WIDTH * 0.15, height: 65, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.pickCoverPicture()} style={{height: 65, width: 65, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='ellipsis-v' color='white' size={22} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderContent={() => (
            <ScrollView style={{backgroundColor: 'white'}}>
              <View style={{alignItems: 'center'}}>
                <View style={{height: 220, marginTop: 10, padding: 20, width: '95%', justifyContent: 'center', alignItems: 'center'}}>
                  <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={{height: 220, borderRadius: 5, backgroundColor: 'white', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.4}}></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pickProfilePicture()}>
                      <Image source={{uri: this.state.profilePicture}} style={{height: 60, width: 60, borderRadius: 40}} />
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: 60, width: 240, paddingLeft: 10}}>
                      <View style={{width: '100%', marginTop: 10}}>
                        {
                          this.state.isEditingName
                          ?
                          <TextInput
                            maxLength={19}
                            style={{height: 50, fontSize: 30, fontFamily: this.state.fontFamily, color: 'black', width: '100%'}}
                            autoFocus
                            value={this.state.userNameDisplay}
                            onChangeText={(x) => this.setState({userNameDisplay: x})}
                            onBlur={() => this.setState({isEditingName: false})}
                            />
                          :
                          <Text onPress={() => this.setState({isEditingName: true})} style={{fontSize: 30, fontFamily: this.state.fontFamily, color: 'black', letterSpacing: 1}}>{this.state.userNameDisplay}</Text>
                        }
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '80%'}}>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                            <Icon name='heart-o' color='#ff0083' size={14} />
                            <Text style={{color: 'black', fontSize: 13, paddingLeft: 5}}>102k</Text>
                          </View>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                            <Icon name='star-o' color='#ffb600' size={15} />
                            <Text style={{color: 'black', fontSize: 13, paddingLeft: 5}}>22k</Text>
                          </View>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                            <Icon name='thumbs-o-up' color='#0099ff' size={16} />
                            <Text style={{color: 'black', fontSize: 13, paddingLeft: 5}}>7.1k</Text>
                          </View>
                          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 30}}>
                            <Icon name='venus' color='black' size={13} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{width: '95%'}}>
                    <Text style={{fontFamily: this.state.fontFamily, letterSpacing: 1, color: 'black', fontSize: 18, marginTop: 15}}>Quote:</Text>
                    <Text style={{fontFamily: this.state.fontFamily, letterSpacing: 1, color: '#a8a8a8', fontSize: 17, marginTop: 5}}>Game is a program, program is technology, technology DEFEAT EVERYTHING!!</Text>
                  </View>
                  <View style={{width: '95%'}}>
                    <TouchableOpacity style={{marginTop: 10, width: 65, height: 20, justifyContent: 'space-between', alignItems: 'center', borderRadius: 30, borderWidth: 1, borderColor: 'green', flexDirection: 'row'}}>
                      <Text style={{fontFamily: this.state.fontFamily, color: 'green', marginLeft: 8}}>100%</Text>
                      <View style={{height: 20, width: 20, borderRadius: 15, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='check' color='white' size={13} />
                      </View>
                    </TouchableOpacity>
                    <Text style={{fontFamily: this.state.fontFamily, fontSize: 15, marginTop: 10, color: 'green'}}>Profil kamu sudah lengkap!</Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <View style={{width: '95%', height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: '#afafaf', borderBottomColor: '#afafaf'}}>
                  <Icon name='user-o' size={20} color='black' />
                  <Icon name='photo' size={20} color='#d2d2d2' />
                  <Icon name='film' size={20} color='#d2d2d2' />
                  <Icon name='file-text-o' size={20} color='#d2d2d2' />
                </View>
              </View>
              <UserInfo fontFamily={this.state.fontFamily} />
            </ScrollView>
          )}
        />
        <ComponentStyling navigation={this.props.navigation} />
      </View>
    )
  }
}
