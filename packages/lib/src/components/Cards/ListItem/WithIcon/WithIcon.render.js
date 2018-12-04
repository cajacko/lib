// @flow

import React, { Fragment } from 'react';
import Icon from '../../../Icon';
import type { Icon as IconType } from '../../../types';
import type { BackgroundColor } from '../../../../config/styles/textIconColors';
import type { TextValue } from '../../../Text/Text.render';

import CardsListItemText from '../Text';
import { Left, Right } from './WithIcon.style';

type Props = {
  leftIcon?: IconType,
  rightIcon?: IconType,
  greyedOut?: boolean,
  backgroundColor: BackgroundColor,
  text: TextValue,
};

const defaultProps = {
  leftIcon: null,
  rightIcon: null,
  greyedOut: false,
};

/**
 * Get the icon props to use
 */
const getIconProps = (side, { backgroundColor, greyedOut }) => ({
  icon: side,
  backgroundColor,
  greyedOut,
});

/**
 * Card list item that contains a left or right icon
 */
const WithIcon = ({ leftIcon, rightIcon, ...props }: Props) => (
  <Fragment>
    {leftIcon && (
      <Left>
        <Icon {...getIconProps(leftIcon, props)} />
      </Left>
    )}
    <CardsListItemText greyedOut={props.greyedOut} {...props} />
    {rightIcon && (
      <Right>
        <Icon {...getIconProps(rightIcon, props)} />
      </Right>
    )}
  </Fragment>
);

WithIcon.defaultProps = defaultProps;

export default WithIcon;
