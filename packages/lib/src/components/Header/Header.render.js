// @flow

import React from 'react';
import Button from '../Button';
import {
  Header as UIHeader,
  Left,
  Body,
  Right,
  MultipleRight,
} from './Header.style';
import getHeaderLayout from './getHeaderLayout';
import type { TextValue } from '../../utils/getText';
import type { Icon } from '../types';

export type Props = {
  back?: () => void,
  title?: TextValue,
  rightText?: TextValue,
  rightAction?: () => void,
  titleAction?: () => void,
  noButton?: boolean,
  leftText?: TextValue,
  leftAction?: () => void,
  rightButtons?: Array<{
    text?: TextValue,
    action: () => void,
    icon?: Icon,
  }>,
  horizontalMargin?: number,
};

const defaultProps = {
  title: null,
  rightText: null,
  rightAction: null,
  titleAction: null,
  noButton: null,
  leftText: null,
  leftAction: null,
  rightButtons: null,
  horizontalMargin: null,
};

/**
 * Generic header component that can have icon or text buttons on either side
 */
const Header = (props: Props) => {
  const { left, right, title } = getHeaderLayout(props);

  return (
    <UIHeader>
      {!!left && (
        <Left {...left.container}>
          <Button {...left.button} />
        </Left>
      )}
      {!!title && (
        <Body {...title.container}>
          <Button {...title.button} numberOfLines={1} />
        </Body>
      )}
      {!!right && (
        <Right>
          {Array.isArray(right) ? (
            right.map(({ container, button }) => (
              <MultipleRight {...container}>
                <Button {...button} />
              </MultipleRight>
            ))
          ) : (
            <Button {...right.button} />
          )}
        </Right>
      )}
    </UIHeader>
  );
};

Header.defaultProps = defaultProps;

export default Header;
