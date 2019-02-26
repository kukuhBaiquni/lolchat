import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, FlatList, Dimensions, TextInput, StyleSheet, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { url } from '../../config/DefaultEndPoint';
import io from 'socket.io-client';
import { YellowBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageHandler: '',
      height: 0
    }
    this.socket = io(url);
    this.socket.on('terimapesan', (data) => {
      console.log(data);
    });
    this.sendMessage = () => {
      this.socket.emit('kirimpesan', {
        name: 'Gabon',
        message: 'Cimeng'
      })
    }

  }

  startProcess() {
    ImagePicker.openPicker({
      width: 250,
      height: 250,
      includeBase64: true,
    }).then(image => {
      const x =`data:${image.mime};base64,${image.data}`;
      this.setState({imageHandler: x})
    }).catch( err => {
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>

        </ScrollView>
        <View style={styles.writeContainer}>
          <TextInput
            style={[styles.textInput, {height: Math.max(40, this.state.height), maxHeight: 100}]}
            multiline={true}
            numberOfLines={4}
            keyboardType='default'
            textAlignVertical='center'
            returnKeyType='done'
            onContentSizeChange={(event) => {
              this.setState({ height: event.nativeEvent.contentSize.height })
            }}
            />
          <TouchableNativeFeedback
            style={{height: 40, width: 40, borderRadius: 25}}
            background={TouchableNativeFeedback.Ripple('#777777')}
            >
            <View style={{height: 40, width: 40, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='send' color='black' size={22} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  writeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: SCREEN_WIDTH,
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  textInput: {
    width: SCREEN_WIDTH*0.8,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
})
