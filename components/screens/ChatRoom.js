import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'react-native-firebase';
import Gestures from 'react-native-easy-gestures';

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
    return(
      <Gestures>
        <View style={{height: 300, width: 300, backgroundColor: 'cyan', justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={() => this.startProcess()}>ChatRoom</Text>
        </View>
      </Gestures>
    )
  }
}
