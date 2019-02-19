import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Animated,
  Text,
  View,
  Dimensions,
  TouchableOpacity
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
    backgroundColor: 'black',
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
    };
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
      outputRange: ['rgba(255,255,255, 0)', 'rgba(255,255,255, 0)', 'rgba(0,0,0, 0.5)'],
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
    return (
      <View>
        <ColorMatrix
          matrix={concatColorMatrices(
            [
              rgba(1, 1, 1, 1),
              saturate(1),
              hueRotate(0),
              // luminanceToAlpha(),
              // invert(),
              grayscale(0),
              sepia(0),
              // nightvision(),
              // warm(),
              // cool(),
              brightness(1),
              contrast(1),
              temperature(0),
              tint(0),
              // threshold(0),
              // technicolor(),
              // polaroid(),
              // toBGR(),
              // kodachrome(),
              // browni(),
              // vintage(),
              // night(1),
              // predator(0),
              // lsd(),
              // colorTone(0.2, 0.5, '#FFE580', '#338000'),
              // duoTone('#FFE580', '#338000'),
              // protanomaly(),
              // deuteranomaly(),
              // tritanomaly(),
              // protanopia(),
              // deuteranopia(),
              // tritanopia(),
              // achromatomaly()
            ]
          )}
          >
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

  // renderPlainBackground() {
  //   const { backgroundColor } = this.props;
  //
  //   const imageOpacity = this.getImageOpacity();
  //   const imageTranslate = this.getImageTranslate();
  //   const imageScale = this.getImageScale();
  //
  //   return (
  //     <Animated.View
  //       style={{
  //         height: this.getHeaderMaxHeight(),
  //         backgroundColor,
  //         opacity: imageOpacity,
  //         transform: [{ translateY: imageTranslate }, { scale: imageScale }],
  //       }}
  //     />
  //   );
  // }

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
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'pink' : backgroundColor,
          },
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {/*{!backgroundImage && this.renderPlainBackground()}*/}
      </Animated.View>
    );
  }

  renderScrollView() {
    const { renderContent, scrollEventThrottle } = this.props;
    return (
      <Animated.ScrollView
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderScrollView()}
        {this.renderHeaderBackground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderForeground()}
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
};

export default RNParallax;
