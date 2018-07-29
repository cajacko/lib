import React, { Fragment } from 'react';
import { Left, Right } from 'native-base';
import CardsListItemText from '../Text';

const CardsListItem = ({ date, ...props }) => (
  <Fragment>
    <Left>
      <CardsListItemText {...props} />
    </Left>
    <Right />
  </Fragment>
);

export default CardsListItem;
