// @flow

import React from 'react';
import SafeAreaView from '../SafeAreaView';
import GenericErrorBoundary from '../GenericErrorBoundary';
import { Provider as DatePickerProvider } from '../context/DatePicker';
import AppLoading from '../AppLoading';
import RouterOrEntry from '../RouterOrEntry';
import StoreOrChildren from '../StoreOrChildren';

const Entry = ({
  config: {
    REDUCERS, EXISTING_STATE, BLACKLIST, ROUTES, ENTRY_COMPONENT,
  },
  storage,
}) => (
  <GenericErrorBoundary>
    <StoreOrChildren
      reducers={REDUCERS}
      existingState={EXISTING_STATE}
      storage={storage}
      backlist={BLACKLIST}
    >
      <SafeAreaView>
        <AppLoading>
          <GenericErrorBoundary>
            <DatePickerProvider>
              <RouterOrEntry routes={ROUTES} EntryComponent={ENTRY_COMPONENT} />
            </DatePickerProvider>
          </GenericErrorBoundary>
        </AppLoading>
      </SafeAreaView>
    </StoreOrChildren>
  </GenericErrorBoundary>
);

export default Entry;
