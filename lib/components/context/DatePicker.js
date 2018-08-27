// @flow

import React from 'react';
import { DatePickerAndroid } from 'react-native';
import isPlatform from '../../utils/conditionals/isPlatform';
import DatePicker from '../DatePicker';
import { ensureDate } from '../../utils/dates';

const { Provider, Consumer } = React.createContext();

class DatePickerContext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      options: {},
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onDateSet = this.onDateSet.bind(this);
  }

  onDateSet(date) {
    if (this.state.options.onDateSet) {
      this.state.options.onDateSet(date);
    }

    this.hide();
  }

  show(options) {
    this.setState({ open: true, options });

    if (isPlatform('android')) {
      DatePickerAndroid.open({
        date: ensureDate(options.date),
        mode: options.mode || 'calendar',
      }).then(({
        action, year, month, day,
      }) => {
        if (action === DatePickerAndroid.dismissedAction) {
          this.hide();
          return;
        }

        const date = new Date(year, month, day);

        this.onDateSet(date);
      });
    }
  }

  hide() {
    this.setState({ open: false, options: {} });
  }

  render() {
    return (
      <Provider
        value={{
          showDatePicker: this.show,
          hideDatePicker: this.hide,
          isDatePickerOpen: this.state.open,
        }}
      >
        {this.props.children}
        {this.state.open &&
          isPlatform('ios') && (
            <DatePicker
              hide={this.hide}
              onDateSet={this.onDateSet}
              {...this.state.options}
            />
          )}
      </Provider>
    );
  }
}

export { DatePickerContext as Provider };
export { Consumer };
