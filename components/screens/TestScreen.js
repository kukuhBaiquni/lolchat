import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StatusBar } from 'react-native';
import RNParallax from './Parallaque';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from './Settings';

export default class TestScreen extends Component {
  render() {
    const dummy = Array(30).fill('Gabon');
    return(
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor='black'
          barStyle='light-content'
          />
        <RNParallax
          headerMinHeight={65}
          headerMaxHeight={300}
          extraScrollHeight={20}
          scrollEventThrottle={5}
          title='Crimson Avenger'
          backgroundColor='#e2e2e2'
          titleFont='BOYCOTT_'
          titleSize={25}
          titleColor='white'
          backgroundImage={{uri: 'http://invisioncommunity.co.uk/wp-content/uploads/2015/10/elesis_crimson_avenger.jpg'}}
          backgroundImageScale={2}
          renderNavBar={() => (
            <View style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', height: 55}}>
              <View style={{position: 'absolute', left: 10, top: 22}}>
                <Icon name='mail-reply' color='white' size={20} />
              </View>
              <TouchableOpacity style={{position: 'absolute', right: -5, top: 17, borderRadius: 50, height: 30, width: 30, justifyContent: 'center'}}>
                <Icon name='ellipsis-v' color='white' size={22} />
              </TouchableOpacity>
            </View>
          )}
          renderContent={() => (
            <ScrollView style={{backgroundColor: '#eaeaea'}}>
              <Settings />
            </ScrollView>
          )}
        />
      </View>
    )
  }
}
