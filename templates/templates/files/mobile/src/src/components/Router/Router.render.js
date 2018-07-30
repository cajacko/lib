// @flow

import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';

const Router = ({ routes }) => (
  <NativeRouter>
    <Switch>{routes.map(r => <Route {...r} key={r.path || ''} />)}</Switch>
  </NativeRouter>
);

export default Router;
