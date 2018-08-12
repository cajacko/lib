// @flow

import React from 'react';
import Text from '../Text';
import Button from '../Button';
import { Header as UIHeader, Left, Body, Right } from './Header.style';
import { BACK } from '../../config/icons';

const Header = ({
  back, title, rightText, rightAction,
}) => (
  <UIHeader>
    {!!back && (
      <Left hasFixedWidth>
        <Button action={back} icon={BACK} type="ICON" fullHeight />
      </Left>
    )}
    <Body hasSides={!!back}>
      <Text text={title} />
    </Body>
    {!!rightText &&
      !!rightAction && (
        <Right>
          <Button
            baseWidth
            action={back}
            text={rightText}
            type="TRANSPARENT"
            fullHeight
          />
        </Right>
      )}
  </UIHeader>
);

export default Header;
