// @flow

import React from 'react';
import { Text } from 'react-native';
import config from '../../config';

const Error = ({ text }) => {
  const errorMessage = text || 'Undefined error';

  console.error(errorMessage);
  return <Text>{errorMessage}</Text>;
};

const WithRouter = () => {
  // if (config.ROUTES) {
  //   if (!config.ROUTES.length) {
  //     return <Error text="ROUTES does not contain any routes" />;
  //   }

  //   return <Router routes={config.ROUTES} />;
  // }

  if (config.ENTRY_COMPONENT) {
    const EntryComponent = config.ENTRY_COMPONENT;
    return <EntryComponent />;
  }

  return (
    <Error text="Error: No ROUTES or ENTRY_COMPONENT defined in the entry file" />
  );
};

const Root = () => <WithRouter />;

export default Root;
