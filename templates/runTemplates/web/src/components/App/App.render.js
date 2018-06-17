// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ROUTES } from '../../config';
import store from '../../store';
import Router from '../Router';

const Root = () => (
  <Provider store={store}>
    <Router routes={ROUTES} />
  </Provider>
);

export default Root;
