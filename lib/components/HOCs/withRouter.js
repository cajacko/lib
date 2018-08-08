// @flow

import React from 'react';

const withRouter = ({ Switch, Route }) => ({ routes }) => (
  <Switch>{routes.map(r => <Route {...r} key={r.path || ''} />)}</Switch>
);

export default withRouter;
