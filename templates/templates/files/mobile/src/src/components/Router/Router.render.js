// @flow

import React from 'react';
import * as router from 'react-router-native';
import withRouter from '@cajacko/lib/dist/components/HOCs/withRouter';

const { NativeRouter } = router;

const Router = props => (
  <NativeRouter>{withRouter(router)(props)}</NativeRouter>
);

export default Router;
