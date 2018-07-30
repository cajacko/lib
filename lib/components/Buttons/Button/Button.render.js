import React from 'react';
import { Button as UIButton } from '../../UI';

const Button = ({ action, children, ...props }) => (
  <UIButton action={action} {...props}>
    {children}
  </UIButton>
);

export default Button;
