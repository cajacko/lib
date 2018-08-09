// @flow

import React from 'react';
import { Button as UIButton } from '../../UI';
import { Outer, Inner, nativeStyles } from './Button.style';

const Button = ({
  action, children, fill, center, type, theme, ...props
}) => (
  <Outer fill={fill} center={center} type={type} theme={theme}>
    <UIButton
      action={action}
      fill={fill}
      center={center}
      nativeStyles={nativeStyles({
        fill,
        center,
        type,
        theme,
      })}
      {...props}
    >
      <Inner fill={fill} center={center} type={type} theme={theme}>
        {children}
      </Inner>
    </UIButton>
  </Outer>
);

export default Button;
