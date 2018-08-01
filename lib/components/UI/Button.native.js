// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';

const Button = ({
  action, children, nativeStyles, props,
}) => (
  <TouchableOpacity onPress={action} style={nativeStyles} {...props}>
    {children}
  </TouchableOpacity>
);

export default Button;
