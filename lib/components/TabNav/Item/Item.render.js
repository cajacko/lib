// @flow

import React from 'react';
import ButtonsText from '../../Buttons/Text';
import { Container } from './Item.style';

const TabNavItem = ({ text, icon, action }) => (
  <Container>
    <ButtonsText text={text} action={action} />
  </Container>
);

export default TabNavItem;
