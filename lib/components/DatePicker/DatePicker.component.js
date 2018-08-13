// @flow

import React, { Component } from 'react';
import DatePicker from './DatePicker.render';

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
      date: props.date || new Date(),
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });

    if (this.props.onDateChange) this.props.onDateChange(date);
  }

  /**
   * Render the component
   *
   * @return {ReactElement} Markup to render
   */
  render() {
    return (
      <DatePicker
        date={this.state.date}
        onDateChange={this.onDateChange}
        mode={this.props.mode || 'date'}
      />
    );
  }
}

export default DatePickerComponent;
