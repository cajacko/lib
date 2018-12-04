// @flow

import React from 'react';
import marketingCopy from '../../utils/marketingCopy';
import { Text as StyledText, transformText } from './Text.style';

export type TextValue = string | { _textFromConst: string };

type Props = {
  text: TextValue,
  type?: string,
};

const defaultProps = {
  // Not defining the default here, as we do this in Text.style.js
  type: null,
};

/**
 * Get the text value to use. We only allow text that's in the marketing copy,
 * unless you pass in an object with the val at _textFromConst. This should
 * encourage you to only use text if it is specified in the marketing copy.
 * Anything from the server should use _textFromConst.
 */
const getText = (text: TextValue): string => {
  if (typeof text !== 'string' && text._textFromConst) {
    return text._textFromConst;
  }

  return marketingCopy.get(text);
};

/**
 * Display some text, whilst doing any transformations as necessary
 */
const Text = ({ text, ...props }: Props) => (
  <StyledText {...props}>{transformText(getText(text), props)}</StyledText>
);

Text.defaultProps = defaultProps;

export default Text;
