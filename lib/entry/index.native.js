// @flow

// Bootstrap the project and load in things in the correct order
import '../utils/bootstrap';
import { SplashScreen } from 'expo';
import { AsyncStorage } from 'react-native';
import React from 'react';
import Entry from '../components/Entry';

SplashScreen.preventAutoHide();

const entry = config => () => <Entry config={config} storage={AsyncStorage} />;

export default entry;
