// @flow

import setNewOrUpdateMap from './setNewOrUpdateMap';

const setNewOrUpdateMapAndList = (
  state,
  listLocation,
  idMapLocation,
  id,
  dateCreated,
  dateLastModified,
  data,
  sort
) => {
  let newState = state.setIn(
    idMapLocation,
    setNewOrUpdateMap(
      state.getIn(idMapLocation),
      id,
      dateCreated,
      dateLastModified,
      data
    )
  );

  if (dateCreated) {
    newState = newState.setIn(
      listLocation,
      newState.getIn(listLocation).unshift(id)
    );
  }

  if (!sort) return newState;

  return newState.setIn(
    listLocation,
    sort(newState.getIn(listLocation), newState)
  );
};

export default setNewOrUpdateMapAndList;
