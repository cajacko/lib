// @flow

import React from 'react';
import { Text as StyledText, transformText } from './Text.style';

type Props = {
  text: string,
};

const Text = ({ text, ...props }: Props) => (
  <StyledText {...props}>{transformText(text, props)}</StyledText>
);

export default Text;
