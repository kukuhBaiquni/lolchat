import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Animated, Switch, Slider } from 'react-native';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default class SettingDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: fromHsv(toHsv('green')),
      size: 20,
      name: 'mail-reply'
    }
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#f4f4f4', alignItems: 'center', width: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{alignItems: 'center', justifyContent: 'center', height: 40, width: 40, }}>
            <Icon name={this.state.name} color={this.state.color} size={this.state.size} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Atur {this.props.navigation.state.params}</Text>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', height: 40, width: 40, }}>
            <Icon name='undo' color='white' size={20} />
          </TouchableOpacity>
        </View>
        <View style={{height: 250, width: '95%', paddingBottom: 10, backgroundColor: '#545454', borderRadius: 5, marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>Pilih Warna</Text>
          <ColorPicker
            color={this.state.color}
            onColorChange={(color) => this.setState({color: fromHsv(color)})}
            onColorSelected={color => alert(`Color selected: ${color}`)}
            onOldColorSelected={color => alert(`Old color selected: ${color}`)}
            style={{flex: 1}}
            />
        </View>
        <View style={{height: 80, width: '95%', backgroundColor: '#545454', borderRadius: 5, marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>Ubah Ukuran</Text>
          <Slider style={{marginTop: 10}} value={this.state.size} maximumValue={30} minimumValue={15} step={0.5} onValueChange={(size) => this.setState({size})}/>
        </View>
        <View style={{height: 80, width: '95%', backgroundColor: '#545454', borderRadius: 5, marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>Ubah Tipe</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '40%'}}>
            {
              type.map((x, i) =>
              <TouchableOpacity key={i} onPress={(t) => this.setState({name: x})} style={{height: 45, width: 45, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={x} size={22} color={this.state.name === x ? 'white' : '#919191'} />
              </TouchableOpacity>
              )
            }
          </View>
        </View>
        <TouchableOpacity style={{width: '95%', height: 50, borderRadius: 3, elevation: 3, backgroundColor: '#545454', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10, left: 10, right: 0}}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>Simpan</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const type =['chevron-left', 'arrow-left', 'mail-reply', 'hand-o-left', 'long-arrow-left'];

const styles = StyleSheet.create({
  header: {
    height: 65,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#545454',
    width: '100%'
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
  }
});
