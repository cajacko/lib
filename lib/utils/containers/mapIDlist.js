// @flow

import { createSelector } from 'reselect';

export const mapIDList = (reducerKey, listLocation, propKey) =>
  createSelector(
    state => state[reducerKey].getIn(listLocation),
    items => ({
      [propKey]: items.toJS().map(id => ({ key: id, id })),
    })
  );

export default mapIDList;
