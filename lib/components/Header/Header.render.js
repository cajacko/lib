// @flow

import React from 'react';
import Button from '../Button';
import { Header as UIHeader, Left, Body, Right } from './Header.style';
import { BACK } from '../../config/icons';
import { COLORS } from '../../config/styles/text';

const Header = ({
  back,
  title,
  rightText,
  rightAction,
  titleAction,
  noButton,
}) => (
  <UIHeader>
    {!!back && (
      <Left hasFixedWidth>
        <Button action={back} icon={BACK} type="ICON" fullHeight />
      </Left>
    )}
    <Body hasSides={!!back}>
      <Button
        text={title}
        action={titleAction}
        type="TRANSPARENT"
        theme="BLACK"
        fullHeight
        baseWidth
        noButton={noButton}
      />
    </Body>
    {!!rightText &&
      !!rightAction && (
        <Right>
          <Button
            baseWidth
            action={rightAction}
            text={rightText}
            type="TRANSPARENT"
            fullHeight
          />
        </Right>
      )}
  </UIHeader>
);

export default Header;
