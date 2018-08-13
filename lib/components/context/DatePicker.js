// @flow

import React from 'react';
import DatePicker from '../DatePicker';

const { Provider, Consumer } = React.createContext('light');

class DatePickerContext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      options: {},
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(options) {
    this.setState({ open: true, options });
  }

  hide() {
    this.setState({ open: false });
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
        {this.state.open && (
          <DatePicker hide={this.hide} {...this.state.options} />
        )}
      </Provider>
    );
  }
}

export { DatePickerContext as Provider };
export { Consumer };
