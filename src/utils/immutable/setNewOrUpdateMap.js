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
  const props = {
    ...data,
    dateCreated,
    dateLastModified,
  };

  const newItem = Record ? new Record(props) : Map(props);

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
