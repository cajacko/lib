// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../utils/store';

let store;

const StoreOrChildren = ({
  reducers,
  existingState,
  blackList,
  children,
  storage,
  shouldLogState,
  purgeOnLoad,
}) => {
  if (!reducers) return children;

  if (!store) {
    store = init(reducers, existingState, storage, blackList, {
      shouldLogState,
      purgeOnLoad,
    });
  }

  return <Provider store={store}>{children}</Provider>;
};

export default StoreOrChildren;
