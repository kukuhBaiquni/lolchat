import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { presetList, filterList } from './schema';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Animated,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Slider, TouchableNativeFeedback, Switch,
} from 'react-native';
import {
  ColorMatrix,
  concatColorMatrices,
  rgba,
  saturate,
  hueRotate,
  luminanceToAlpha,
  invert,
  grayscale,
  sepia,
  nightvision,
  warm,
  cool,
  brightness,
  contrast,
  temperature,
  tint,
  threshold,
  technicolor,
  polaroid,
  toBGR,
  kodachrome,
  browni,
  vintage,
  night,
  predator,
  lsd,
  colorTone,
  duoTone,
  protanomaly,
  deuteranomaly,
  tritanomaly,
  protanopia,
  deuteranopia,
  tritanopia,
  achromatopsia,
  achromatomaly
} from 'react-native-color-matrix-image-filters';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 65;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 200;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 0;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = '#3498db';
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
const DEFAULT_TITLE_COLOR = 'white';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

class RNParallax extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      showPanel: true,
      translateY: new Animated.Value(330),
      translateY2: new Animated.Value(0),
      layerFilter: filterList,
      layerPreset: [],
      pos: true
    };
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

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props; // 300
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props; //65
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight(); // 235
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props; //20
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0,  this.getHeaderScrollDistance()]; // [-20, 0, 235]
  }

  getHeaderHeight() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(), // [-20, 0, 235]
      outputRange: [this.getHeaderMaxHeight() + this.getExtraScrollHeight(), this.getHeaderMaxHeight(), this.getHeaderMinHeight()], // [320, 300, 65]
      extrapolate: 'clamp',
    });
  }

  getNavBarOpacity() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getImageOpacity() {
    return this.state.scrollY.interpolate({
      inputRange: [0, 215, 245],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getImageTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  }

  getImageScale() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp'
    });
  }

  getTitleTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: [0, 300, 350],
      outputRange: [-50, -50, 0],
      extrapolate: 'clamp',
    });
  }

  // title background color transition from white to red
  transparency() {
    return this.state.scrollY.interpolate({
      inputRange: [0, 345, 360],
      outputRange: ['rgba(255,255,255, 0)', 'rgba(255,255,255, 0)', 'rgba(255,255,255, 0.2)'],
      extrapolate: 'clamp'
    })
  }

  elevation() {
    return this.state.scrollY.interpolate({
      inputRange: [0, 350, 360],
      outputRange: [0, 0, 4],
      extrapolate: 'clamp'
    })
  }

  renderHeaderTitle() {
    const { title, titleFont, titleSize, renderBackButton, titleColor } = this.props;
    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [
              { translateY: this.getTitleTranslate() },
            ],
            height: 65,
            elevation: this.elevation(),
            backgroundColor: this.transparency()
          },
        ]}
      >
      <Animated.View style={{position: 'absolute', left: 0, marginLeft: 10}}>
        {renderBackButton()}
      </Animated.View>
        <Animated.Text numberOfLines={1} style={[styles.headerText, {fontSize: titleSize},{fontFamily: titleFont}, {color: titleColor}, {opacity: 1}]}>
          {title}
        </Animated.Text>
      </Animated.View>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
          }
        ]}
      >
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderBackgroundImage() {
    const { backgroundImage } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();
    const { scrollY, layerPreset, layerFilter } = this.state;
    return (
      <View>
        <ColorMatrix matrix={concatColorMatrices([
            rgba(...layerFilter[0].value),
            saturate(...layerFilter[1].value),
            hueRotate(...layerFilter[2].value),
            grayscale(...layerFilter[3].value),
            sepia(...layerFilter[4].value),
            brightness(...layerFilter[5].value),
            contrast(...layerFilter[6].value),
            temperature(...layerFilter[7].value),
            tint(...layerFilter[8].value),
            ...this.state.layerPreset
          ])}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                height: this.getHeaderMaxHeight(),
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }, { scale: imageScale }],
              },
            ]}
            source={backgroundImage}
            />
        </ColorMatrix>
      </View>
    );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: 5,
            backgroundColor: 'black',
          },
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  renderScrollView() {
    const { renderContent, scrollEventThrottle } = this.props;
    return (
      <Animated.ScrollView
        ref={(c) => {this.scroll = c}}
        style={styles.scrollView}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
        )}
      >
        <View style={{ marginTop: this.getHeaderMaxHeight() }}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  triggerChange() {
    if (this.state.pos) {
      this.scroll.getNode().scrollTo({y: this.state.scrollY._value + 1, animated: true});
      this.setState({pos: false})
    }else{
      this.scroll.getNode().scrollTo({y: this.state.scrollY._value -1, animated: true});
      this.setState({pos: true})
    }
  }

  sliderController(p, x, y, z) {
    //p: value x: prevValue, y: indexFilter, z: indexValue
    let clone = [...this.state.layerFilter];
    clone[y].value[z] = p;
    this.setState({layerFilter: clone})
    this.triggerChange()
  }

  expander(x) {
    let result = [...this.state.layerFilter];
    result[x].isExpanded = !result[x].isExpanded
    this.setState({layerFilter: result})
  }

  injectPreset(w, i, x) {
    // w: index, i: data, x: value
    if (x) {
      let result = [...this.state.layerPreset];
      result.push(i.fn)
      this.setState({layerPreset: result})
      this.triggerChange()
    }else{
      let result = [...this.state.layerPreset];
      const index = result.indexOf(i.fn)
      result.splice(index, 1)
      this.setState({layerPreset: result})
      this.triggerChange()
    }
  }

  toggleActivator(i, x) {
    let result = [...this.state.layerFilter];
    if (x) {
      result[i].active = x;
      this.setState({layerFilter: result})
    }else{
      result[i].active = x;
      result[i].value = [...result[i].defaultValue];
      this.setState({layerFilter: result})
      this.triggerChange()
    }
  }

  render() {
    const { layerFilter, layerPreset, showPanel } = this.state;
    return (
      <View style={styles.container}>
        {this.renderScrollView()}
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderForeground()}
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
                  showPanel
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
                              <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', height: 40}}>
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
      </View>
    );
  }
}

RNParallax.propTypes = {
  renderNavBar: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.any,
  navbarColor: PropTypes.string,
  title: PropTypes.string,
  titleFont: PropTypes.string,
  titleColor: PropTypes.string,
  titleSize: PropTypes.number,
  headerMaxHeight: PropTypes.number,
  headerMinHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  backgroundImageScale: PropTypes.number,
  filterList: PropTypes.array
};

RNParallax.defaultProps = {
  renderNavBar: () => <View />,
  renderBackButton: () => <View />,
  navbarColor: DEFAULT_NAVBAR_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  backgroundImage: null,
  title: '',
  titleFont: 'AntDesign',
  titleSize: 15,
  titleColor: 'white',
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
  headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULT_BACKGROUND_IMAGE_SCALE,
  filterList: []
};

export default RNParallax;
