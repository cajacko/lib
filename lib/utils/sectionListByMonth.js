// @flow

import { List, Map } from 'immutable';
import { isMonthYearDiff } from './dates';

const defaultConfig = {
  datePropLocation: ['date'],
  dateKey: 'date',
  dataKey: 'data',
};

const sectionListByMonth = (
  list,
  { datePropLocation, dateKey, dataKey } = defaultConfig
) => {
  let sections = List();
  let section;
  let prevDate;

  list.forEach((listItem) => {
    const date = new Date(listItem.getIn(datePropLocation));

    if (isMonthYearDiff(prevDate, date)) {
      if (section) {
        sections = sections.push(section);
      }

      section = Map({
        [dateKey]: date,
        [dataKey]: List(),
      });
    }

    section = section.set(dataKey, section.get(dataKey).push(listItem));

    prevDate = date;
  });

  if (section) {
    sections = sections.push(section);
  }

  return sections;
};

export default sectionListByMonth;
