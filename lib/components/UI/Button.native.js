// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({ action, children, props }) => (
  <TouchableOpacity onPress={action} {...props}>
    {children}
  </TouchableOpacity>
);

export default Button;
