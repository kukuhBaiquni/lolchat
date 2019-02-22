import {
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

export const filterList = [
  {
    name: 'RGBA',
    active: false,
    value: [{v: 1}, {v: 1}, {v: 1}, {v: 1}],
    index: 0,
    fn: rgba(() => this.value[0].v, () => this.value[1].v, () => this.value[2].v, () => this.value[3].v)
  }, // 0-1/alpha 0-1
  {
    name: 'Saturate',
    active: false,
    value: 1,
    index: 1,
    fn: saturate(() => this.value)
  }, // 0-2
  {name: 'Hue Rotate', active: false, value: 0, index: 2, fn: hueRotate(() => this.value)}, // -5-5
  {name: 'Invert', active: false, value: null, index: 3, fn: invert()},
  {name: 'Grayscale', active: false, value: 0, index: 4, fn: grayscale(() => this.value)}, // 0-1
  {name: 'Sepia', active: false, value: 0, index: 5, fn: sepia(() => this.value)}, // 0-1
  {name: 'Nightvision', active: false, value: null, index: 6, fn: nightvision()},
  {name: 'Brightness', active: false, value: 1, index: 7, fn: brightness(() => this.value)}, // 0.3-2
  {name: 'Contrast', active: false, value: 1, index: 8, fn: contrast(() => this.value)}, // 0,5-2
  {name: 'Temperature', active: false, value: 0, index: 9, fn: temperature(() => this.value)}, // -2-2
  {name: 'Tint', active: false, value: 0, index: 10, fn: tint(() => this.value)}, //-1-1
  {name: 'Threshold', active: false, value: 15, index: 11, fn: threshold(() => this.value)}, //9-15
  {name: 'Technicolor', active: false, value: 0, index: 12, fn: technicolor()},
  {name: 'Kodachrome', active: false, value: 0, index: 13, fn: kodachrome()},
  {
    name: 'Color Tone',
    active: false,
    value: [{v: 0.2}, {v:0.5}, {v: '#FFE580'}, {v: '#338000'}],
    index: 14,
    fn: colorTone(() => this.value[0].v, () => this.value[1].v, () => this.value[2].v, () => this.value[3].v)
  },
  {
    name: 'Duo Tone',
    active: false,
    value: [{v: '#FFE580'}, {v: '#338000'}],
    index: 15,
    fn: duoTone(() => this.value[0].v, () => this.value[1].v)
  },
  {name: 'Protanomaly', active: false, value: null, index: 16, fn: protanomaly()}
]
