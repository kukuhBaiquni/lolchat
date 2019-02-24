import React, { Component } from 'react';
import { View, Slider, Image } from 'react-native';
import { ColorMatrix, concatColorMatrices, saturate, rgba } from 'react-native-color-matrix-image-filters';

export default class AFK extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 0,
      val2: 1,
      val3: 1,
      val4: 1,
      val5:1
    }
  }
  render() {
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ColorMatrix
          matrix={concatColorMatrices([saturate(this.state.val), rgba(this.state.val2,this.state.val3,this.state.val4,this.state.val5)])}
          >
        <Image style={{height: 300, width: 200}} source={{uri: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg'}} />
        </ColorMatrix>
        <Slider
          style={{width: '90%', marginBottom: 5}}
          thumbTintColor='red'
          value={this.state.val}
          maximumValue={1}
          minimumValue={0}
          step={0.05}
          onValueChange={(r) => this.setState({val: r})}
          />
          <Slider
            style={{width: '90%', marginBottom: 5}}
            thumbTintColor='red'
            value={this.state.val2}
            maximumValue={1}
            minimumValue={0}
            step={0.05}
            onValueChange={(r) => this.setState({val2: r})}
            />
            <Slider
              style={{width: '90%', marginBottom: 5}}
              thumbTintColor='red'
              value={this.state.val3}
              maximumValue={1}
              minimumValue={0}
              step={0.05}
              onValueChange={(r) => this.setState({val3: r})}
              />
              <Slider
                style={{width: '90%', marginBottom: 5}}
                thumbTintColor='red'
                value={this.state.val4}
                maximumValue={1}
                minimumValue={0}
                step={0.05}
                onValueChange={(r) => this.setState({val4: r})}
                />
                <Slider
                  style={{width: '90%', marginBottom: 5}}
                  thumbTintColor='red'
                  value={this.state.val5}
                  maximumValue={1}
                  minimumValue={0}
                  step={0.05}
                  onValueChange={(r) => this.setState({val5: r})}
                  />
      </View>
    )
  }
}
