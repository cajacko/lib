// @flow

// Ignore import/first as we want bootstrap to load before everything
/* eslint import/first: 0 */

// Bootstrap the project and load in things in the correct order
import '../utils/bootstrap';
import { AsyncStorage } from 'react-native';
import React from 'react';
import Entry from '../components/Entry';

const entry = config => () => <Entry config={config} storage={AsyncStorage} />;

export default entry;
