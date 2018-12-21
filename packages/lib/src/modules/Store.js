// @flow

import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import immutableTransform from 'redux-persist-transform-immutable';
import isDev from '../utils/conditionals/isDev';
import logger from '../utils/logger';

type ActionType = { type: string };
type Reducers = {};
type ExistingState = {};
type StoreType = {
  getState: () => { [string]: any },
  dispatch: () => void,
};

/**
 * Manage the redux store in 1 location
 */
class Store {
  onFinishedStoreSetup: Promise<any>;
  onFinishedPersist: Promise<any>;
  store: ?StoreType;

  /**
   * Initialise the class, setting up promises to check if we've
   * finished setting up the store
   */
  constructor(reducers: Reducers, existingState: ExistingState) {
    // Needs to be bound before any calls to this.setupStore, as that tries to puts it's own
    // binding on it
    this.loggerMiddleware = this.loggerMiddleware.bind(this);

    this.onFinishedStoreSetup = this.setupStore(reducers, existingState);
    this.onFinishedPersist = Promise.resolve();
  }

  /**
   * Initialise the store
   */
  setupStore(reducers: Reducers, existingState: ExistingState = {}) {
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

  /**
   * Persist the store, and set the promise for when it finishes
   */
  persistStore(Storage, blacklist: Array<string> = []) {
    if (!this.store) throw new Error('Store is not setup');

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

      // Uncomment if you want to test with no cache
      // persistor.purge();
    });

    return this.onFinishedPersist;
  }

  /**
   * Returns a promise that resolves when all the store setup has been completed
   */
  onFinishedSetup() {
    return Promise.all([this.onFinishedStoreSetup, this.onFinishedPersist]);
  }

  /**
   * Get the state as a JS object, converting any immutable structures found
   * on the reducer roots
   */
  getJSState() {
    const state = this.getState();

    const newState = {};

    Object.keys(state).forEach((key) => {
      const val = state[key];

      if (val && typeof val.toJS === 'function') {
        newState[key] = val.toJS();
      } else {
        newState[key] = val;
      }
    });

    return newState;
  }

  /**
   * Log in dev mode
   */
  loggerMiddleware() {
    return (next: (action: ActionType) => void) => (action: ActionType) => {
      // We can allow this log in dev mode
      // logger.debug('REDUX BEFORE', this.getJSState());

      logger.debug(`REDUX ACTION: ${action.type}`, action);
      const res = next(action);

      // logger.debug('REDUX AFTER', this.getJSState());

      return res;
    };
  }

  /**
   * Get the state
   */
  getState(...args: *) {
    if (!this.store) throw new Error('Store is not setup');

    return this.store.getState(...args);
  }

  /**
   * Dispatch an action
   */
  dispatch(...args: *) {
    if (!this.store) throw new Error('Store is not setup');

    return this.store.dispatch(...args);
  }

  /**
   * Get the entire store object
   */
  get() {
    return this.store;
  }
}

export default Store;
