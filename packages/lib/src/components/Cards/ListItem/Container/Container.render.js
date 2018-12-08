// @flow

import * as React from 'react';
import Button from '../../../Button';
import { Container, Inner, CARDS_LIST_ITEM_SPACING } from './Container.style';

type Props = {
  action?: () => void,
  children: ({ spacing: number }) => React.Node | React.Node,
};

const defaultProps = {
  action: null,
};

/**
 * Display the cards list item container, can optionally be a button
 */
const CardsListItem = ({ children, action }: Props) => (
  <Container>
    <Button noButton={!action} action={action}>
      <Inner>
        {typeof children === 'function'
          ? children({ spacing: CARDS_LIST_ITEM_SPACING })
          : children}
      </Inner>
    </Button>
  </Container>
);

CardsListItem.defaultProps = defaultProps;

export default CardsListItem;
