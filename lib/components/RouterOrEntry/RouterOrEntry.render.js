// @flow

import React from 'react';
import AppError from '../../modules/AppError';
import { NativeRouter } from '../../lib/react-router';
import Router from '../Router';

const RouterOrEntry = ({ routes, EntryComponent }) => {
  if (routes) {
    if (!routes.length) {
      throw new AppError('ROUTES does not contain any routes');
    }

    return (
      <NativeRouter>
        <Router routes={routes} />
      </NativeRouter>
    );
  }

  if (EntryComponent) {
    return <EntryComponent />;
  }

  throw new AppError('Error: No ROUTES or ENTRY_COMPONENT defined in the entry file');
};

export default RouterOrEntry;
