// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import { REDUCERS } from '../config';

const reducers = combineReducers(REDUCERS);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger),
    autoRehydrate(),
  ),
);

persistStore(store);

export default store;
