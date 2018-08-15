// Bootstrap the project and load in things in the correct order

import { NativeModules } from 'react-native';
import './src/config';
import '@cajacko/lib/dist/utils/bootstrap';

console.disableYellowBox = true;
NativeModules.ExceptionsManager = null;

export { default } from './src/components/App';
