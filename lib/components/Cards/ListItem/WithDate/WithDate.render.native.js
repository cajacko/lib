import React, { Fragment } from 'react';
import { Left, Right } from 'native-base';
import CardsListItemText from '../Text';
import Text from '../../../Text';

const CardsListItem = ({ date, ...props }) => (
  <Fragment>
    <Left>
      <CardsListItemText {...props} />
    </Left>
    <Right>
      <Text text="date" />
    </Right>
  </Fragment>
);

export default CardsListItem;
