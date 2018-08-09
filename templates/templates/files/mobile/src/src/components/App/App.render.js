// @flow

import React from 'react';
import { Text } from 'react-native';
import SafeAreaView from '@cajacko/lib/dist/components/SafeAreaView';
import GenericErrorBoundary from '@cajacko/lib/dist/components/GenericErrorBoundary';
import logger from '@cajacko/lib/dist/utils/logger';
import Router from '../Router';
import config from '../../config';

const Error = ({ text }) => {
  const errorMessage = text || 'Undefined error';

  logger.error(errorMessage);
  return <Text>{errorMessage}</Text>;
};

const WithRouter = () => {
  if (config.ROUTES) {
    if (!config.ROUTES.length) {
      return <Error text="ROUTES does not contain any routes" />;
    }

    return <Router routes={config.ROUTES} />;
  }

  if (config.ENTRY_COMPONENT) {
    const EntryComponent = config.ENTRY_COMPONENT;
    return <EntryComponent />;
  }

  return (
    <Error text="Error: No ROUTES or ENTRY_COMPONENT defined in the entry file" />
  );
};

const Root = () => (
  <GenericErrorBoundary>
    <SafeAreaView>
      <GenericErrorBoundary>
        <WithRouter />
      </GenericErrorBoundary>
    </SafeAreaView>
  </GenericErrorBoundary>
);

export default Root;
