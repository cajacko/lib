// @flow

import React from 'react';
import { FlatList, SectionList } from '../../UI';
import type { Cards, Card, RenderSectionHeader } from '../types';
import CardsListItem from '../ListItem';

type Props = {
  cards: Cards,
  renderSectionHeader: RenderSectionHeader,
  renderItem: () => React.Component<*, *>,
};

/**
 * The default render item func, just passes all info through to the card list
 * item
 */
const RenderItem = ({ item }: { item: Card }) => <CardsListItem {...item} />;

/**
 * Display a list of cards
 */
const CardsList = ({
  cards,
  renderSectionHeader,
  renderItem,
  ...props
}: Props) => {
  const finalRenderItem = renderItem || RenderItem;

  return renderSectionHeader ? (
    <SectionList
      renderSectionHeader={renderSectionHeader}
      sections={cards}
      renderItem={finalRenderItem}
      {...props}
    />
  ) : (
    <FlatList data={cards} renderItem={finalRenderItem} {...props} />
  );
};

export default CardsList;
