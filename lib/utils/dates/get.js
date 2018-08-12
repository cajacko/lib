// @flow

import { ensureDate } from './utils';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getWeekDayName = date => days[ensureDate(date).getDay()];

export const getDate = date => ensureDate(date).getDate();
