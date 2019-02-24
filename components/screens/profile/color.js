import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, Text } from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';

export default class Color extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: toHsv('green')
    }
  }

  onColorChange(color) {
    this.setState({ color })
  }

  render() {
    return(
      <View style={{height: 100}}>
        <ColorPicker
          color={this.state.color}
          onColorChange={(x) => this.onColorChange(x)}
          onColorSelected={color => alert(`Color selected: ${color}`)}
          onOldColorSelected={color => alert(`Old color selected: ${color}`)}
          style={{height: 150}}
          />
      </View>
    )
  }
}