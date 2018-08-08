// @flow

import React from 'react';
import { NativeRouter } from '@cajacko/lib/dist/lib/react-router';
import LibRouter from '@cajacko/lib/dist/components/Router';

const Router = props => (
  <NativeRouter>
    <LibRouter {...props} />
  </NativeRouter>
);

export default Router;
