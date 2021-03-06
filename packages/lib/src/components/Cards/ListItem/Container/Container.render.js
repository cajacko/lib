// @flow

import * as React from 'react';
import Button from '../../../Button';
import {
  Container,
  Inner,
  CARDS_HORIZONTAL_SPACING,
  CARDS_VERTICAL_SPACING,
} from './Container.style';

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
const CardsListItem = ({ children, action, ...props }: Props) => (
  <Container>
    <Button noButton={!action} action={action}>
      <Inner {...props}>
        {typeof children === 'function'
          ? children({
              horizontalSpacing: CARDS_HORIZONTAL_SPACING,
              verticalSpacing: CARDS_VERTICAL_SPACING,
            })
          : children}
      </Inner>
    </Button>
  </Container>
);

CardsListItem.defaultProps = defaultProps;

export default CardsListItem;
