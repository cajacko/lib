// @flow

import React from 'react';
import Text from '../Text';
import ButtonsIcon from '../Buttons/Icon';
import { Header as UIHeader, Left, Body } from './Header.style';
import { BACK } from '../../config/icons';

const Header = ({ back, title }) => (
  <UIHeader>
    {!!back && (
      <Left>
        <ButtonsIcon action={back} icon={BACK} fill center />
      </Left>
    )}
    <Body hasSides={!!back}>
      <Text text={title} />
    </Body>
  </UIHeader>
);

export default Header;
