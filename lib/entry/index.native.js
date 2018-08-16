// @flow
// Bootstrap the project and load in things in the correct order

import { NativeModules, AsyncStorage } from 'react-native';
import '@cajacko/lib/dist/utils/bootstrap';
import React from 'react';
import { Provider } from 'react-redux';
import SafeAreaView from '@cajacko/lib/dist/components/SafeAreaView';
import GenericErrorBoundary from '@cajacko/lib/dist/components/GenericErrorBoundary';
import { init } from '@cajacko/lib/dist/utils/store';
import AppError from '@cajacko/lib/dist/modules/AppError';
import { Provider as DatePickerProvider } from '@cajacko/lib/dist/components/context/DatePicker';
import AppLoading from '@cajacko/lib/dist/components/AppLoading';
import { NativeRouter } from '@cajacko/lib/dist/lib/react-router';
import Router from '@cajacko/lib/dist/components/Router';

const entry = (config) => {
  console.disableYellowBox = true;
  NativeModules.ExceptionsManager = null;

  const WithRouter = () => {
    if (config.ROUTES) {
      if (!config.ROUTES.length) {
        throw new AppError('ROUTES does not contain any routes');
      }

      return (
        <NativeRouter>
          <Router routes={config.ROUTES} />
        </NativeRouter>
      );
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
          <AppLoading>
            <GenericErrorBoundary>
              <DatePickerProvider>
                <WithRouter />
              </DatePickerProvider>
            </GenericErrorBoundary>
          </AppLoading>
        </SafeAreaView>
      </WithStore>
    </GenericErrorBoundary>
  );

  return Root;
};

export default entry;
