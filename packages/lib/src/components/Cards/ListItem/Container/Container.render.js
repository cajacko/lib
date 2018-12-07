// @flow

import * as React from 'react';
import Button from '../../../Button';
import { Container, Inner } from './Container.style';

type Props = {
  action?: () => void,
  children: React.Node,
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
      <Inner>{children}</Inner>
    </Button>
  </Container>
);

CardsListItem.defaultProps = defaultProps;

export default CardsListItem;
