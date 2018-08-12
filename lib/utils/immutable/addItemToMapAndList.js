// @flow

import addIDToList from './addIDToList';
import addItemToIDMap from './addItemToIDMap';

const addItemToMapAndList = (
  item,
  state,
  {
    idMapKey, listKey, skipAddToList, idKey,
  }
) => {
  const newState = Object.assign({}, state);
  const id = idKey ? item[idKey] : item.id;

  if (!skipAddToList) {
    newState[listKey] = addIDToList(id, newState[listKey]);
  }

  newState[idMapKey] = addItemToIDMap(id, item, newState[idMapKey]);

  return newState;
};

export default addItemToMapAndList;
