import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Dimensions, Slider, TouchableNativeFeedback, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';
import { filterList } from '../schema';

export default class ComponentStyling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPanel: true,
      translateY: new Animated.Value(330),
      translateY2: new Animated.Value(0),
      h: 0, s: 0, v: 0,
      filterList
    }
  }

  slideUp() {
    this.setState({showPanel: false})
    const { translateY } = this.state;
    Animated.timing(translateY, {
      toValue: 250,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  slideDown() {
    this.setState({showPanel: true})
    const { translateY } = this.state;
    Animated.timing(translateY, {
      toValue: -5,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  hidePanel() {
    this.setState({showPanel: true})
    const { translateY, translateY2 } = this.state;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 330,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue: 0,
        delay: 250,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start()
  }

  injectFilter(i, x){
    let target = [...this.state.filterList];
    target[i] = {...target[i], active: !target[i].active};
    this.props.filterPusher(x.fn)
    this.setState({filterList: target})
  }

  showPanel() {
    const { translateY, translateY2 } = this.state;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -5,
        delay: 250,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY2, {
        toValue: 70,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start()
  }

  render() {
    const { h, s, v } = this.state;
    return(
      <View>
        <Animated.View style={{position: 'absolute', bottom: 10, right: 10, transform: [{translateY: this.state.translateY2}]}}>
          <TouchableOpacity onPress={() => this.showPanel()} style={{height: 50, width: 50, backgroundColor: '#444f60', borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='magic' color='white' size={20} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{width: '100%', position: 'absolute', right: 0, left: 0, bottom: 0, alignItems: 'center', transform: [{translateY: this.state.translateY}]}}
          >
          <Animated.View style={{width: '95%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 5, backgroundColor: '#7a7a7a', borderRadius: 5}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>Pilih Filter</Text>
            <View style={{width: 65, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
              {
                this.state.showPanel
                ?
                <TouchableOpacity style={{width: 30}} onPress={() => this.slideUp()}>
                  <Icon name='window-minimize' size={18} color='white' />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{width: 30}} onPress={() => this.slideDown()}>
                  <Icon name='window-maximize' size={17} color='white' />
                </TouchableOpacity>
              }
              <TouchableOpacity style={{width: 30}} onPress={() => this.hidePanel()}>
                <Icon name='remove' size={23} color='white' />
              </TouchableOpacity>
            </View>
          </Animated.View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View style={{width: '95%', backgroundColor: '#7a7a7a', paddingTop: 5, borderRadius: 5, height: 250, alignItems: 'center'}}>
              <ScrollView style={{width: '100%'}}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  {
                    filterList.map((x, i) =>
                      <View key={i} style={{width: '95%', borderRadius: 3, backgroundColor: '#d1d1d1', elevation: 3, marginTop: 5}}>
                        <TouchableNativeFeedback
                          background={TouchableNativeFeedback.Ripple('#f4f4f4')}>
                          <View style={{height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: '#7a7a7a'}}>{x.name}</Text>
                            <View>
                              <Switch trackColor={{false: '#777777', true: '#f4f4f4'}} value={this.state.filterList[i].active} onValueChange={this.injectFilter.bind(this, i, x)} />
                            </View>
                            <Slider
                              thumbTintColor='white'
                              style={{ width: 150}}
                              value={v}
                              maximumValue={1}
                              minimumValue={0}
                              step={0.02}
                              onValueChange={(v) => this.setState({v})}
                              />
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    )
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }
}

// <View style={{width: '95%', backgroundColor: '#444f60', borderRadius: 5, height: 250, paddingTop: 10}}>
//   <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 15}}>Hue</Text>
//   <View style={{width: '100%', alignItems: 'center'}}>
//     <Slider
//       minimumTrackTintColor={fromHsv({h, s, v})}
//       thumbTintColor={fromHsv({h, s, v})}
//       style={{marginTop: 10, marginBottom: 10, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], width: 250}}
//       value={h}
//       maximumValue={359.9}
//       minimumValue={0}
//       step={10}
//       onValueChange={(h) => this.setState({h})}
//       />
//   </View>
//   <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 15}}>Saturation</Text>
//   <View style={{width: '100%', alignItems: 'center'}}>
//     <Slider
//       thumbTintColor={fromHsv({h, s, v:v-s})}
//       minimumTrackTintColor={fromHsv({h, s, v:v-s})}
//       style={{marginTop: 10, marginBottom: 10, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], width: 250}}
//       value={s} maximumValue={1}
//       minimumValue={0} step={0.02}
//       onValueChange={(s) => this.setState({s})}
//       />
//   </View>
//   <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: 15}}>Value</Text>
//   <View style={{width: '100%', alignItems: 'center'}}>
//     <Slider
//       thumbTintColor={fromHsv({h, s:s-v, v})}
//       minimumTrackTintColor={fromHsv({h, s:s-v, v})}
//       style={{marginTop: 10, marginBottom: 10, transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], width: 250}}
//       value={v}
//       maximumValue={1}
//       minimumValue={0}
//       step={0.02}
//       onValueChange={(v) => this.setState({v})}
//       />
//   </View>
// </View>
//
