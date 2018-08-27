// @flow

import React from 'react';
import { DatePickerIOS } from 'react-native';
import Header from '../Header';
import Button from '../Button';
import { Container, HideArea, DatePickerContainer } from './DatePicker.style';

/**
 * Render the date picker
 *
 * @param {Object} props The props passed to the component, check flow for more detail
 *
 * @return {ReactElement} The components markup to render
 */
const DatePicker = ({
  date, onDateChange, mode, hide, set, cancel,
}) => (
  <Container>
    <Button action={cancel}>
      <HideArea />
    </Button>
    <Header
      rightText="General.Set"
      rightAction={set}
      leftText="General.Cancel"
      leftAction={cancel}
    />
    <DatePickerContainer>
      <DatePickerIOS date={date} onDateChange={onDateChange} mode={mode} />
    </DatePickerContainer>
  </Container>
);

export default DatePicker;
