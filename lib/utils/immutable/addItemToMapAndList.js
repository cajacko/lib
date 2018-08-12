// @flow

import addIDToList from './addIDToList';
import addItemToIDMap from './addItemToIDMap';

const addItemToMapAndList = (id, item, state, idMapKey, listKey) => {
  const newState = Object.assign({}, state);

  newState[listKey] = addIDToList(id, newState[listKey]);
  newState[idMapKey] = addItemToIDMap(id, item, newState[idMapKey]);

  return newState;
};

export default addItemToMapAndList;
