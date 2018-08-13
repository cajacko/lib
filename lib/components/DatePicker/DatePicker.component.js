// @flow

import React, { Component } from 'react';
import DatePicker from './DatePicker.render';
import { ensureDate } from '../../utils/dates';

type Props = {};
type State = {};

/**
 * Business logic for the datepicker
 */
class DatePickerComponent extends Component<Props, State> {
  /**
   * Initialise the class, set the initial state and bind the methods
   *
   * @param {Object} props The props passed to the component, check flow for
   * more detail
   *
   * @return {Void} No return value
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      date: ensureDate(props.date, new Date()),
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    const actualDate = ensureDate(date);

    this.setState({ date: actualDate });

    if (this.props.onDateChange) this.props.onDateChange(actualDate);
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <DatePicker
        hide={this.props.hide}
        date={this.state.date}
        onDateChange={this.onDateChange}
        mode={this.props.mode || 'date'}
      />
    );
  }
}

export default DatePickerComponent;
