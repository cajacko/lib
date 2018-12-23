// @flow

import React from 'react';
import Button from '../../Button';
import Icon from '../../Icon';
import Text from '../../Text';
import { Container, buttonStyles } from './Item.style';
import type { Icon as IconType } from '../../types';

type Props = {
  text?: string,
  icon?: IconType,
  action: () => void,
  isActive?: boolean,
  theme: {
    backgroundColorActive: string,
    backgroundColor: string,
  },
  greyedOut?: boolean,
  noButton?: boolean,
};

const defaultProps = {
  text: null,
  icon: null,
  isActive: false,
  greyedOut: false,
  noButton: false,
};

/**
 * Display a tab navigation with text or icons
 */
const TabNavItem = ({
  text,
  icon,
  action,
  isActive,
  theme,
  greyedOut,
  noButton,
}: Props) => (
  <Container isActive={isActive} activeColor={theme.backgroundColorActive}>
    <Button action={action} styles={buttonStyles} noButton={noButton}>
      {icon && (
        <Icon
          greyedOut={greyedOut}
          icon={icon}
          backgroundColor={
            isActive ? theme.backgroundColorActive : theme.backgroundColor
          }
        />
      )}
      {text && (
        <Text
          greyedOut={greyedOut}
          text={text}
          type="overline"
          backgroundColor={
            isActive ? theme.backgroundColorActive : theme.backgroundColor
          }
        />
      )}
    </Button>
  </Container>
);

TabNavItem.defaultProps = defaultProps;

export default TabNavItem;
