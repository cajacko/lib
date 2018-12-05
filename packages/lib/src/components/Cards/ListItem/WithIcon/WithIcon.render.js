// @flow

import React, { Fragment } from 'react';
import Icon from '../../../Icon';
import type { Icon as IconType } from '../../../types';
import type { BackgroundColor } from '../../../../config/styles/textIconColors';
import type { TextValue } from '../../../Text/Text.render';
import Button from '../../../Button';

import CardsListItemText from '../Text';
import { Left, Right } from './WithIcon.style';

type Props = {
  leftIcon?: IconType,
  rightIcon?: IconType,
  greyedOut?: boolean,
  backgroundColor: BackgroundColor,
  text: TextValue,
  leftIconAction: () => void,
};

const defaultProps = {
  leftIcon: null,
  rightIcon: null,
  greyedOut: false,
};

/**
 * Get the icon props to use
 */
const getIconProps = ({ backgroundColor, greyedOut }) => ({
  backgroundColor,
  greyedOut,
});

/**
 * Card list item that contains a left or right icon
 */
const WithIcon = ({
  leftIcon, leftIconAction, rightIcon, ...props
}: Props) => (
  <Fragment>
    {leftIcon && (
      <Left>
        <Button action={leftIconAction} noButton={!leftIconAction}>
          <Icon icon={leftIcon} {...getIconProps(props)} />
        </Button>
      </Left>
    )}
    <CardsListItemText greyedOut={props.greyedOut} {...props} />
    {rightIcon && (
      <Right>
        <Icon icon={rightIcon} {...getIconProps(props)} />
      </Right>
    )}
  </Fragment>
);

WithIcon.defaultProps = defaultProps;

export default WithIcon;
