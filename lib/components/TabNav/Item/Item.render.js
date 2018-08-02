// @flow

import React from 'react';
import ButtonsButton from '../../Buttons/Button';
import Icon from '../../Icon';
import Text from '../../Text';
import { Container } from './Item.style';

const TabNavItem = ({ text, icon, action }) => (
  <Container>
    <ButtonsButton action={action} fill center>
      {icon && <Icon icon={icon} />}
      {text && <Text text={text} type="overline" />}
    </ButtonsButton>
  </Container>
);

export default TabNavItem;
