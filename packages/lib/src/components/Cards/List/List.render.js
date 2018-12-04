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
  keyExtractor?: Card => string,
};

const defaultProps = {
  bottomItem: null,
  renderSectionHeader: null,
  renderItem: null,
  renderBottomItem: null,
  keyExtractor: null,
};

type RenderItemProps = {
  item: Card & {
    key: string,
    _renderCustom?: Card => React.Component<*, *>,
  },
};

/**
 * The default render item func, just passes all info through to the card list
 * item
 */
const withRenderItem = renderItem => (props: RenderItemProps) => {
  const { item } = props;

  if (props.item._renderCustom) return props.item._renderCustom(props);

  if (item.key === '_customBottomRender') {
    return <CardsListItem {...item} />;
  }

  if (typeof renderItem === 'function') {
    return renderItem(props);
  }

  return <CardsListItem {...item} />;
};

/**
 * Wrap around the key extractor if one is provided. As we don't want it to
 * run for custom items we add in here
 */
const customKeyExtractor = keyExtractor => (item) => {
  // Don't want to run a custom key extractor for the bottom render, as we
  // pass they key in ourselves
  if (item.key === '_customBottomRender') return item.key;

  return keyExtractor(item);
};

/**
 * Display a list of cards
 */
const CardsList = ({
  cards,
  renderSectionHeader,
  renderItem,
  renderBottomItem,
  bottomItem,
  keyExtractor,
  ...props
}: Props) => {
  const finalCards = cards.slice();
  const finalKeyExtractor = keyExtractor && customKeyExtractor(keyExtractor);

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
      renderItem={withRenderItem(renderItem)}
      keyExtractor={finalKeyExtractor}
      {...props}
    />
  ) : (
    <FlatList
      data={finalCards}
      renderItem={withRenderItem(renderItem)}
      keyExtractor={finalKeyExtractor}
      {...props}
    />
  );
};

CardsList.defaultProps = defaultProps;

export default CardsList;
