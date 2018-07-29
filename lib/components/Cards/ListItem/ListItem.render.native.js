import React from 'react';
import { ListItem, Text } from 'native-base';

const CardsListItem = ({ text }) => (
  <ListItem>
    <Text>{text}</Text>
  </ListItem>
);

export default CardsListItem;
