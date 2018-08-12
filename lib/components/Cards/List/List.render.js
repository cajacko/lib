// @flow

import React from 'react';
import { FlatList } from '../../UI';

const CardsList = ({ cards, renderItem }) => (
  <FlatList data={cards} renderItem={renderItem} />
);

export default CardsList;
