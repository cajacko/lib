// @flow

import React from 'react';
import { Switch, Route } from '../../lib/react-router';

const Router = ({ routes }) => (
  <Switch>{routes.map(r => <Route {...r} key={r.path || ''} />)}</Switch>
);

export default Router;
