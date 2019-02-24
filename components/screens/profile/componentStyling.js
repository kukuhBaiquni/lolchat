import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Dimensions, Slider, TouchableNativeFeedback, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toHsv, fromHsv } from 'react-native-color-picker';
import { presetList, aof } from '../schema';

export default class ComponentStyling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPanel: true,
      translateY: new Animated.Value(330),
      translateY2: new Animated.Value(0),
      h: 0, s: 0, v: 0,
      filterIndexHeight: -1,
      filterHeightExpanded: new Animated.Value(40)
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

  injectPreset(w, i, x){
    // w: index, i: data, x: value
    const { layerPreset, presetPusher } = this.props;
    let result = [...layerPreset];
    if (x) {
      result.push(i.fn)
      this.props.presetPusher(result)
    }else{
      const index = result.indexOf(i.fn)
      result.splice(index, 1)
      this.props.presetPusher(result)
    }
  }

  sliderController(p, x, y, z) {
    //p: value x: prevValue, y: indexFilter, z: indexValue
    let result = [...this.props.layerFilter];
    let result2 = [...this.props.filterC];
    result[y].value[z] = p;
    const index = result.indexOf(aof[y](...result[y].value));
    result2.splice(index, 1);
    result2.push(aof[y](...result[y].value))
    this.props.filterController(result, result2);
  }

  expander(x) {
    let result = [...this.props.layerFilter];
    result[x].isExpanded = !result[x].isExpanded
    this.props.expandWrapper(result)
  }

  toggleActivator(i, x) {
    let result = [...this.props.layerFilter];
    let result2 = [...this.props.filterC];
    if (x) {
      result[i].active = x;
      result2.push(aof[i](...result[i].value))
      this.props.filterActivator(result, result2)
    }else{
      const index = result2.indexOf(aof[i](...result[i].value));
      result2.splice(index, 1);
      result[i].active = x;
      this.props.filterActivator(result, result2)
    }
  }

  render() {
    const { h, s, v } = this.state;
    const { layerPreset, layerFilter } = this.props;
    return(
      <View>
        <Animated.View style={{position: 'absolute', bottom: 10, right: 10, transform: [{translateY: this.state.translateY2}]}}>
          <TouchableOpacity onPress={() => this.showPanel()} style={{height: 50, width: 50, backgroundColor: 'black', borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='magic' color='white' size={20} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{width: '100%', position: 'absolute', right: 0, left: 0, bottom: 0, alignItems: 'center', transform: [{translateY: this.state.translateY}]}}
          >
          <Animated.View style={{width: '95%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 5, backgroundColor: 'black', borderRadius: 5}}>
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
            <View style={{width: '95%', backgroundColor: 'black', paddingTop: 5, borderRadius: 5, height: 250, alignItems: 'center'}}>
              <ScrollView style={{width: '100%', marginBottom: 5}}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  {
                    layerFilter.map((x, i) =>
                      <View key={i} style={{width: '95%', borderRadius: 3, backgroundColor: 'white', elevation: 3, marginTop: 5}}>
                        <TouchableNativeFeedback
                          onPress={(x) => this.expander(i)}
                          background={TouchableNativeFeedback.Ripple('green')}>
                          <Animated.View style={{height: x.isExpanded ? 60+(23*x.value.length) : 40}}>
                            <View style={styles.filterWrapper}>
                              <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold', color: '#7a7a7a'}}>{x.name}</Text>
                              <View>
                                <Switch
                                  thumbColor={x.active ? '#258e26': '#999999'}
                                  trackColor={{false: '#b2b2b2', true: '#a6c4a7'}}
                                  value={x.active}
                                  onValueChange={this.toggleActivator.bind(this, i)}
                                  />
                              </View>
                            </View>
                            <View style={{alignItems: 'center'}}>
                            {
                              x.isExpanded &&
                                x.value.map((z, r) =>
                                  <View key={r} style={{flexDirection:'row', width: '90%', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text>{x.slider[r].text}</Text>
                                    <Slider
                                      disabled={!x.active}
                                      thumbTintColor={x.slider[r].color}
                                      minimumTrackTintColor={x.slider[r].color}
                                      style={{width: 250, marginTop: 8}}
                                      value={layerFilter[i].value[r]}
                                      maximumValue={x.range.max}
                                      minimumValue={x.range.min}
                                      step={x.step}
                                      onSlidingComplete={(p, x, c, a) => this.sliderController(p, z, i, r)}
                                      />
                                  </View>
                                )
                            }
                            </View>
                          </Animated.View>
                        </TouchableNativeFeedback>
                      </View>
                    )
                  }
                  {
                    presetList.map((x, i) =>
                      <View key={i} style={{width: '95%', borderRadius: 3, backgroundColor: 'white', elevation: 3, marginTop: 5}}>
                        <TouchableNativeFeedback
                          background={TouchableNativeFeedback.Ripple('#a8a8a8')}>
                          <View style={{height: 40, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                              <Text style={{marginLeft: 10, fontSize: 15, fontWeight: 'bold', color: '#7a7a7a'}}>{x.name}</Text>
                              <View style={{marginLeft: 20, padding: 3, borderRadius: 5, borderWidth: 1, borderColor: '#258e26', backgroundColor: '#d1ffd1'}}>
                                <Text style={{color: '#258e26', fontSize: 9}}>Preset</Text>
                              </View>
                            </View>
                            <View>
                              <Switch
                                disabled={layerPreset.indexOf(x.fn) === -1 && layerPreset.length > 0}
                                thumbColor={layerPreset.indexOf(x.fn) !== -1 ? '#258e26' : '#999999'}
                                trackColor={{false: '#b2b2b2', true: '#a6c4a7'}}
                                value={layerPreset.indexOf(x.fn) !== -1}
                                onValueChange={this.injectPreset.bind(this, i, x)}
                                />
                            </View>
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

const styles = StyleSheet.create({
  filterWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  }
})
