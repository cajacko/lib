// @flow

import Store from '../modules/Store';

let store;

export const init = (reducers, existingState, Storage, blacklist) => {
  store = new Store(reducers, existingState);

  store.persistStore(Storage, blacklist);

  return store.get();
};

const getStore = () => store;

export default getStore;
