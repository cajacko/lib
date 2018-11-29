// @flow

import { Map } from 'immutable';

const setNewOrUpdateMap = (
  state,
  id,
  dateCreated,
  dateLastModified,
  data,
  Record
) => {
  let item;
  const existingItem = state.get(id);

  if (existingItem) {
    item = existingItem.merge({
      ...data,
      dateLastModified,
    });
  } else {
    const props = {
      ...data,
      dateCreated: dateCreated || dateLastModified,
      dateLastModified,
    };

    item = Record ? new Record(props) : Map(props);
  }

  return state.set(id, item);
};

export default setNewOrUpdateMap;
