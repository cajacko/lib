// @flow

import React from 'react';
import Text from '../Text';
import Button from '../Button';
import { Header as UIHeader, Left, Body } from './Header.style';
import { BACK } from '../../config/icons';

const Header = ({ back, title }) => (
  <UIHeader>
    {!!back && (
      <Left>
        <Button action={back} icon={BACK} type="ICON" fullHeight />
      </Left>
    )}
    <Body hasSides={!!back}>
      <Text text={title} />
    </Body>
  </UIHeader>
);

export default Header;
