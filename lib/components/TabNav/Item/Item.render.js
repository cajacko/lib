// @flow

import React from 'react';
import Button from '../../Button';
import Icon from '../../Icon';
import Text from '../../Text';
import { Container, buttonStyle } from './Item.style';

const TabNavItem = ({
  text, icon, action, isActive, theme,
}) => (
  <Container isActive={isActive} activeColor={theme.backgroundColorActive}>
    <Button action={action} style={buttonStyle}>
      {icon && (
        <Icon
          icon={icon}
          color={isActive ? theme.iconColorActive : theme.iconColor}
        />
      )}
      {text && (
        <Text
          text={text}
          type="overline"
          color={isActive ? theme.textColorActive : theme.textColor}
        />
      )}
    </Button>
  </Container>
);

export default TabNavItem;
