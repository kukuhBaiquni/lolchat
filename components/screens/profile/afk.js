import React, { Component } from 'react';
import { View, Slider, Image } from 'react-native';
import { ColorMatrix, concatColorMatrices, saturate } from 'react-native-color-matrix-image-filters';

export default class AFK extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 0
    }
  }
  render() {
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ColorMatrix
          matrix={concatColorMatrices([saturate(this.state.val)])}
          >
        <Image style={{height: 300, width: 200}} source={{uri: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg'}} />
        </ColorMatrix>
        <Slider
          style={{width: '90%'}}
          thumbTintColor='red'
          value={this.state.val}
          maximumValue={1}
          minimumValue={0}
          step={0.05}
          onValueChange={(r) => this.setState({val: r})}
          />
      </View>
    )
  }
}
