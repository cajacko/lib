// @flow

import { isDate } from './conditionals';

export const ensureDate = (date) => {
  const newDate = new Date(date);

  if (!isDate(newDate)) {
    throw new Error(`Passed value is not a date object: ${String(date)}`);
  }

  return newDate;
};
