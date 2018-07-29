import React from 'react';
import { FlatList } from '../../UI';
import Text from '../../Text';
import CardsListItem from '../ListItem';
import Alert from '../../Alert';

const CardsList = ({ cards, itemAction, ...props }) =>
  (cards && cards.length ? (
    <FlatList
      data={cards}
      renderItem={({ item }) => (
        <CardsListItem action={itemAction(item)} {...item} {...props} />
      )}
    />
  ) : (
    <Alert text="No items" />
  ));

export default CardsList;
