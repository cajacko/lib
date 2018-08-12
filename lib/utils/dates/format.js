// @flow

import withCache from '../withCache';
import { isDate } from './conditionals';
import AppError from '../../modules/AppError';

export const formats = {
  date: () => 'Wednesday 1st August 2018',
};

const format = (type, date, errorVal) => {
  if (!type) throw new AppError('No date format given');

  if (!isDate(date)) {
    if (errorVal === undefined) {
      throw new AppError('Could not parse date');
    }

    return errorVal;
  }

  const func = formats[type];

  if (!func) {
    throw new AppError(`Date format function does not exist: ${String(type)}`);
  }

  return func(date);
};

const cacheKeyFunc = (type, date) => {
  if (!isDate(date)) return null;

  return `${type}-${date.getTime()}`;
};

export default withCache(format, undefined, cacheKeyFunc);
