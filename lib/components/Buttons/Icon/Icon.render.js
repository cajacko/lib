// @flow

import React from 'react';
import Button from '../Button';
import Icon from '../../Icon';

const ButtonsIcon = ({ action, icon, ...props }) => (
  <Button action={action} {...props}>
    <Icon icon={icon} {...props} />
  </Button>
);

export default ButtonsIcon;
