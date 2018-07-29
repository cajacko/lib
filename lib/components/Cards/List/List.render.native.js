import React from 'react';
import { FlatList, View, Text } from 'react-native';
import CardsListItem from '../ListItem';

const CardsList = ({ cards, ...props }) =>
  (cards && cards.length ? (
    <FlatList
      data={cards}
      renderItem={({ item }) => <CardsListItem {...item} {...props} />}
    />
  ) : (
    <View>
      <Text>No items</Text>
    </View>
  ));

export default CardsList;
