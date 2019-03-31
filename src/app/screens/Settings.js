import React, { Component } from 'react';
import { View, Text, Slider, StyleSheet, TouchableOpacity } from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: 30,
      color: 'black'
    }
  }
  render() {
    const color = ['black', 'teal', 'cyan', 'darkred', 'navy', 'white', 'red'];
    return(
      <View style={{height: 1000, alignItems: 'center'}}>
        <View style={{height: 60, backgroundColor: 'black', width: '95%', marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
          <Text style={{color: this.state.color, fontSize: this.state.val, fontFamily: 'old_stamper'}}>Settings</Text>
        </View>
        <View>
          <Text style={{marginTop: 20, fontWeight: 'bold'}}>Change Size: {this.state.val}</Text>
          <Slider
           style={{ width: 300, height: 50 }}
           step={1}
           minimumValue={1}
           maximumValue={50}
           value={this.state.val}
           onSlidingComplete={(x) => this.setState({val: x})}
           onValueChange={(x) => this.setState({val: x})}
          />
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>Change Color: {this.state.color.toUpperCase()}</Text>
          <View style={{flexDirection: 'row'}}>
            {
              color.map((x, i) =>
                <TouchableOpacity onPress={() => this.setState({color: x})} key={i} style={{height: 30, width: 30, backgroundColor: x, marginLeft: 5, borderRadius: 15}} />
              )
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
