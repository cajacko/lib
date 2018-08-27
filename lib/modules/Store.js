// @flow

import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import immutableTransform from 'redux-persist-transform-immutable';
import isDev from '../utils/conditionals/isDev';
import logger from '../utils/logger';

type ActionType = { type: string };

class Store {
  constructor(reducers, existingState) {
    this.onFinishedStoreSetup = this.setupStore(reducers, existingState);
    this.onFinishedPersist = Promise.resolve();
  }

  setupStore(reducers, existingState = {}) {
    const middleware = isDev()
      ? applyMiddleware(this.loggerMiddleware, thunk)
      : applyMiddleware(thunk);

    this.store = createStore(
      combineReducers(reducers),
      existingState,
      compose(
        middleware,
        autoRehydrate()
      )
    );

    return Promise.resolve();
  }

  persistStore(Storage, blacklist = []) {
    this.onFinishedPersist = new Promise((resolve) => {
      const persistor = persistStore(
        this.store,
        {
          storage: Storage,
          blacklist,
          transforms: [immutableTransform()],
        },
        resolve
      );
    });

    return this.onFinishedPersist;
  }

  onFinishedSetup() {
    return Promise.all([this.onFinishedStoreSetup, this.onFinishedPersist]);
  }

  loggerMiddleware() {
    return (next: (action: ActionType) => void) => (action: ActionType) => {
      // We can allow this log in dev mode
      logger.debug(`REDUX ACTION: ${action.type}`, action);

      return next(action);
    };
  }

  getState(...args) {
    return this.store.getState(...args);
  }

  get() {
    return this.store;
  }
}

export default Store;
