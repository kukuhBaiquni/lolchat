/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Wrapper from './components/Wrapper';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Wrapper);
