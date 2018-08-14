// @flow

import { createSelector } from 'reselect';

const itemByIDFromMapSelector = reducerKey =>
  createSelector(
    (state, id) => state[reducerKey].get(id),
    item => (item ? item.toJS() : { dataNotFound: true })
  );

export default itemByIDFromMapSelector;
