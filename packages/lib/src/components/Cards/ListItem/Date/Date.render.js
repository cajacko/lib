// @flow

import React, { Fragment } from 'react';
import { Left } from '../../../UI';
import CardsListItemText from '../Text';
import Text from '../../../Text';
import { format, getWeekDayName, getDate } from '../../../../utils/dates';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';
import { Right } from './Date.style';
import { formats } from '../../../../utils/dates/format';

type Props = {
  date: Date,
  dateFormat?: $Keys<typeof formats>,
};

/**
 * Show a card with a date
 */
const CardsListDate = ({ date, dateFormat }: Props) => (
  <Right>
    {dateFormat ? (
      <Text
        text={{ _textFromConst: String(format(dateFormat, date)) }}
        backgroundColor={BACKGROUND_COLORS.WHITE}
      />
    ) : (
      <Fragment>
        <Text
          text={{ _textFromConst: String(getWeekDayName(date)) }}
          type="overline"
          backgroundColor={BACKGROUND_COLORS.WHITE}
        />
        <Text
          text={{ _textFromConst: String(getDate(date)) }}
          type="h4"
          backgroundColor={BACKGROUND_COLORS.WHITE}
        />
      </Fragment>
    )}
  </Right>
);

CardsListDate.defaultProps = {
  dateFormat: '',
};

export default CardsListDate;
