// @flow

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import SafeAreaView from '@cajacko/lib/dist/components/SafeAreaView';
import GenericErrorBoundary from '@cajacko/lib/dist/components/GenericErrorBoundary';
import { init } from '@cajacko/lib/dist/utils/store';
import AppError from '@cajacko/lib/dist/modules/AppError';
import { Provider as DatePickerProvider } from '@cajacko/lib/dist/components/context/DatePicker';
import Router from '../Router';
import config from '../../config';

const WithRouter = () => {
  if (config.ROUTES) {
    if (!config.ROUTES.length) {
      throw new AppError('ROUTES does not contain any routes');
    }

    return <Router routes={config.ROUTES} />;
  }

  if (config.ENTRY_COMPONENT) {
    const EntryComponent = config.ENTRY_COMPONENT;
    return <EntryComponent />;
  }

  throw new AppError('Error: No ROUTES or ENTRY_COMPONENT defined in the entry file');
};

const WithStore = ({ children }) => {
  const { REDUCERS, EXISTING_STATE, BLACKLIST } = config;

  if (!REDUCERS) return children;

  const store = init(REDUCERS, EXISTING_STATE, AsyncStorage, BLACKLIST);

  return <Provider store={store}>{children}</Provider>;
};

const Root = () => (
  <GenericErrorBoundary>
    <WithStore>
      <SafeAreaView>
        <GenericErrorBoundary>
          <DatePickerProvider>
            <WithRouter />
          </DatePickerProvider>
        </GenericErrorBoundary>
      </SafeAreaView>
    </WithStore>
  </GenericErrorBoundary>
);

export default Root;
