// @flow

import { Map } from 'immutable';

const setNewOrUpdateMap = (state, id, dateCreated, dateLastModified, data) => {
  const newItem = Map({
    ...data,
    dateCreated,
    dateLastModified,
  });

  let item = state.get(id) || newItem;

  if (!dateCreated) {
    item = item.merge({
      ...data,
      dateLastModified,
    });
  }

  return state.set(id, item);
};

export default setNewOrUpdateMap;
