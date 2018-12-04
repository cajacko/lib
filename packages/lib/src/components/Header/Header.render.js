// @flow

import React from 'react';
import Button from '../Button';
import { Header as UIHeader, Left, Body, Right } from './Header.style';
import { BACK } from '../../config/icons';
import buttons from '../../config/styles/buttons';

type Props = {
  title?: string,
  rightText?: string,
  rightAction?: string,
  titleAction?: string,
  noButton?: boolean,
  leftText?: string,
  leftAction?: string,
};

/**
 * Generic header component that can have icon or text buttons on either side
 */
const Header = ({
  back,
  title,
  rightText,
  rightAction,
  titleAction,
  noButton,
  leftText,
  leftAction,
  rightButtonStyle,
  leftButtonStyle,
}: Props) => (
  <UIHeader>
    {!!back && (
      <Left hasFixedWidth>
        <Button action={back} icon={BACK} type={buttons.ICON} fullHeight />
      </Left>
    )}
    {!!leftText && !!leftAction && (
      <Left>
        <Button
          baseWidth
          action={leftAction}
          text={leftText}
          type={leftButtonStyle || buttons.TRANSPARENT.GREY_DARK}
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
          noButton={!titleAction || noButton}
        />
      </Body>
    )}
    {!!rightText && !!rightAction && (
      <Right>
        <Button
          baseWidth
          action={rightAction}
          text={rightText}
          type={rightButtonStyle || buttons.TRANSPARENT}
          fullHeight
        />
      </Right>
    )}
  </UIHeader>
);

Header.defaultProps = {
  title: null,
  rightText: null,
  rightAction: null,
  titleAction: null,
  noButton: null,
  leftText: null,
  leftAction: null,
};

export default Header;
