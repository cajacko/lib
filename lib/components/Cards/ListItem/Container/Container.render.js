// @flow

import React from 'react';
import { ListItem } from 'native-base';
import CardsListItemWithDate from '../WithDate';
import CardsListItemText from '../Text';

const CardsListItem = ({ withDate, action, ...props }) => (
  <ListItem button onPress={action}>
    {withDate ? (
      <CardsListItemWithDate {...props} />
    ) : (
      <CardsListItemText {...props} />
    )}
  </ListItem>
);

export default CardsListItem;
