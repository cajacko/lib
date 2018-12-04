// @flow

import React from 'react';
import { FlatList, SectionList } from '../../UI';
import type { Cards, Card, RenderSectionHeader } from '../types';
import CardsListItem from '../ListItem';

type Props = {
  cards: Cards,
  bottomItem?: Card,
  renderSectionHeader?: RenderSectionHeader,
  renderItem?: () => React.Component<*, *>,
  renderBottomItem?: () => React.Component<*, *>,
};

const defaultProps = {
  bottomItem: null,
  renderSectionHeader: null,
  renderItem: null,
  renderBottomItem: null,
};

type RenderItemProps = {
  item: Card & {
    _renderCustom?: Card => React.Component<*, *>,
  },
};

/**
 * The default render item func, just passes all info through to the card list
 * item
 */
const RenderItem = ({
  item: { _renderCustom, ...itemProps },
}: RenderItemProps) =>
  (_renderCustom ? _renderCustom(itemProps) : <CardsListItem {...itemProps} />);

/**
 * Display a list of cards
 */
const CardsList = ({
  cards,
  renderSectionHeader,
  renderItem,
  renderBottomItem,
  bottomItem,
  ...props
}: Props) => {
  const finalRenderItem = renderItem || RenderItem;
  const finalCards = cards.slice();

  if (renderBottomItem) {
    finalCards.push({
      _renderCustom: renderBottomItem,
      key: '_customBottomRender',
    });
  } else if (bottomItem) {
    finalCards.push({
      key: '_customBottomRender',
      ...bottomItem,
    });
  }

  return renderSectionHeader ? (
    <SectionList
      renderSectionHeader={renderSectionHeader}
      sections={finalCards}
      renderItem={finalRenderItem}
      {...props}
    />
  ) : (
    <FlatList data={finalCards} renderItem={finalRenderItem} {...props} />
  );
};

CardsList.defaultProps = defaultProps;

export default CardsList;
