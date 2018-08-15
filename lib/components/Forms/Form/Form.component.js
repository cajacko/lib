// @flow

import React, { Component } from 'react';
import withDatePicker from '../../HOCs/withDatePicker';
import { ensureDate } from '../../../utils/dates';

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);

    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(props) {
    const derivedState = this.getStateFromProps(props);
    const state = {};

    Object.keys(derivedState).forEach((stateKey) => {
      const value = derivedState[stateKey];

      if (value !== this.props[stateKey]) {
        state[stateKey] = value;
      }
    });

    if (Object.keys(state).length) {
      this.setState(state);
    }
  }

  componentWillUnmount() {
    this.hideDatePicker();
  }

  getStateFromProps(props) {
    const actualProps = props || this.props;

    const state = Object.assign({}, actualProps);

    delete state.datePicker;
    delete state.children;

    return state;
  }

  showDatePicker(key, mode: 'date') {
    return () => {
      const initialDate = new Date(this.state[key]);

      this.props.datePicker.showDatePicker({
        date: this.state[key],
        mode,
        onDateChange: (date) => {
          this.setState({ [key]: ensureDate(date) });
        },
        onDateCancel: () => {
          this.setState({ [key]: ensureDate(initialDate) });
        },
        onDateSet: (date) => {
          this.setState({ [key]: ensureDate(date) });
        },
      });
    };
  }

  hideDatePicker() {
    this.props.datePicker.hideDatePicker();
  }

  onChange(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  render() {
    return this.props.children({
      hideDatePicker: this.hideDatePicker,
      showDatePicker: this.showDatePicker,
      onChange: this.onChange,
      ...this.state,
    });
  }
}

export default withDatePicker(FormComponent);
