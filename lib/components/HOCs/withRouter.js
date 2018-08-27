// @flow

import React from 'react';
import merge from 'lodash/merge';
import isEqual from '../../utils/conditionals/isEqual';
import { withRouter as RRWithRouter } from '../../lib/react-router';

// Don't push if same route
const passRouterProps = (location, history) => {
  const newHistory = {};

  merge(newHistory, history);

  const push = preventPush => (newPathname, state, forceUpdate) => {
    if (!forceUpdate) {
      if (
        isEqual(newPathname, location.pathname) &&
        isEqual(state, location.state)
      ) {
        return false;
      }
    }

    if (!preventPush) {
      history.push(newPathname, state);
    }

    return true;
  };

  newHistory.push = push(false);
  newHistory.wouldPushUpdate = push(true);

  return { location, history: newHistory };
};

const WithRouter = Component =>
  RRWithRouter(({ location, history, ...props }) => (
    <Component {...passRouterProps(location, history)} {...props} />
  ));

export default WithRouter;
