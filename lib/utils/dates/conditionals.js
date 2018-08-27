// @flow

import moment from 'moment';

export const isDate = date => moment(date).isValid();

export const isMonthYearDiff = (dateA, dateB) => {
  if (!dateA) return true;

  if (
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  ) {
    return false;
  }

  return true;
};
