// @flow

import { createSelector } from 'reselect';

const mapItemFromIDMap = (id, reducerKey, mapLocation) =>
  createSelector(
    state => state[reducerKey].getIn(mapLocation).get(id),
    item => (item ? item.toJS() : { dataNotFound: true })
  );

export default mapItemFromIDMap;
