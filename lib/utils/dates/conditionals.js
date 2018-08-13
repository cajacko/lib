// @flow

import moment from 'moment';

export const isDate = date => moment(date).isValid();
