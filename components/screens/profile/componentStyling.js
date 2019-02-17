import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export default class ComponentStyling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationSwitch: true
    }
  }

  componentWillUnmount() {
    this.setState({animationSwitch: false})
  }

  render() {
    console.log(this.props);
    return(
      <Animatable.View
        style={{width: '100%', height: 260, position: 'absolute', right: 0, left: 0, bottom: 0, backgroundColor: 'black', alignItems: 'center'}}
        animation={this.state.animationSwitch ? 'fadeIn' : 'fadeOut'}
        duration={500}
        useNativeDriver
        >
        <View style={{width: '95%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1}}>
          <Text style={{color: 'white', fontSize: 18}}>Pilih Komponen</Text>
          <TouchableOpacity onPress={() => this.props.switchEditStyle()} style={{width: 30}}>
            <Icon name='remove' size={21} color='white' />
          </TouchableOpacity>
        </View>
        <ScrollView style={{width: '100%'}}>
          <View style={{width: '60%'}}>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='mail-reply' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Tombol Kembali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ellipsis-v' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Tombol Menu Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='photo' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Foto Sampul</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='user-circle-o' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Foto Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='font' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Nama di Header</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='font' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Nama di Display</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='font' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Nama di Obrolan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='font' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Nama di Postingan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='quote-right' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Quote Judul</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='quote-right' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Quote isi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
              <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='eye' size={21} color='white' />
              </View>
              <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>Informasi Umum</Text>
            </TouchableOpacity>
            <BackButton semfaq='master' />
          </View>
        </ScrollView>
      </Animatable.View>
    )
  }
}

const BackButton = (props) => {
  console.log(props);
  return (
    <View style={{height: 50, width: 50, backgroundColor: 'cyan'}}>
    </View>
  )
}
