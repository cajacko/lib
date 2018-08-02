// @flow

import React from 'react';
import TabNavItem from '../Item';
import { Container } from './Container.style';

const TabNavContainer = ({ items }) => (
  <Container>
    {items.map(({ key, ...item }) => <TabNavItem key={key} {...item} />)}
  </Container>
);

export default TabNavContainer;
