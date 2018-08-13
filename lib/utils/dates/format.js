// @flow

import moment from 'moment';
import withCache from '../withCache';
import { ensureDate } from './utils';
import { isDate } from './conditionals';
import AppError from '../../modules/AppError';

export const formats = {
  fullDate: date => moment(date).format('ddd MMM Do YYYY'),
};

const format = (type, date, errorVal) => {
  if (!type) throw new AppError('No date format given');

  let actualDate;

  try {
    actualDate = ensureDate(date);
  } catch (e) {
    if (errorVal === undefined) {
      throw new AppError(e);
    }

    return errorVal;
  }

  const func = formats[type];

  if (!func) {
    throw new AppError(`Date format function does not exist: ${String(type)}`);
  }

  return func(actualDate);
};

const cacheKeyFunc = (type, date) => {
  let actualDate;

  try {
    actualDate = ensureDate(date);
  } catch (e) {
    return null;
  }

  return `${type}-${actualDate.getTime()}`;
};

export default withCache(format, undefined, cacheKeyFunc);
