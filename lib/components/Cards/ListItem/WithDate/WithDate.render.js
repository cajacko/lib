import React, { Fragment } from 'react';
import { Left } from '../../../UI';
import CardsListItemText from '../Text';
import Text from '../../../Text';
import { format, getWeekDayName, getDate } from '../../../../utils/dates';
import { Right } from './WithDate.style';

const CardsListItem = ({ date, dateFormat, ...props }) => (
  <Fragment>
    <Left>
      <CardsListItemText {...props} />
    </Left>
    <Right>
      {dateFormat ? (
        <Text text={format(dateFormat, date)} />
      ) : (
        <Fragment>
          <Text text={getWeekDayName(date)} uppercase type="overline" />
          <Text text={getDate(date)} type="h4" />
        </Fragment>
      )}
    </Right>
  </Fragment>
);

CardsListItem.defaultProps = {
  dateFormat: '',
};

export default CardsListItem;
