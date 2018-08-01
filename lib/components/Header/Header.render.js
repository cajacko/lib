// @flow

import React from 'react';
import { Header as UIHeader, Left, Right, Body } from '../UI';
import Text from '../Text';
import ButtonsIcon from '../Buttons/Icon';

const Header = ({ back, title }) => (
  <UIHeader>
    {!!back && (
      <Left>
        <ButtonsIcon action={back} icon="chevron-back" />
      </Left>
    )}
    <Body>
      <Text text={title} />
    </Body>
    {!!back && <Right />}
  </UIHeader>
);

export default Header;
