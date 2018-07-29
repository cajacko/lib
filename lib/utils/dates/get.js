// @flow

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getWeekDayName = date => days[date.getDay()];
export const getDate = date => date.getDate();
