// @flow

import React from 'react';
import Button from '../Button';
import { Header as UIHeader, Left, Body, Right } from './Header.style';
import { BACK } from '../../config/icons';
import buttons from '../../config/styles/buttons';

const Header = ({
  back,
  title,
  rightText,
  rightAction,
  titleAction,
  noButton,
  leftText,
  leftAction,
}) => (
  <UIHeader>
    {!!back && (
      <Left hasFixedWidth>
        <Button action={back} icon={BACK} type={buttons.ICON} fullHeight />
      </Left>
    )}
    {!!leftText &&
      !!leftAction && (
        <Left>
          <Button
            baseWidth
            action={leftAction}
            text={leftText}
            type={buttons.TRANSPARENT.GREY_DARK}
            fullHeight
          />
        </Left>
      )}
    {title && (
      <Body hasSides={!!back}>
        <Button
          text={title}
          action={titleAction}
          type={buttons.TRANSPARENT.BLACK}
          fullHeight
          baseWidth
          noButton={noButton}
        />
      </Body>
    )}
    {!!rightText &&
      !!rightAction && (
        <Right>
          <Button
            baseWidth
            action={rightAction}
            text={rightText}
            type={buttons.TRANSPARENT}
            fullHeight
          />
        </Right>
      )}
  </UIHeader>
);

export default Header;
