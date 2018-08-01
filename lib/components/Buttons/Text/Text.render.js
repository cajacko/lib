// @flow

import React from 'react';
import Button from '../Button';
import Text from '../../Text';

const ButtonsText = ({ action, text, ...props }) => (
  <Button action={action} {...props}>
    <Text text={text} {...props} />
  </Button>
);

export default ButtonsText;
