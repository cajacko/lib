// @flow

import { isDate } from './conditionals';
import AppError from '../../modules/AppError';

export const ensureDate = (date, fallback) => {
  const newDate = new Date(date);

  if (!isDate(newDate)) {
    if (fallback) return fallback;

    throw new AppError(`Passed value is not a date object: ${String(date)}`);
  }

  return newDate;
};
