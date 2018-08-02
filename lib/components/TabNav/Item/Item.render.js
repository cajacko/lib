// @flow

import React from 'react';
import ButtonsButton from '../../Buttons/Button';
import Icon from '../../Icon';
import Text from '../../Text';
import { Container } from './Item.style';

const TabNavItem = ({
  text, icon, action, isActive, theme,
}) => (
  <Container>
    <ButtonsButton action={action} fill center>
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
    </ButtonsButton>
  </Container>
);

export default TabNavItem;
