// @flow

import React from 'react';
import Button from '../../Button';
import Icon from '../../Icon';
import Text from '../../Text';
import { Container, buttonStyles } from './Item.style';

const TabNavItem = ({
  text, icon, action, isActive, theme,
}) => (
  <Container isActive={isActive} activeColor={theme.backgroundColorActive}>
    <Button action={action} styles={buttonStyles}>
      {icon && (
        <Icon
          icon={icon}
          backgroundColor={
            isActive ? theme.backgroundColorActive : theme.backgroundColor
          }
        />
      )}
      {text && (
        <Text
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

export default TabNavItem;
