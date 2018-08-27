// @flow

import moment from 'moment';
import { ensureDate } from './utils';

export const getWeekDayName = date => moment(ensureDate(date)).format('dddd');

export const getDate = date => ensureDate(date).getDate();
