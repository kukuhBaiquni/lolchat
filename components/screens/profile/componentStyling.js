import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Animated, Dimensions, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ColorPicker, toHsv } from 'react-native-color-picker';

const list = [
  {title: 'Tombol Kembali', icon: 'mail-reply'},
  {title: 'Tombol Menu Foto', icon: 'ellipsis-v'},
  {title: 'Foto Sampul', icon: 'photo'},
  {title: 'Foto Profil', icon: 'user-circle-o'},
  {title: 'Nama di Header', icon: 'buysellads'},
  {title: 'Nama di Display', icon: 'font'},
  {title: 'Nama di Obrolan', icon: 'comment'},
  {title: 'Nama di Postingan', icon: 'file-text-o'},
  {title: 'Quote Judul', icon: 'quote-right'},
  {title: 'Quote Isi', icon: 'wpforms'},
  {title: 'Informasi Umum', icon: 'eye'}
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class ComponentStyling extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPanel: true,
      translateY: new Animated.Value(330),
      translateY2: new Animated.Value(0)
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

  render() {
    const gabon = Array(50).fill('gabon')
    return(
      <View>
        <Animated.View style={{position: 'absolute', bottom: 10, right: 10, transform: [{translateY: this.state.translateY2}]}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} style={{height: 50, width: 50, backgroundColor: '#444f60', borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='magic' color='white' size={20} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{width: '100%', position: 'absolute', right: 0, left: 0, bottom: 0, alignItems: 'center', transform: [{translateY: this.state.translateY}]}}
          >
          <Animated.View style={{width: '95%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 5, backgroundColor: '#444f60', borderRadius: 5}}>
            <Text style={{color: 'white', fontSize: 18, marginLeft: 10, fontWeight: 'bold'}}>Pilih Komponen</Text>
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

          <View style={{width: '100%'}}>
            <ListComponent />
          </View>
        </Animated.View>
      </View>
    )
  }
}

class ListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: toHsv('green')
    }
  }

  render() {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '95%', backgroundColor: '#444f60', borderRadius: 5, height: 250, paddingTop: 25}}>
          <ColorPicker
            color={this.state.color}
            onColorChange={(color) => this.setState({color})}
            onColorSelected={color => alert(`Color selected: ${color}`)}
            onOldColorSelected={color => alert(`Old color selected: ${color}`)}
            style={{height: 200}}
            />
        </View>
      </View>
    )
  }
}
// {
//   list.map((x, i) =>
//   <TouchableOpacity key={i} style={{flexDirection: 'row', height: 40, paddingLeft: 10, alignItems: 'center'}}>
//     <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
//       <Icon name={x.icon} size={21} color='white' />
//     </View>
//     <Text style={{color: 'white', marginLeft: 10, fontSize: 18}}>{x.title}</Text>
//   </TouchableOpacity>
// )
// }

const BackButton = (props) => {
  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <View style={{backgroundColor: '#444f60', height: 250, borderRadius: 5, width: '95%'}}>
        <TouchableOpacity style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 18}}>Tombol Kembali</Text>
          <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
            <Icon name='mail-reply' size={21} color='white' />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}
