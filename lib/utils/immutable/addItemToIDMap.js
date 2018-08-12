// @flow

const addItemToIDMap = (id, item, map) => {
  const newMap = Object.assign({}, map);

  newMap[id] = item;

  return newMap;
};

export default addItemToIDMap;
