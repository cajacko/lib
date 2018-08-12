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
};

const CardsListItem = ({
  date,
  dateFormat,
  numberOfLines,
  ...props
}: Props) => (
  <Fragment>
    <Left>
      <CardsListItemText numberOfLines={numberOfLines} {...props} />
    </Left>
    <Right>
      {dateFormat ? (
        <Text text={format(dateFormat, date)} />
      ) : (
        <Fragment>
          <Text text={getWeekDayName(date)} type="overline" />
          <Text text={getDate(date)} type="h4" />
        </Fragment>
      )}
    </Right>
  </Fragment>
);

CardsListItem.defaultProps = {
  dateFormat: '',
  numberOfLines: 4,
};

export default CardsListItem;
