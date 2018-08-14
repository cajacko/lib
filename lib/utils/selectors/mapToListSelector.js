// @flow

import { createSelector } from 'reselect';

const mapToListSelector = (reducerKey, propKey, keyProp, sort) =>
  createSelector(
    state => state[reducerKey],
    (items) => {
      const list = items.toList();
      const sortedList = sort ? list.sort(sort) : list;

      const keyedList = keyProp
        ? sortedList.map(item => item.set('key', item.get(keyProp)))
        : sortedList;

      return {
        [propKey]: keyedList.toJS(),
      };
    }
  );

export default mapToListSelector;
