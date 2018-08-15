// @flow

import isEqual from 'lodash/isEqual';
import { isDate } from '../dates';

const areValsDifferent = (a, b) => {
  if (typeof a !== typeof b) return true;

  if (typeof a === 'object') {
    if (isDate(a)) {
      if (!isDate(b)) return false;

      return a.getTime() !== b.getTime();
    }
  }

  return !isEqual(a, b);
};

export default areValsDifferent;
