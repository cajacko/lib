// @flow

const addIDToList = (id, list) => {
  const newList = list.slice();

  newList.unshift(id);

  return newList;
};

export default addIDToList;
