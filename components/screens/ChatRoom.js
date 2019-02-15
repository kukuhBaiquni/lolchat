import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageHandler: ''
    }
  }

  startProcess() {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      cropping: true,
      includeBase64: true,
      enableRotationGesture: true
    }).then(image => {
      const x =`data:${image.mime};base64,${image.data}`;
      this.setState({imageHandler: x})
    }).catch( err => {
    });
  }

  render() {
    console.log(firebase);
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={() => this.startProcess()}>ChatRoom</Text>
        {
          this.state.imageHandler !== '' &&
          <Image source={{uri: this.state.imageHandler}} style={{height: 90, width: 90, borderRadius: 30}} resizeMode='contain' />
        }
      </View>
    )
  }
}
