// @flow

import { createSelector } from 'reselect';

const mapToListSelector = (reducerKey, propKey, sort) =>
  createSelector(
    state => state[reducerKey],
    (items) => {
      const list = items.toList();
      const sortedList = sort ? list.sort(sort) : list;

      return {
        [propKey]: sortedList,
      };
    }
  );

export default mapToListSelector;
