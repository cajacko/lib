// @flow

import React from 'react';
import { Switch, Route } from '../../lib/react-router';
import GenericErrorBoundary from '../GenericErrorBoundary';
import errors from '../../utils/errors';
import withRouter from '../HOCs/withRouter';

const withDefaultRoute = (routes) => {
  if (routes.find(({ path }) => path === undefined)) return routes;

  const newRoutes = routes.slice();

  const Component = withRouter(({ history: { push, goBack, entries } }) => {
    let errorAction;
    let errorActionText;

    if (entries.length > 1) {
      errorAction = () => goBack();
      errorActionText = 'Navigation.GoBack';
    } else {
      errorAction = () => push('/');
      errorActionText = 'Navigation.GoToHome';
    }

    return (
      <GenericErrorBoundary
        error={errors.getError('100-002')}
        errorAction={() => errorAction}
        errorActionText={() => errorActionText}
      />
    );
  });

  newRoutes.push({
    component: Component,
  });

  return newRoutes;
};

const Router = ({ routes }) => (
  <Switch>
    {withDefaultRoute(routes).map(({ component: Component, ...r }) => (
      <Route
        key={r.path || ''}
        component={() => (
          <GenericErrorBoundary>
            <Component />
          </GenericErrorBoundary>
        )}
        {...r}
      />
    ))}
  </Switch>
);

export default Router;
