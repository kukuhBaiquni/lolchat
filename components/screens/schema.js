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

export const filterList = [
  {name: 'RGBA', active: false, fn: achromatomaly()}, // 0-1/alpha 0-1
  {name: 'Saturate', active: false, fn: kodachrome()}, // 0-2
  {name: 'Hue Rotate', active: false, fn: invert()}
]
