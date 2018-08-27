// @flow

import React from 'react';
import marketingCopy from '../../utils/marketingCopy';
import { Text as StyledText, transformText } from './Text.style';

type Props = {
  text: string,
};

const getText = (text) => {
  if (text && text._textFromConst) return text._textFromConst;

  return marketingCopy.get(text);
};

const Text = ({ text, ...props }: Props) => (
  <StyledText {...props}>{transformText(getText(text), props)}</StyledText>
);

export default Text;
