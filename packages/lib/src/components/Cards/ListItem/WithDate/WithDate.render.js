// @flow

import React, { Fragment } from 'react';
import { Left } from '../../../UI';
import CardsListItemText from '../Text';
import Text from '../../../Text';
import { format, getWeekDayName, getDate } from '../../../../utils/dates';
import { Right } from './WithDate.style';
import { formats } from '../../../../utils/dates/format';

type Props = {
  date: Date,
  dateFormat?: $Keys<typeof formats>,
  numberOfLines: number,
};

/**
 * Show a card with a date
 */
const WithDate = ({
  date,
  dateFormat,
  numberOfLines,
  backgroundColor,
  ...props
}: Props) => (
  <Fragment>
    <Left>
      <CardsListItemText
        numberOfLines={numberOfLines}
        backgroundColor={backgroundColor}
        {...props}
      />
    </Left>
    <Right>
      {dateFormat ? (
        <Text
          text={{ _textFromConst: String(format(dateFormat, date)) }}
          backgroundColor={backgroundColor}
        />
      ) : (
        <Fragment>
          <Text
            text={{ _textFromConst: String(getWeekDayName(date)) }}
            type="overline"
            backgroundColor={backgroundColor}
          />
          <Text
            text={{ _textFromConst: String(getDate(date)) }}
            type="h4"
            backgroundColor={backgroundColor}
          />
        </Fragment>
      )}
    </Right>
  </Fragment>
);

WithDate.defaultProps = {
  dateFormat: '',
  numberOfLines: 4,
};

export default WithDate;
