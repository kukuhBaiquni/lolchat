import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, Dimensions, Platform, ScrollView } from 'react-native';
import ajax from '../config/Fetch';
import { url } from '../config/DefaultEndPoint'
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  noData: true
}
export default class TestUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: null,
      picture: [],
      progress: 0
    }
  }

  pickImage() {
    ImagePicker.launchImageLibrary(options, (response) => {
      const z = {
        a: response.uri,
        b: response.width * 0.5,
        c: response.height * 0.5,
        d: 'JPEG',
        e: 80
      }
      ImageResizer.createResizedImage(z.a, z.b, z.c, z.d, z.e).then((lol) => {
        this.setState({picture: [...this.state.picture, lol.uri]})
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
      }).catch((err) => {})
    });
  }

  onSave() {
    let form = new FormData()
    this.state.picture.map((x, i) => {
      form.append('photo', {
        uri: x,
        type: 'image/jpeg',
        name: 'random'
      });
    })
    ajax(`${url}upload`, {
      method: 'post',
      body: form
    }, (e) => {
      const progress = e.loaded / e.total
      this.setState({progress})
    })
    .then((res) => {

    })
    .catch((error) => {

    })
  }

  render() {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 5, width: SCREEN_WIDTH * this.state.progress, backgroundColor: 'red'}} />
        <TouchableNativeFeedback onPress={() => this.pickImage()} background={TouchableNativeFeedback.Ripple('black')}>
          <View style={{width: 160, height: 50, backgroundColor: 'pink', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: 'white'}}>Gabon</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={{height: 50, marginTop: 20, marginBottom: 20}}>
          <TouchableNativeFeedback onPress={() => this.onSave()} background={TouchableNativeFeedback.Ripple('black')}>
            <View style={{width: 160, height: 50, backgroundColor: 'cyan', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: 'white'}}>Master</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <ScrollView>
          <View style={{width: SCREEN_WIDTH, flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              this.state.picture.map((x, i) =>
                <Image key={i} style={{height: 100, width: SCREEN_WIDTH/4}} source={{uri: x}} />
              )
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
