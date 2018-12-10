// @flow

import React from 'react';
import { FlatList, SectionList } from '../../UI';
import type { Cards, Card, RenderSectionHeader } from '../types';
import CardsListItem from '../ListItem';

type Props = {
  cards: Cards,
  bottomItem?: () => React.Component<*, *>,
  topItem?: () => React.Component<*, *>,
  renderSectionHeader?: RenderSectionHeader,
  renderItem?: () => React.Component<*, *>,
  keyExtractor?: Card => string,
  bottomPadding?: boolean | number,
  innerRef?: () => void,
};

const defaultProps = {
  bottomItem: null,
  topItem: null,
  renderSectionHeader: null,
  renderItem: null,
  keyExtractor: null,
  bottomPadding: null,
  innerRef: null,
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

  if (item.key === '_customBottomRender' || item.key === '_customTopRender') {
    return <CardsListItem {...item} />;
  }

  if (typeof renderItem === 'function') {
    return renderItem(props);
  }

  return <CardsListItem {...item} />;
};

/**
 * Figure out the styling for the scroll containers
 */
const contentContainerStyle = ({ bottomPadding }) => {
  if (!bottomPadding) return {};

  return {
    paddingBottom: typeof bottomPadding === 'number' ? bottomPadding : 200,
  };
};

/**
 * Wrap around the key extractor if one is provided. As we don't want it to
 * run for custom items we add in here
 */
const customKeyExtractor = keyExtractor => (item) => {
  // Don't want to run a custom key extractor for the bottom/top render, as we
  // pass they key in ourselves
  if (item.key === '_customBottomRender' || item.key === '_customTopRender') {
    return item.key;
  }

  return keyExtractor(item);
};

/**
 * Display a list of cards
 */
const CardsList = ({
  cards,
  renderSectionHeader,
  renderItem,
  bottomItem,
  keyExtractor,
  bottomPadding,
  innerRef,
  topItem,
  ...props
}: Props) => {
  const finalCards = cards.slice();
  const finalKeyExtractor = keyExtractor && customKeyExtractor(keyExtractor);

  if (bottomItem) {
    finalCards.push({
      _renderCustom: bottomItem,
      key: '_customBottomRender',
    });
  }

  if (topItem) {
    finalCards.unshift({
      _renderCustom: topItem,
      key: '_customTopRender',
    });
  }

  const contentContainerStyles = contentContainerStyle({ bottomPadding });

  return renderSectionHeader ? (
    <SectionList
      ref={innerRef}
      renderSectionHeader={renderSectionHeader}
      sections={finalCards}
      renderItem={withRenderItem(renderItem)}
      keyExtractor={finalKeyExtractor}
      contentContainerStyle={contentContainerStyles}
      {...props}
    />
  ) : (
    <FlatList
      ref={innerRef}
      data={finalCards}
      renderItem={withRenderItem(renderItem)}
      keyExtractor={finalKeyExtractor}
      contentContainerStyle={contentContainerStyles}
      {...props}
    />
  );
};

CardsList.defaultProps = defaultProps;

export default CardsList;
