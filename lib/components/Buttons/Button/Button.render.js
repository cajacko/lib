// @flow

import React from 'react';
import { Button as UIButton } from '../../UI';
import { Outer, Inner, nativeStyles } from './Button.style';

const Button = ({
  action, children, fill, center, ...props
}) => (
  <Outer fill={fill} center={center}>
    <UIButton
      action={action}
      fill={fill}
      center={center}
      nativeStyles={nativeStyles({ fill, center })}
      {...props}
    >
      <Inner fill={fill} center={center}>
        {children}
      </Inner>
    </UIButton>
  </Outer>
);

export default Button;
