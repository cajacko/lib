import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Left, Right } from 'native-base';
import CardsListItemText from '../Text';
import Text from '../../../Text';
import { format, getWeekDayName, getDate } from '../../../../utils/dates';

const CardsListItem = ({ date, dateFormat, ...props }) => (
  <Fragment>
    <Left>
      <CardsListItemText {...props} />
    </Left>
    <Right>
      {dateFormat ? (
        <Text text={format(dateFormat, date)} />
      ) : (
        <View>
          <Text text={getWeekDayName(date)} uppercase />
          <Text text={getDate(date)} />
        </View>
      )}
    </Right>
  </Fragment>
);

CardsListItem.defaultProps = {
  dateFormat: '',
};

export default CardsListItem;
