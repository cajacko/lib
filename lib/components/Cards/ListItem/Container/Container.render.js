// @flow

import React from 'react';
import { ListItem } from 'native-base';
import CardsListItemWithDate from '../WithDate';
import CardsListItemText from '../Text';
import { BACKGROUND_COLORS } from '../../../../config/styles/textIconColors';

const BACKGROUND_COLOR = BACKGROUND_COLORS.WHITE;

const CardsListItem = ({ withDate, action, ...props }) => (
  <ListItem button onPress={action}>
    {withDate ? (
      <CardsListItemWithDate backgroundColor={BACKGROUND_COLOR} {...props} />
    ) : (
      <CardsListItemText backgroundColor={BACKGROUND_COLOR} {...props} />
    )}
  </ListItem>
);

export default CardsListItem;
