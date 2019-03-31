/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Wrapper from './src/app/Wrapper';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Wrapper);
