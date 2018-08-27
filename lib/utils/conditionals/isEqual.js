// @flow

import _isEqual from 'lodash/isEqual';
import { isDate } from '../dates';

const isEqual = (a, b) => {
  if (typeof a !== typeof b) return false;

  if (typeof a === 'object') {
    if (isDate(a)) {
      if (!isDate(b)) return false;

      return a.getTime() === b.getTime();
    }
  }

  return _isEqual(a, b);
};

export default isEqual;
