// @flow

import { isDate } from './conditionals';
import AppError from '../../modules/AppError';

export const ensureDate = (date) => {
  const newDate = new Date(date);

  if (!isDate(newDate)) {
    throw new AppError(`Passed value is not a date object: ${String(date)}`);
  }

  return newDate;
};
