// @flow

import Store from '../modules/Store';
import appLoading from './appLoading';

let store;

export const init = (reducers, existingState, Storage, blacklist, opts) => {
  store = new Store(reducers, existingState, opts);

  const waitForID = 'redux-store';
  appLoading.register(waitForID);

  store.persistStore(Storage, blacklist).then(() => {
    appLoading.resolve(waitForID);
  });

  return store.get();
};

const getStore = () => store;

export default getStore;
