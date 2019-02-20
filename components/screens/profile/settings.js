import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: toHsv('green'),
      translateY: new Animated.Value(330),
    }
  }

  hidePanel() {
    this.setState({showPanel: true})
    const { translateY, translateY2 } = this.state;
    Animated.timing(translateY, {
      toValue: 330,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  showPanel() {
    const { translateY, translateY2 } = this.state;
    Animated.timing(translateY, {
      toValue: -5,
      delay: 250,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='black'
          barStyle='light-content'
          />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{alignItems: 'center', justifyContent: 'center', height: 40, width: 40, }}>
              <Icon name='mail-reply' color='white' size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pengaturan Tampilan</Text>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', height: 40, width: 40, }}>
              <Icon name='undo' color='white' size={20} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{width: '100%'}}>
            <View style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
            {
              list.map((x, i) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingDetails', x.title)} key={i} style={{width: '95%', height: 65, elevation: 5, backgroundColor: '#545454', borderRadius: 5, marginTop: 10, paddingTop: 5, paddingLeft: 10}}>
                <Text style={{color: 'white'}}>{x.title}</Text>
                <View style={{flexDirection: 'row', paddingTop: 8, justifyContent: 'space-between', width: 150}}>
                  <Icon name={x.icon} size={20} color='white' />
                  <Icon name='tint' size={20} color={x.color ? 'white' : '#919191'} />
                  <Icon name='sliders' size={20} color={x.size ? 'white' : '#919191'} />
                  <Icon name='adjust' size={20} color={x.opacity ? 'white' : '#919191'} />
                  <Icon name='magic' size={20} color={x.animated ? 'white' : '#919191'} />
                </View>
              </TouchableOpacity>
              )
            }
            </View>
          </ScrollView>

        <Animated.View
          style={{width: '100%', position: 'absolute', right: 0, left: 0, bottom: 0, alignItems: 'center', transform: [{translateY: this.state.translateY}]}}
          >
          <View style={{width: '95%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 5, backgroundColor: 'black', borderRadius: 5}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>Pilih Warna</Text>
            <View style={{width: 65, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
              <TouchableOpacity style={{width: 30, marginLeft: 30}} onPress={() => this.hidePanel()}>
                <Icon name='remove' size={23} color='white' />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '95%', alignItems: 'center', backgroundColor: 'black', borderRadius: 5}}>
            <View style={{height: 200, width: '80%', paddingTop: 20, paddingBottom: 10}}>
              <ColorPicker
                color={this.state.color}
                onColorChange={(color) => this.setState({color})}
                onColorSelected={color => alert(`Color selected: ${color}`)}
                onOldColorSelected={color => alert(`Old color selected: ${color}`)}
                style={{flex: 1}}
                />
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 65,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#545454'
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
  }
});

const list = [
  {title: 'Tombol Kembali', icon: 'mail-reply', color: true, size: true, opacity: true, animated: false},
  {title: 'Tombol Menu Foto', icon: 'ellipsis-v', color: true, size: true, opacity: true, animated: false},
  {title: 'Foto Sampul', icon: 'photo', color: true, size: false, opacity: true, animated: false},
  {title: 'Foto Profil', icon: 'user-circle-o', color: true, size: false, opacity: true, animated: false},
  {title: 'Nama di Header', icon: 'buysellads', color: true, size: true, opacity: true, animated: true},
  {title: 'Nama di Display', icon: 'font', color: true, size: true, opacity: true, animated: true},
  {title: 'Nama di Obrolan', icon: 'comment', color: true, size: true, opacity: true, animated: true},
  {title: 'Nama di Postingan', icon: 'file-text-o', color: true, size: true, opacity: true, animated: true},
  {title: 'Quote Judul', icon: 'quote-right', color: true, size: true, opacity: true, animated: true},
  {title: 'Quote Isi', icon: 'wpforms', color: true, size: true, opacity: true, animated: true},
  {title: 'Informasi Umum', icon: 'eye', color: true, size: true, opacity: true, animated: true}
];
