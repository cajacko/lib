// @flow

import React from 'react';
import { Switch, Route } from '../../lib/react-router';
import GenericErrorBoundary from '../GenericErrorBoundary';
import errors from '../../utils/errors';

const withDefaultRoute = (routes) => {
  if (routes.find(({ path }) => path === undefined)) return routes;

  const newRoutes = routes.slice();

  newRoutes.push({
    component: () => <GenericErrorBoundary error={errors.getError(2)} />,
  });

  return newRoutes;
};

const Router = ({ routes }) => (
  <Switch>
    {withDefaultRoute(routes).map(r => <Route {...r} key={r.path || ''} />)}
  </Switch>
);

export default Router;
