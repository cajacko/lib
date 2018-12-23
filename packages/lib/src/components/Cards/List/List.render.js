// @flow

import React from 'react';
import { FlatList, SectionList } from '../../UI';
import type { Cards, Card, RenderSectionHeader } from '../types';

type Props = {
  cards: Cards,
  bottomItem?: () => React.Component<*, *>,
  topItem?: () => React.Component<*, *>,
  renderSectionHeader?: RenderSectionHeader,
  renderItem?: () => React.Component<*, *>,
  keyExtractor?: Card => string,
  bottomPadding?: boolean | number,
  innerRef?: () => void,
  bottomItemProps?: { [string]: * },
  topItemProps?: { [string]: * },
};

const defaultProps = {
  bottomItem: null,
  topItem: null,
  renderSectionHeader: null,
  renderItem: null,
  keyExtractor: null,
  bottomPadding: null,
  innerRef: null,
  bottomItemProps: {},
  topItemProps: {},
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
 * Display a list of cards
 */
const CardsList = ({
  cards,
  bottomPadding,
  renderSectionHeader,
  innerRef,
  ...props
}: Props) => {
  const contentContainerStyles = contentContainerStyle({ bottomPadding });

  return renderSectionHeader ? (
    <SectionList
      ref={innerRef}
      renderSectionHeader={renderSectionHeader}
      sections={cards}
      contentContainerStyle={contentContainerStyles}
      {...props}
    />
  ) : (
    <FlatList
      ref={innerRef}
      data={cards}
      contentContainerStyle={contentContainerStyles}
      {...props}
    />
  );
};

CardsList.defaultProps = defaultProps;

export default CardsList;
