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
    defaultValue: [1,1,1,1],
    value: [1,1,1,1],
    index: 0,
    range: {min: 0, max: 1},
    step: 0.01,
    slider: [
      {text: 'Red', color: '#ff3d46'},
      {text: 'Green', color: '#53ff3d'},
      {text: 'Blue', color: '#403dff'},
      {text: 'Alpha', color: '#494949'}
    ],
    isExpanded: false,
  }, // 0-1/alpha 0-1
  {
    name: 'Saturate',
    active: false,
    defaultValue: [1],
    value: [1],
    index: 1,
    range: {min: 0, max: 2},
    step: 0.02,
    slider: [{text: 'Value', color: '#6d6d6d'}],
    isExpanded: false,
  }, // 0-2
  {
    name: 'Hue Rotate',
    active: false,
    defaultValue: [0],
    value: [0],
    index: 2,
    range: {min: -5, max: 5},
    step: 0.2,
    slider: [{text: 'Value', color: '#53ff3d'}],
    isExpanded: false,
  }, // -5-5
  {
    name: 'Grayscale',
    active: false,
    defaultValue: [0],
    value: [0],
    index: 3,
    range: {min: 0, max: 1},
    step: 0.01,
    slider: [{text: 'Value', color: 'gray'}],
    isExpanded: false,
  }, // 0-1
  {
    name: 'Sepia',
    active: false,
    defaultValue: [0],
    value: [0],
    index: 4,
    range: {min: 0, max: 1},
    step: 0.01,
    slider: [{text: 'Value', color: '#ba781b'}],
    isExpanded: false,
  }, // 0-1
  {
    name: 'Brightness',
    active: false,
    defaultValue: [1],
    value: [1],
    index: 5,
    range: {min: 0.3, max: 2},
    step: 0.04,
    slider: [{text: 'Value', color: '#e1e288'}],
    isExpanded: false,
  }, // 0.3-2
  {
    name: 'Contrast',
    active: false,
    defaultValue: [1],
    value: [1],
    index: 6,
    range: {min: 0.5, max: 2},
    step: 0.06,
    slider: [{text: 'Value', color: '#75756d'}],
    isExpanded: false,
  }, // 0,5-2
  {
    name: 'Temperature',
    active: false,
    defaultValue: [0],
    value: [0],
    index: 7,
    range: {min: -2, max: 2},
    step: 0.04,
    slider: [{text: 'Value', color: '#72b2b0'}],
    isExpanded: false,
  }, // -2-2
  {
    name: 'Tint',
    active: false,
    defaultValue: [0],
    value: [0],
    index: 8,
    range: {min: -1, max: 1},
    step: 0.02,
    slider: [{text: 'Value', color: '#a81f46'}],
    isExpanded: false,
  }//9-15
]

export const presetList = [
  {name: 'Invert', active: false, value: null, index: 0, fn: invert()},
  {name: 'Nightvision', active: false, value: null, index: 1, fn: nightvision()},
  {name: 'Technicolor', active: false, value: 0, index: 2, fn: technicolor()},
  {name: 'Kodachrome', active: false, value: 0, index: 3, fn: kodachrome()},
  {name: 'Protanomaly', active: false, value: null, index: 4, fn: protanomaly()}
];

export const aof = [
  rgba,
  saturate,
  hueRotate,
  grayscale,
  sepia,
  brightness,
  contrast,
  temperature,
  tint
]
