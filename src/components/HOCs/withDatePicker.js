// @flow

import React from 'react';
import { Consumer } from '../context/DatePicker';

const withDatePicker = Component => props => (
  <Consumer>
    {datePicker => <Component datePicker={datePicker} {...props} />}
  </Consumer>
);

export default withDatePicker;
