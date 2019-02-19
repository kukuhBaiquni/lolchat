import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class UserInfo extends Component {
  render() {
    return(
      <View style={{alignItems: 'center'}}>
        <View style={{width: '95%'}}>
          <Text style={{fontFamily: this.props.fontFamily, fontSize: 22, textAlign: 'left', paddingLeft: 6, paddingTop: 15, color: 'black'}}>Informasi Umum</Text>
        </View>
        <View style={{marginTop: 10, width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{width: '35%'}}>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Tanggal Lahir</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Umur</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Kota</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Hobi</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Status</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: 12/05/1997</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: 22</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: Elrios</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: nyimeng</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: Single</Text>
          </View>
        </View>
        <View style={{width: '95%', borderTopWidth: 1, borderTopColor: '#afafaf'}}>
          <Text style={{fontFamily: this.props.fontFamily, fontSize: 22, textAlign: 'left', paddingLeft: 6, paddingTop: 15, color: 'black'}}>Informasi Pribadi</Text>
        </View>
        <View style={{marginTop: 10, width: '95%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
          <View style={{width: '35%'}}>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Email</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>Telepon</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: cra.22@avenger.elrios</Text>
            <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, padding: 6, color: 'black'}}>: +44 - 2344 - 7837</Text>
          </View>
        </View>
        <View style={{width: '95%', borderTopColor: '#afafaf', borderTopWidth: 1}}>
          <Text style={{fontFamily: this.props.fontFamily, fontSize: 22, textAlign: 'left', paddingLeft: 6, paddingTop: 15, color: 'black'}}>Atur Profil</Text>
          <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, textAlign: 'left', paddingLeft: 6, paddingTop: 15, color: 'black'}}>Edit Informasi Umum</Text>
          <Text style={{fontFamily: this.props.fontFamily, fontSize: 18, textAlign: 'left', paddingLeft: 6, paddingTop: 15, color: 'black'}}>Edit Informasi Pribadi</Text>
        </View>
      </View>
    )
  }
}
