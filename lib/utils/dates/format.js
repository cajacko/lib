// @flow

import withCache from '../withCache';
import { isDate } from './conditionals';

const formats = {};

const format = (type, date, errorVal) => {
  if (!type) throw new Error('No date format given');

  if (!isDate(date)) {
    if (errorVal === undefined) {
      throw new Error('Could not parse date');
    }

    return errorVal;
  }

  const func = formats[type];

  if (!func) {
    throw new Error(`Date format function does not exist: ${String(type)}`);
  }

  return func(date);
};

const cacheKeyFunc = (type, date) => {
  if (!isDate(date)) return null;

  return `${type}-${date.getTime()}`;
};

export default withCache(format, undefined, cacheKeyFunc);
