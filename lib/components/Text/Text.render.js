import React from 'react';
import { Text as StyledText, transformText } from './Text.style';

const Text = ({ text, ...props }) => (
  <StyledText {...props}>{transformText(text, props)}</StyledText>
);

export default Text;
